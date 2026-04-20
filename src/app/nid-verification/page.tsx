'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';
import NebulaBackground from '@/components/NebulaBackground';
import Footer from '@/components/Footer';
import GarageLocationPicker from '@/components/GarageLocationPicker';
import { persistLoggedInUser, type UserRole } from '@/lib/auth';

type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
};

export default function NIDVerificationPage() {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [nidNumber, setNidNumber] = useState('');
  const [nidFront, setNidFront] = useState<File | null>(null);
  const [nidBack, setNidBack] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [pinnedLocation, setPinnedLocation] = useState<{
    latitude: number;
    longitude: number;
    locationName: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('registrationData');
    if (!saved) {
      router.replace('/register');
      return;
    }

    try {
      const parsed = JSON.parse(saved) as RegistrationData;
      setRegistrationData(parsed);
    } catch {
      router.replace('/register');
    }
  }, [router]);

  const onFilePick = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Only image files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image must be 5MB or smaller.');
      return;
    }
    setErrorMsg('');
    setter(file);
  };

  const openCamera = async () => {
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      setIsCameraOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    } catch {
      setErrorMsg('Could not access camera. Please allow camera permission or upload from device.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const captured = new File([blob], 'nid-selfie.jpg', { type: 'image/jpeg' });
      setSelfie(captured);
      closeCamera();
    }, 'image/jpeg', 0.9);
  };

  const submitVerification = async () => {
    if (!registrationData) return;

    const missing: string[] = [];
    if (!nidNumber.trim()) missing.push('NID number');
    if (!nidFront) missing.push('NID front image');
    if (!nidBack) missing.push('NID back image');
    if (!profilePicture) missing.push('profile picture');
    if (!selfie) missing.push('selfie with NID');

    const requiresBusinessLocation =
      registrationData.role === 'garage_owner' || registrationData.role === 'repairshop_owner';

    if (requiresBusinessLocation) {
      if (!businessName.trim()) {
        missing.push(
          registrationData.role === 'garage_owner' ? 'garage name' : 'repairshop name'
        );
      }
      if (!businessCity.trim()) {
        missing.push('city');
      }
      if (!pinnedLocation) {
        missing.push('pinned map location');
      }
    }

    if (missing.length > 0) {
      setErrorMsg(`Please provide: ${missing.join(', ')}.`);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('nidFront', nidFront);
      formData.append('nidBack', nidBack);
      formData.append('selfie', selfie);
      formData.append('profilePicture', profilePicture);
      formData.append(
        'userData',
        JSON.stringify({
          ...registrationData,
          nidNumber: nidNumber.trim(),
          garage:
            registrationData.role === 'garage_owner'
              ? {
                  name: businessName.trim(),
                  city: businessCity.trim(),
                  location: pinnedLocation?.locationName || '',
                  latitude: pinnedLocation?.latitude || 0,
                  longitude: pinnedLocation?.longitude || 0,
                }
              : undefined,
          repairshop:
            registrationData.role === 'repairshop_owner'
              ? {
                  name: businessName.trim(),
                  city: businessCity.trim(),
                  location: pinnedLocation?.locationName || '',
                  latitude: pinnedLocation?.latitude || 0,
                  longitude: pinnedLocation?.longitude || 0,
                }
              : undefined,
        })
      );

      const res = await fetch('/api/auth/complete-registration', {
        method: 'POST',
        body: formData,
      });

      const payload = (await res.json()) as { error?: string; token?: string; user?: { id: string; name: string; email: string; role: UserRole } };
      if (!res.ok || !payload.user) {
        setErrorMsg(payload.error || 'Verification submission failed.');
        setIsSubmitting(false);
        return;
      }

      persistLoggedInUser(payload.user);
      if (payload.token) {
        localStorage.setItem("auth_token", payload.token);
        document.cookie = `auth_token=${payload.token}; path=/; max-age=2592000; SameSite=Strict`;
      } else {
        document.cookie = `auth_token=${payload.user.id}; path=/; max-age=2592000; SameSite=Strict`;
      }
      sessionStorage.removeItem('registrationData');
      router.push('/dashboard');
    } catch {
      setErrorMsg('Could not complete registration. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
        <span className="material-symbols-outlined text-primary text-4xl animate-spin">hourglass_bottom</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-10">
        <div className="glass-card p-8 rounded-3xl border border-outline-variant/15 mb-8">
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-extrabold">Identity Verification</h1>
          <p className="text-on-surface-variant mt-2">Complete this final step to activate your account.</p>
          <p className="text-sm mt-4 text-on-surface-variant">
            {registrationData.firstName} {registrationData.lastName} • {registrationData.email} • {registrationData.role.replace('_', ' ')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-outline-variant/15">
            <label className="text-xs uppercase tracking-widest text-outline font-bold">NID Number</label>
            <input
              value={nidNumber}
              onChange={(e) => setNidNumber(e.target.value)}
              placeholder="Enter your NID number"
              className="mt-2 w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface"
            />
          </div>

          <div className="glass-card p-6 rounded-2xl border border-outline-variant/15">
            <label className="text-xs uppercase tracking-widest text-outline font-bold">Profile Picture</label>
            <input type="file" accept="image/*" onChange={(e) => onFilePick(e, setProfilePicture)} className="mt-2 w-full text-sm" />
            <p className="text-xs mt-2 text-on-surface-variant">{profilePicture ? `Selected: ${profilePicture.name}` : 'Choose from gallery'}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-outline-variant/15">
            <label className="text-xs uppercase tracking-widest text-outline font-bold">NID Front</label>
            <input type="file" accept="image/*" onChange={(e) => onFilePick(e, setNidFront)} className="mt-2 w-full text-sm" />
            <p className="text-xs mt-2 text-on-surface-variant">{nidFront ? `Selected: ${nidFront.name}` : 'Upload front side'}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-outline-variant/15">
            <label className="text-xs uppercase tracking-widest text-outline font-bold">NID Back</label>
            <input type="file" accept="image/*" onChange={(e) => onFilePick(e, setNidBack)} className="mt-2 w-full text-sm" />
            <p className="text-xs mt-2 text-on-surface-variant">{nidBack ? `Selected: ${nidBack.name}` : 'Upload back side'}</p>
          </div>
        </div>

        {(registrationData.role === 'garage_owner' || registrationData.role === 'repairshop_owner') && (
          <div className="glass-card p-6 rounded-2xl border border-outline-variant/15 mt-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold">
                {registrationData.role === 'garage_owner' ? 'Garage Location Setup' : 'Repair Shop Location Setup'}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Pin your business location so car owners can find it on the map.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={registrationData.role === 'garage_owner' ? 'Garage name' : 'Repairshop name'}
                className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface"
              />
              <input
                value={businessCity}
                onChange={(e) => setBusinessCity(e.target.value)}
                placeholder="City"
                className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface"
              />
            </div>

            <GarageLocationPicker onLocationSelect={setPinnedLocation} />

            {pinnedLocation && (
              <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-on-surface">
                <p className="font-semibold text-primary">Pinned location saved</p>
                <p className="text-on-surface-variant mt-1">
                  {pinnedLocation.locationName} ({pinnedLocation.latitude.toFixed(5)}, {pinnedLocation.longitude.toFixed(5)})
                </p>
              </div>
            )}
          </div>
        )}

        <div className="glass-card p-6 rounded-2xl border border-outline-variant/15 mt-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-bold">Live Selfie With NID</h2>
              <p className="text-sm text-on-surface-variant mt-1">Keep your face and NID visible in one frame.</p>
              <p className="text-xs mt-2 text-on-surface-variant">{selfie ? `Captured: ${selfie.name}` : 'No selfie captured yet'}</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="px-5 py-3 rounded-xl bg-surface-container-highest text-on-surface border border-outline-variant/20 font-bold cursor-pointer">
                Upload Selfie
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFilePick(e, setSelfie)}
                />
              </label>
              <button
                type="button"
                onClick={openCamera}
                className="px-5 py-3 rounded-xl bg-secondary/20 text-secondary border border-secondary/30 font-bold"
              >
                Open Camera
              </button>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium">{errorMsg}</div>
        )}

        <button
          type="button"
          onClick={submitVerification}
          disabled={isSubmitting}
          className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-bold disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Verification & Create Account'}
        </button>
      </main>

      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Capture Selfie</h3>
              <button onClick={closeCamera} className="p-2 rounded-lg hover:bg-surface-container-high">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl bg-black max-h-[420px] object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3 mt-4">
              <button onClick={closeCamera} className="flex-1 py-3 rounded-xl border border-outline-variant/30">Cancel</button>
              <button onClick={captureSelfie} className="flex-1 py-3 rounded-xl bg-secondary text-on-secondary font-bold">Capture</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
