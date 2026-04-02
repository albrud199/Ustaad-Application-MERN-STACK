'use client';

import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NIDVerificationPage() {
  const router = useRouter();
  const [nidFront, setNidFront] = useState<File | null>(null);
  const [nidBack, setNidBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const nidFrontRef = useRef<HTMLInputElement>(null);
  const nidBackRef = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Load user data from localStorage (from registration form)
    const savedUserData = localStorage.getItem('registrationData');
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller file.');
        return;
      }
      setFile(file);
    }
  };

  const handleTakeLivePhoto = async () => {
    try {
      // Check for camera availability
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');

      if (!hasCamera) {
        alert('No camera detected on your device. Please use the file upload option instead.');
        return;
      }

      // Request camera permission and access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        alert('Camera permission denied. Please allow access to your camera.');
      } else if (error.name === 'NotFoundError') {
        alert('No camera found on your device.');
      } else {
        alert('Unable to access camera. Please try again.');
      }
    }
  };

  const handleCaptureSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
            setSelfie(file);
            closeCameraModal();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  const closeCameraModal = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCompleteSubmission = async () => {
    // Validate all required fields
    if (!nidFront) {
      alert('Please upload the front side of your NID.');
      return;
    }
    if (!nidBack) {
      alert('Please upload the back side of your NID.');
      return;
    }
    if (!selfie) {
      alert('Please take a selfie with your NID.');
      return;
    }
    if (!userData) {
      alert('Personal information not found. Please go back and complete registration.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData to send files and user data
      const formData = new FormData();
      formData.append('nidFront', nidFront);
      formData.append('nidBack', nidBack);
      formData.append('selfie', selfie);
      formData.append('userData', JSON.stringify(userData));

      // TODO: Replace with actual API endpoint
      // For now, save to localStorage for demonstration
      const submissionData = {
        userData,
        documents: {
          nidFront: nidFront.name,
          nidBack: nidBack.name,
          selfie: selfie.name,
        },
        submittedAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('nidVerificationData', JSON.stringify(submissionData));

      // Show success message
      alert('✓ Your verification documents have been submitted successfully!\n\nWe will verify your identity within 24 hours.');
      
      // Redirect to dashboard or booking confirmation
      router.push('/booking-confirmation');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary/30">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Verification Banner (Status) */}
        <div className="mb-12 glass-card rounded-xl p-4 flex items-center justify-between border-l-4 border-success bg-success/5 border-t border-r border-b border-outline-variant/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-success/20 p-2 rounded-full text-success">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h3 className="text-success font-[family-name:var(--font-headline)] font-bold">Verification Pending</h3>
              <p className="text-on-surface-variant text-sm font-[family-name:var(--font-body)]">Please complete your identity submission to unlock full garage features.</p>
            </div>
          </div>
          <span className="hidden md:block text-xs uppercase tracking-widest text-success font-bold px-3 py-1 bg-success/10 rounded-full font-[family-name:var(--font-label)] border border-success/20">Step 2 of 2</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form & Progress */}
          <div className="lg:col-span-7 space-y-8">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight">
                Identity <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Verification</span>
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed font-[family-name:var(--font-body)]">
                Secure your Ustaad Partner account by submitting your official government National ID.
              </p>
            </header>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-[family-name:var(--font-label)] mb-2 font-bold">
                <span className="text-primary-fixed">Personal Details Completed</span>
                <span className="text-on-surface-variant">60% Complete</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/20">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[60%] shadow-[0_0_10px_rgba(163,166,255,0.5)]"></div>
              </div>
            </div>

            {/* Personal Info Summary (Step 1 Review) */}
            <div className="glass-card rounded-2xl p-6 relative group overflow-hidden border border-outline-variant/15">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="material-symbols-outlined text-6xl">badge</span>
              </div>
              <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Step 1: Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-[family-name:var(--font-body)]">
                <div className="space-y-1">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] font-bold font-[family-name:var(--font-label)]">Full Legal Name</label>
                  <p className="text-on-surface text-lg font-medium">{userData?.firstName} {userData?.lastName}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] font-bold font-[family-name:var(--font-label)]">Email</label>
                  <p className="text-on-surface text-lg font-medium font-mono">{userData?.email || 'Not provided'}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] font-bold font-[family-name:var(--font-label)]">Phone</label>
                  <p className="text-on-surface text-lg font-medium">{userData?.phone || 'Not provided'}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] font-bold font-[family-name:var(--font-label)]">User Type</label>
                  <p className="text-on-surface text-lg font-medium capitalize">{userData?.userType || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Document Upload Section (Step 2) */}
            <div className="space-y-8">
              <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary-container flex items-center justify-center text-sm shadow-[0_0_15px_rgba(163,166,255,0.4)]">2</span>
                Step 2: Document Submission
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NID Front */}
                <div className="glass-card border-dashed border-2 border-outline-variant hover:border-primary transition-all p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer bg-surface/30">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                  </div>
                  <h3 className="font-bold text-on-surface font-[family-name:var(--font-headline)]">NID Front Side</h3>
                  <p className="text-xs text-on-surface-variant mt-2 mb-4 font-[family-name:var(--font-body)]">PNG, JPG up to 5MB</p>
                  {nidFront && <p className="text-xs text-success mb-2 font-bold">✓ {nidFront.name}</p>}
                  <button 
                    onClick={() => nidFrontRef.current?.click()}
                    className="text-xs font-bold text-primary px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20">
                    Select File
                  </button>
                  <input
                    ref={nidFrontRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, setNidFront)}
                    className="hidden"
                  />
                </div>
                
                {/* NID Back */}
                <div className="glass-card border-dashed border-2 border-outline-variant hover:border-primary transition-all p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer bg-surface/30">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
                  </div>
                  <h3 className="font-bold text-on-surface font-[family-name:var(--font-headline)]">NID Back Side</h3>
                  <p className="text-xs text-on-surface-variant mt-2 mb-4 font-[family-name:var(--font-body)]">Ensure all text is legible</p>
                  {nidBack && <p className="text-xs text-success mb-2 font-bold">✓ {nidBack.name}</p>}
                  <button 
                    onClick={() => nidBackRef.current?.click()}
                    className="text-xs font-bold text-primary px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20">
                    Select File
                  </button>
                  <input
                    ref={nidBackRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, setNidBack)}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Selfie with NID */}
              <div className="glass-card border-dashed border-2 border-outline-variant hover:border-secondary transition-all p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center gap-8 group cursor-pointer relative overflow-hidden bg-surface/30">
                <div className="flex-shrink-0 w-32 h-32 bg-surface-container-highest rounded-xl flex items-center justify-center border border-outline-variant shadow-inner relative">
                  <span className="material-symbols-outlined text-4xl text-secondary opacity-50">face</span>
                  <div className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary px-2 py-1 rounded text-[10px] font-bold shadow-md">SELFIE</div>
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface">Live Selfie + NID</h3>
                  <p className="text-on-surface-variant text-sm font-[family-name:var(--font-body)]">Hold your ID card next to your face. Ensure your face and the card details are clearly visible in the same frame.</p>
                  <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start font-[family-name:var(--font-label)] font-medium">
                    <span className="flex items-center gap-1 text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant/20"><span className="material-symbols-outlined text-sm text-success">done</span> No Sunglasses</span>
                    <span className="flex items-center gap-1 text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant/20"><span className="material-symbols-outlined text-sm text-success">done</span> Good Lighting</span>
                    <span className="flex items-center gap-1 text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md border border-outline-variant/20"><span className="material-symbols-outlined text-sm text-success">done</span> Clear Focus</span>
                  </div>
                  {selfie && <p className="text-xs text-success mt-2 font-bold">✓ {selfie.name}</p>}
                </div>
                <button 
                  onClick={handleTakeLivePhoto}
                  className="bg-gradient-to-r from-secondary to-tertiary-dim text-on-secondary-fixed font-bold py-3 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(246,115,183,0.3)] transition-all whitespace-nowrap text-sm">
                  Take Photo
                </button>
              </div>
            </div>

            {/* Security Disclaimer */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-inner">
              <span className="material-symbols-outlined text-primary-fixed mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <p className="text-sm text-on-surface-variant leading-relaxed font-[family-name:var(--font-body)]">
                <strong className="text-on-surface block mb-1">Bank-Grade Encryption:</strong> Your identity documents are encrypted and stored in an isolated celestial vault. Ustaad never shares your private data with third parties.
              </p>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleCompleteSubmission}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary-dim py-5 rounded-2xl text-on-primary-fixed font-[family-name:var(--font-headline)] font-extrabold text-xl shadow-[0_10px_30px_rgba(163,166,255,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {isSubmitting ? (
                <>
                  <span className="animated-spinner inline-block w-5 h-5 border-2 border-transparent border-t-current border-r-current rounded-full animate-spin"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Complete Submission
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Sidebar / Contextual Bento */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            
            {/* Tips Card */}
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden ring-1 ring-primary/20 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[40px] rounded-full"></div>
              <h3 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-6 text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">lightbulb</span> Tips for Success
              </h3>
              
              <ul className="space-y-6 font-[family-name:var(--font-body)] relative z-10">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 shadow-inner flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">light_mode</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Avoid Glare</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Natural daylight is best. Avoid direct camera flash on the ID's plastic surface.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 shadow-inner flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">crop_free</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Full Corners</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Make sure all four corners of the ID card are visible in the frame.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 shadow-inner flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">id_card</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Validity</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Check your ID's expiration date. Expired documents will be automatically rejected.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Sample Document Visual */}
            <div className="glass-card rounded-3xl p-1 overflow-hidden border border-outline-variant/15 shadow-lg">
              <div className="relative h-56 w-full rounded-[1.4rem] overflow-hidden group">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSRIqeY8MW7Z19bGGoxjcAvf3sdWKNB5hW6YoQ5D29wE7B2Cvxtd5P91wtfgz-MoYiBWyM1-y9sQmz-hMj8JKsWdLa2sVXf9FH_SykOpxa5WZYqBiDzK_-wSuRffaNqH7o_uVX2uOXyI_VAK48wNJqOc30xwKRnlCkwyb-06RXfpD2EeSE2RJqefwUeCZPzrm2p9AsO6kBGKbffQCq0nqfPv35Do-6OoaqgQfDYenkSnY76_Lo5R1MfjpbU6DMlE3DvA6GVcZXTYk" 
                  alt="Verification Sample" 
                  fill 
                  className="object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent via-surface/40"></div>
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded mb-2 border border-primary/30 uppercase tracking-widest font-[family-name:var(--font-label)]">Sample Guide</span>
                  <p className="text-sm font-[family-name:var(--font-headline)] font-medium text-white shadow-sm">How your submission should look</p>
                </div>
              </div>
            </div>

            {/* Support Anchor */}
            <div className="p-8 rounded-3xl bg-surface-container-high border border-outline-variant/20 text-center shadow-inner">
              <p className="text-on-surface-variant text-sm mb-4 font-[family-name:var(--font-body)]">Having trouble with the camera?</p>
              <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition-colors text-sm font-[family-name:var(--font-headline)]">
                Contact Safety Radar
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Camera Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold">Take Live Selfie</h2>
              <button
                onClick={closeCameraModal}
                className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="relative bg-black rounded-2xl overflow-hidden aspects-square">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <p className="text-sm text-on-surface-variant text-center font-[family-name:var(--font-body)]">
              Position your face and NID card in the frame. Ensure good lighting and clear visibility.
            </p>

            <div className="flex gap-4">
              <button
                onClick={closeCameraModal}
                className="flex-1 py-3 rounded-xl border border-outline-variant text-on-surface font-bold hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCaptureSelfie}
                className="flex-1 bg-gradient-to-r from-secondary to-tertiary-dim text-on-secondary-fixed font-bold py-3 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(246,115,183,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">camera</span>
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
