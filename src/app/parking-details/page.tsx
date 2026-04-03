"use client";

import Navbar from "@/components/Navbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import AuthGateButton from "@/components/AuthGateButton";
import Link from "next/link";
import Image from "next/image";

export default function ParkingDetailsPage() {
  return (
    <>
      <NebulaBackground />
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Breadcrumb & Title */}
        <div className="mb-12">
            <div className="flex items-center gap-2 text-on-surface-variant mb-4 text-sm font-[family-name:var(--font-label)] uppercase tracking-widest">
                <Link href="/search-parking" className="hover:text-primary transition-colors">Parking</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>Dhaka</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary">Gulshan 2 Residentia</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight mb-4 text-on-surface">Secure Haven Parking Space</h1>
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-1 text-tertiary">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="font-bold text-lg">4.5</span>
                            <span className="text-on-surface-variant font-normal text-sm ml-1">(128 Reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined">location_on</span>
                            <span>Gulshan, Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-highest transition-colors flex items-center gap-2 font-medium">
                        <span className="material-symbols-outlined text-xl">share</span> Share
                    </button>
                    <button className="px-5 py-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-highest transition-colors flex items-center gap-2 font-medium">
                        <span className="material-symbols-outlined text-xl">favorite</span> Save
                    </button>
                </div>
            </div>
        </div>

        {/* Media Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-16 overflow-hidden rounded-3xl border border-outline-variant/20">
            <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQKdWm-c57eSgYKuXMG0KV1JqevUADs2kr8ygd5HB6UNRrkqgf_cw7dFs2D6Vtk8Sdpudbri0ZM3265ZQFCguI5N3HypgeoY2lTVbh56FxiY5kL1svX-pjxP0ej8HiAtH5-ku4iW8p_YaTFX9BWQxOQ_f0Y0rhlq_-vz6oscSpWCyqJnUCgE7IyA_vyw3jOyt4wqLHOfxJzPUW8kG2ItKaVi8M0sPAqO6tcij0pYz4gPSF8aURc01j-NhChOGmIJz8MUgJ5YsiunY" alt="Main Entrance" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-on-surface font-medium">Main Entrance</span>
                </div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAztVKt_6pSI0ZEv95khWl95mk8UyiCmmNNyvKgRjGgbVa4Fg6PoK0k9YEfj8y2_NcjSRsLPTlMPQ4rHT7ZHf_HaFLWtk2XXdKydOr_g7E7EGEFB_-KfovJxdioSeBj_YDtM40_Dx31LU4nMQxW9W5Yp_a_ANbCUxbDT2W13XnArRponW5R3K2TYw2ch42_s0KHhAkJPyEYte6FStrgZ85feJH1By8gm3f_WgVRfvdscJ2IiKmE-JtqaO1ls_9S5v9tHqdUQrlHlNc" alt="EV Charging" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative group cursor-pointer overflow-hidden">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqYRQFZ2QduwrwIvtG8ymwIpfmY1RikjyatWeJMZ3lzN2wU3VtDeB_7n6rJ60m__UbcKcl7tOlpQISWWuqXHoeooBKgNAZRNBREmRNuzGBuRNSJk_D7tj4zJjNEkrnl3AlTxVEBDZ0dLWgnEJwzFndJeS79re7khBtyAZPvqteqWjUdHwQTJ1vFTJQ5dU5bj5cVWxuuT9L93P01pgmSo8um8Kw3odvb1RqV7eo8hSDXyi8NdahBtS2Crzf17GMImK2P4wKCQuNA7g" alt="Security Camera" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:col-span-2 relative group cursor-pointer overflow-hidden">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSlCFx3AokK3PHk1c5_PGJSLExqTAGwJJ-YE7Ci5PEZvFok69K1n_CBM-fjvm94ECkhPsTHOwGzVuPCbcXsj2rPi-0rEMf6yW-4I_1P56VLyPQkA9zYCQlSHp4V9pJYiwKgeNlXLvFBpf10BADRed_zNUwTih2jyqniKbqFGvyujz2m3UxhwHdfh3WIVIUX23ShvUvbS41hpYD3cPx0XNKsXXPPUrngMFALaC6qRuV2iWSXZxlgwTn3DYmTVDHvu4AbNRAA8YU6Xc" alt="Wide Angle" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-surface/40 flex items-center justify-center">
                    <button className="bg-surface-container-highest/60 text-on-surface backdrop-blur-md border border-outline-variant/30 px-6 py-3 rounded-full font-bold hover:bg-surface-container-highest transition-all">
                        View all 12 photos
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Details Column */}
            <div className="lg:col-span-8 space-y-16">
                
                {/* Highlights Row */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-3 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-3xl text-primary">directions_car</span>
                        <div className="font-bold text-on-surface">Car, Van</div>
                        <div className="text-xs text-on-surface-variant font-[family-name:var(--font-label)]">Compatibility</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-3 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-3xl text-primary">straighten</span>
                        <div className="font-bold text-on-surface">2.5m x 5.0m</div>
                        <div className="text-xs text-on-surface-variant font-[family-name:var(--font-label)]">Dimensions</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-3 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-3xl text-primary">bolt</span>
                        <div className="font-bold text-on-surface">EV Ready</div>
                        <div className="text-xs text-on-surface-variant font-[family-name:var(--font-label)]">Charging</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-3 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-3xl text-primary">verified_user</span>
                        <div className="font-bold text-on-surface">24/7 Secure</div>
                        <div className="text-xs text-on-surface-variant font-[family-name:var(--font-label)]">Security</div>
                    </div>
                </section>

                {/* Description */}
                <section>
                    <h3 className="text-2xl font-[family-name:var(--font-headline)] border-b border-outline-variant/20 pb-4 font-bold mb-6 text-on-surface">Space Description</h3>
                    <p className="text-on-surface-variant leading-relaxed text-lg mb-4">
                        Located in the heart of Gulshan 2, this premium underground parking spot offers unparalleled security and convenience. The facility features wide access ramps, making it ideal for both luxury sedans and family vans. 
                    </p>
                    <p className="text-on-surface-variant leading-relaxed text-lg">
                        Our celestial management system ensures seamless entry/exit with license plate recognition. The spot is located near the elevator lobby, providing quick access to the main road and nearby commercial hubs.
                    </p>
                </section>

                {/* Amenities */}
                <section>
                    <h3 className="text-2xl font-[family-name:var(--font-headline)] border-b border-outline-variant/20 pb-4 font-bold mb-8 text-on-surface">Offered Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        {[
                            { icon: "videocam", title: "24/7 CCTV Surveillance", desc: "High-definition monitoring at all times" },
                            { icon: "ev_station", title: "EV Charging Point", desc: "Universal Type 2 charger available" },
                            { icon: "security", title: "On-site Security", desc: "Professional guard patrol hourly" },
                            { icon: "emoji_objects", title: "Bright LED Lighting", desc: "Always illuminated for safety" }
                        ].map((amenity, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                                    <span className="material-symbols-outlined">{amenity.icon}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-on-surface">{amenity.title}</div>
                                    <div className="text-sm text-on-surface-variant">{amenity.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Location Map Placeholder */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-[family-name:var(--font-headline)] border-b border-outline-variant/20 pb-4 font-bold text-on-surface">Location</h3>
                        <span className="text-primary font-medium flex items-center gap-1 cursor-pointer hover:underline mb-4">
                            Get Directions <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </span>
                    </div>
                    <div className="w-full h-80 rounded-3xl overflow-hidden bg-surface-container relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/20 animate-pulse rounded-full"></div>
                                <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-4">
                <div className="sticky top-28 glass-card rounded-3xl p-8 shadow-2xl border border-primary/20 bg-surface-variant/30 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-3xl font-[family-name:var(--font-headline)] text-on-surface font-extrabold">৳100</span>
                            <span className="text-on-surface-variant"> / hr</span>
                        </div>
                        <div className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                            ACTIVE SPOT
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-[family-name:var(--font-label)] text-on-surface-variant ml-1">Select Date</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">calendar_today</span>
                                <input type="text" readOnly defaultValue="Oct 24, 2024" className="w-full bg-surface-container-highest cursor-pointer border border-outline-variant/50 rounded-xl py-3.5 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-[family-name:var(--font-label)] text-on-surface-variant ml-1">Check-in</label>
                                <input type="text" readOnly defaultValue="10:00 AM" className="w-full bg-surface-container-highest cursor-pointer border border-outline-variant/50 rounded-xl py-3.5 px-4 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-center" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-[family-name:var(--font-label)] text-on-surface-variant ml-1">Check-out</label>
                                <input type="text" readOnly defaultValue="02:00 PM" className="w-full bg-surface-container-highest cursor-pointer border border-outline-variant/50 rounded-xl py-3.5 px-4 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-center" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-outline-variant/30 space-y-4">
                            <div className="flex justify-between text-on-surface-variant">
                                <span>৳100 x 4 hours</span>
                                <span>৳400</span>
                            </div>
                            <div className="flex justify-between text-on-surface-variant">
                                <span>Service Fee</span>
                                <span>৳0</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-2 text-on-surface">
                                <span>Total</span>
                                <span className="text-primary">৳400</span>
                            </div>
                        </div>

                        <AuthGateButton
                          href="/checkout"
                          returnTo="/parking-details"
                          className="w-full block text-center bg-gradient-to-r from-primary to-primary-dim text-on-primary-fixed font-[family-name:var(--font-headline)] font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                          Reserve Now
                        </AuthGateButton>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-on-surface-variant">You won&apos;t be charged yet</p>
                        <div className="flex items-center justify-center gap-4 mt-6 grayscale opacity-40">
                            <span className="material-symbols-outlined text-on-surface">credit_card</span>
                            <span className="material-symbols-outlined text-on-surface">account_balance_wallet</span>
                            <span className="material-symbols-outlined text-on-surface">contactless</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
