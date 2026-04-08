"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import AuthGateButton from "@/components/AuthGateButton";
import Image from "next/image";

export default function RequestServicePage() {
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address: string } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file uploads from gallery
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const preview = URL.createObjectURL(file);
        setUploadedImages((prev) => [...prev, { file, preview }]);
      });
    }
    // Clear the input so the same file can be selected again
    e.currentTarget.value = '';
  };

  // Handle live location request
  const handleGetLiveLocation = () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          address: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`,
        });
        setLocationLoading(false);
        // Optionally, you can use a reverse geocoding service to get the actual address
      },
      (error) => {
        setLocationError(error.message);
        setLocationLoading(false);
      }
    );
  };

  // Remove an uploaded image
  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <NebulaBackground />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 max-w-5xl mx-auto w-full relative z-10">
        
        {/* Editorial Header */}
        <section className="mb-16">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold tracking-widest uppercase">Request Portal</span>
            <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-headline)] font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent">
                The Celestial <br/>Service Link
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">Connect your vehicle with our elite maintenance nebula. Follow the navigation vectors below.</p>
        </section>

        {/* Multi-Step Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Step Navigation Indicators */}
            <aside className="lg:col-span-3 space-y-8">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary-fixed font-bold shadow-[0_0_15px_rgba(163,166,255,0.4)]">1</div>
                    <div>
                        <p className="text-sm font-bold text-primary">Intent</p>
                        <p className="text-xs text-on-surface-variant">Service Class</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 group opacity-50">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-bold">2</div>
                    <div>
                        <p className="text-sm font-bold text-on-surface">Details</p>
                        <p className="text-xs text-on-surface-variant">Issue Logs</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 group opacity-50">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-bold">3</div>
                    <div>
                        <p className="text-sm font-bold text-on-surface">Location</p>
                        <p className="text-xs text-on-surface-variant">Coordinates</p>
                    </div>
                </div>
            </aside>

            {/* Main Form Canvas */}
            <div className="lg:col-span-9 space-y-12">
                
                {/* Step 1: Service Type */}
                <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden border border-outline-variant/15">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-8 text-on-surface">Choose your service orbit</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* General Service Card */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="service_type" className="peer sr-only" defaultChecked />
                            <div className="h-full p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-3xl">build</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-on-surface">General Service</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">Routine maintenance, oil changes, and full celestial diagnostics to keep you gliding.</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 peer-checked:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                        </label>

                        {/* Emergency Service Card */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="service_type" className="peer sr-only" />
                            <div className="h-full p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 peer-checked:border-error peer-checked:bg-error/10 transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <span className="material-symbols-outlined text-error text-3xl">emergency</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-on-surface">Emergency Hub</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">Critical failures, roadside assistance, and immediate technical intervention.</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 peer-checked:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Step 2: Problem Description */}
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-outline-variant/15">
                    <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-8 text-on-surface">Define the technical anomaly</h2>
                    
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Problem Description</label>
                            <textarea 
                                rows={5} 
                                className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline text-on-surface" 
                                placeholder="Describe the sounds, vibrations, or visible issues..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-widest">Visual Evidence</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Hidden file input */}
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                                {/* Upload button */}
                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className="aspect-square rounded-xl bg-surface-container-highest border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 cursor-pointer transition-colors"
                                >
                                    <span className="material-symbols-outlined text-3xl mb-2">add_a_photo</span>
                                    <span className="text-xs font-bold">Upload</span>
                                </button>
                                {/* Display uploaded images */}
                                {uploadedImages.map((img, index) => (
                                  <div key={index} className="aspect-square rounded-xl relative overflow-hidden group cursor-pointer">
                                    <Image
                                      src={img.preview}
                                      alt={`Uploaded image ${index + 1}`}
                                      fill
                                      className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                    />
                                    <button
                                      onClick={() => removeImage(index)}
                                      className="absolute top-2 right-2 bg-error/80 hover:bg-error rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <span className="material-symbols-outlined text-on-error text-xl">close</span>
                                    </button>
                                  </div>
                                ))}
                                {/* Placeholder images if no uploads */}
                                {uploadedImages.length === 0 && (
                                  <>
                                    <div className="aspect-square rounded-xl relative overflow-hidden group cursor-pointer">
                                      <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMyCKs8p8XmHru3hWXkGFOpELyirfYSCVjlqgoRNPbRhRaA-XPoLtyLrMHo5EdIBxMugebR69SxvziCKEM0DsGCcl5dBVkIHZMNrlTKDQmIhVE0J914sUHg7X3X9htboHiTCw3u7pjfrcM9Tj-lITMCO59edQX859WuGIsX2xTq5YimVCZXnHG82hjyOgsRFo49tTS6UXoRI_X9VCBgsySlpJUjq5mbzReAbClWk-9wdzZ1nSF5WyhkfzdHjr1DJIPAQ-eKZLn04w" alt="Engine issue upload 1" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="aspect-square rounded-xl relative overflow-hidden group cursor-pointer">
                                      <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuCak5nvcxWqW3vKfqWQkcg_4SyGdkZC1zNbQiJb7EFIBPdY9z0NFEtjwuL9ljgfg51JoPLrZE26SJbhIWfC0HXfN-NHvig1ZLtvoKKahhoetBQICGBKovQhHeMtsWvtfNfNShYGy9F8Ttx09WcdPaO4a-WOuUZHkJgPJhDKI0gk1pMMYeZNsqaHIU96Ssh7F7B6qXLJXaAQXzr_VnR6u6lyNop_5Ky18-aPoiarI5QLOf0fuv2FY0scWRJ9UgQ7rF1Y3ZqJKCZhk" alt="Tire issue upload 2" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: Location */}
                <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative border border-outline-variant/15">
                    <h2 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-8 text-on-surface">Coordinate Lock</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">location_on</span>
                                <input
                                  type="text"
                                  placeholder="Your address will appear here..."
                                  value={location?.address || ''}
                                  readOnly
                                  className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none text-on-surface"
                                />
                            </div>
                            <button
                              onClick={handleGetLiveLocation}
                              disabled={locationLoading}
                              className="w-full px-6 py-4 rounded-xl bg-primary text-on-primary-fixed font-bold hover:bg-primary-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                              <span className="material-symbols-outlined">
                                {locationLoading ? 'refresh' : 'my_location'}
                              </span>
                              {locationLoading ? 'Getting Location...' : 'Get Live Location'}
                            </button>
                            {locationError && (
                              <div className="p-4 rounded-xl bg-error/10 border border-error/20">
                                <div className="flex items-start gap-3">
                                  <span className="material-symbols-outlined text-error">warning</span>
                                  <div>
                                    <p className="text-sm font-bold text-error">Location Error</p>
                                    <p className="text-xs text-on-surface-variant">{locationError}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {location && (
                              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <div className="flex items-start gap-3">
                                  <span className="material-symbols-outlined text-primary">check_circle</span>
                                  <div>
                                    <p className="text-sm font-bold text-primary">Live Location Captured</p>
                                    <p className="text-xs text-on-surface-variant">Latitude: {location.latitude.toFixed(6)}</p>
                                    <p className="text-xs text-on-surface-variant">Longitude: {location.longitude.toFixed(6)}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {!location && !locationError && (
                              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <div className="flex items-start gap-3">
                                  <span className="material-symbols-outlined text-primary">my_location</span>
                                  <div>
                                    <p className="text-sm font-bold text-primary">Live Tracking Ready</p>
                                    <p className="text-xs text-on-surface-variant">Click the button above to enable live location tracking for your service request.</p>
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                        
                        <div className="w-full md:w-1/2 h-64 rounded-2xl overflow-hidden border border-outline-variant/30 relative group">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNS7tfh8I-YJR_FX-KevOaSOGJ6RA_nTGkAVeBhgqjwZkuGB61IGm-Yr1sPax0gXlQbl29stBSM4iq5LNWbB4V609Ys9RkBK-GorApMziaY_HtRl-2U--o2sq9TSBkfHnEX2-gVvs2XSw2-U9hERHgDjBOoS0t4LvzgH5WTE6pdwyqhv-WM4t9ry24uKWpp857aQHN-p6E8SyL5hQll_Tmlv1TcZfXthaz009f7dcNZ0Kl_Ku9LAAXw8XM7_wY_5KaSAWawgpOliM" alt="Location Map" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                                <span className="text-xs font-bold tracking-widest text-primary uppercase">Sector Preview: Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-outline-variant/20">
                    <button className="px-8 py-4 text-on-surface-variant font-bold hover:text-on-surface transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined">arrow_back</span> Save Draft
                    </button>
                    <AuthGateButton
                      href="/service-results"
                      returnTo="/request-service"
                      className="w-full md:w-auto px-12 py-5 rounded-2xl bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-[family-name:var(--font-headline)] font-bold text-lg shadow-[0_10px_30px_rgba(163,166,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      Initialize Service Order
                      <span className="material-symbols-outlined">rocket_launch</span>
                    </AuthGateButton>
                </div>

            </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
