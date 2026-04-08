import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import NebulaBackground from "@/components/NebulaBackground";
import Image from "next/image";

export const metadata = { title: "Add Parking Space | Ustaad" };

export default function AddParkingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary selection:text-on-primary-container overflow-x-hidden">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-5xl mx-auto w-full relative z-10">
        {/* Wizard Header */}
        <header className="mb-12">
          <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            List Your Space
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-[family-name:var(--font-body)]">
            Define your celestial coordinates. Share your parking infrastructure
            with the Ustaad network.
          </p>
        </header>

        {/* Progress Indicator */}
        <div className="mb-16">
          <div className="flex justify-between mb-4 px-2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Step 3 of 5: Pricing Strategy
            </span>
            <span className="text-on-surface-variant text-xs uppercase tracking-widest">
              60% Complete
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/5"></div>
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex flex-col items-center gap-2 opacity-100">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary-fixed shadow-md">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-primary">
                Info
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary-fixed shadow-md">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-primary">
                Amenities
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 relative">
              <div className="absolute -top-2 w-12 h-12 bg-primary/20 rounded-full animate-ping"></div>
              <div className="w-8 h-8 rounded-full border-2 border-primary bg-surface flex items-center justify-center text-primary relative z-10 shadow-md">
                <span className="text-xs font-bold">03</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-primary">
                Pricing
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-8 h-8 rounded-full border-2 border-outline-variant bg-surface flex items-center justify-center text-on-surface-variant">
                <span className="text-xs font-bold">04</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface">
                Photos
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-8 h-8 rounded-full border-2 border-outline-variant bg-surface flex items-center justify-center text-on-surface-variant">
                <span className="text-xs font-bold">05</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface">
                Review
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Step Form Layout (Bento-style Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Canvas */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section: Rates */}
            <section className="glass-card p-8 rounded-xl border border-outline-variant/15">
              <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  payments
                </span>
                Pricing Rates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                    Hourly Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline text-on-surface font-[family-name:var(--font-headline)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                    Daily Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline text-on-surface font-[family-name:var(--font-headline)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                    Monthly Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline text-on-surface font-[family-name:var(--font-headline)]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Capacity & Address */}
            <section className="glass-card p-8 rounded-xl border border-outline-variant/15">
              <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                Infrastructure Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 122 Celestial Way, Neo-Tokyo Central"
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline text-on-surface font-[family-name:var(--font-body)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                    Total Slots
                  </label>
                  <input
                    type="number"
                    placeholder="1"
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline text-on-surface font-[family-name:var(--font-headline)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                    Access Protocol
                  </label>
                  <select className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none text-on-surface cursor-pointer font-[family-name:var(--font-body)]">
                    <option>Automated QR Gate</option>
                    <option>Attendant Managed</option>
                    <option>Keypad Code</option>
                    <option>Physical Key</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section: Photo Upload */}
            <section className="glass-card p-8 rounded-xl border border-outline-variant/15">
              <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  add_a_photo
                </span>
                Visual Documentation
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Upload Placeholder */}
                <div className="aspect-square rounded-xl border-2 border-dashed border-outline-variant/50 hover:border-primary transition-colors flex flex-col items-center justify-center cursor-pointer group bg-surface-container-low hover:bg-primary/5">
                  <span className="material-symbols-outlined text-3xl text-outline-variant group-hover:text-primary mb-2 transition-colors">
                    upload_file
                  </span>
                  <span className="text-[10px] font-bold uppercase text-outline-variant group-hover:text-primary">
                    Upload
                  </span>
                </div>

                {/* Previews */}
                <div className="relative aspect-square rounded-xl overflow-hidden group shadow-md border border-outline-variant/20">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeNWdWvy-7n1A8KD275DzWHLzPvUzSxVElF_Z9MW7eM30Ac2u3LbGo-y_lUGD5SiPE6DG7ac9Qzm-18ous9wVbof34DVkj3L8ywXTQvdHOGBSHQdgGcUpUPmp2i2EGHdAXIsyE-b9tJr6R_ULSIKlj289wK-gEA_2Gnfv6tg5AfvB4ovGYBbLMXqz9i5wIkNhPX9M4sJXokeewMqA7MWdJL5Irn2D4m1EjwcU2LE3Ub-anlnLyQFSuuvsgXAny02VMb85aob7Exu8"
                    alt="Upload 1"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <button className="absolute top-2 right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-dim">
                    <span className="material-symbols-outlined text-xs text-on-error">
                      close
                    </span>
                  </button>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden group shadow-md border border-outline-variant/20">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBm4qf6f_GpJ3aM4_n8cjAQQ8WYBSmA--qUiJY1X9HMzbpA9Yukelw7d72rDAiKt1hlDE-V6R7rR5yomAMt9XzvO7LexLnaA6KIPhzGCn6DSzUbdAldCte07GCtbpg89awGg1DKay3EsxvtOiOwiBuX5-pP7IMuU_1kPmmOVB8pTdzNWRZwOW3pAB6DvyHvF73zX9IQ5YYToXlvYG_W0i4NbM-eNut-Zix5qT4XpQF3tHivXCZBPVet79CzOPnY7J2n9b-KsrMn90"
                    alt="Upload 2"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <button className="absolute top-2 right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-dim">
                    <span className="material-symbols-outlined text-xs text-on-error">
                      close
                    </span>
                  </button>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden group shadow-md border border-outline-variant/20">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlA5Ig2L2AHQHiYx5O4z3crnd9sw4nNedOJq-w-5Whqjm1Z7KZmF9jrtNIwDHiWeeYlZQir4Bx_NjxgmsY6L7s8fswf392WlBwTmW38E10xVLwLb1A0IV5tlUj5UvNUGJ2s4m2VPKYMXJSHua_wJh2LUruJW2aZz79q4MO5ho0vnUOfrHey9OaMmqikwYfTLmuLU_DNHrNM2_93QPlPfGo537UN7zt47xHXxTAs6uHRQoQz1t--Zpr0fKkRvJLXpcShvrJpvrfx1E"
                    alt="Upload 3"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <button className="absolute top-2 right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-dim">
                    <span className="material-symbols-outlined text-xs text-on-error">
                      close
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* Action Bar */}
            <div className="flex justify-between items-center py-6">
              <button className="px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  arrow_back
                </span>
                Back
              </button>
              <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-dim rounded-xl font-bold uppercase tracking-widest text-sm text-on-primary-fixed shadow-[0_4px_20px_0_rgba(163,166,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                Proceed to Photos
              </button>
            </div>
          </div>

          {/* Sidebar Info/Tips */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-xl space-y-4 border border-outline-variant/15">
              <h3 className="text-secondary font-bold text-sm uppercase tracking-widest">
                Expert Advice
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Listings with clear, high-resolution photos of both the entrance
                and the individual slot earn{" "}
                <span className="text-on-surface font-semibold">
                  40% more revenue
                </span>{" "}
                in their first month.
              </p>
              <div className="p-4 bg-surface-container-high rounded-lg border border-outline-variant/10">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block mb-2">
                  Pro Tip
                </span>
                <p className="text-xs text-on-surface-variant">
                  Set your daily rate to 4x your hourly rate for optimal
                  conversion.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-outline-variant/15">
              <h3 className="text-tertiary font-bold text-sm uppercase tracking-widest mb-4">
                Location Preview
              </h3>
              <div className="aspect-video bg-surface-container rounded-lg overflow-hidden relative group border border-outline-variant/20">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent opacity-60 z-10"></div>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6PsB4xA24VxqSFuaL2N2cBGO0Th2NDGxq907mJupS8Cpk9R9y5l2Wm6w-ZJA0jSWF3ht4P4tDMviQSOpGQKKLzjrlaP7PWIrom5VDdT6GSitb4ccSAh9CZJKRNKUbilRuStbkNpFbGpuFBihhx7mlSwAuZsAaNjJAk291JSoSvaOVwV0igXeITRQC5ML5X4zUZb9ss0sTozkq8CrgVhAFobCiAjQhgfaFD8qZ_BYFumxyGX0DzSyl2z4zp3Lq2yvMpQ5vJ3GEDgY"
                  alt="Map Preview"
                  fill
                  className="object-cover grayscale opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase text-white/70 z-20">
                  Neo-Tokyo District 4
                </span>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="glass-card p-6 rounded-xl border border-primary/30 overflow-hidden relative shadow-[0_0_15px_rgba(163,166,255,0.05)]">
              <div className="absolute top-0 right-0 p-3">
                <span className="bg-secondary text-[10px] font-black px-2 py-1 rounded text-on-secondary uppercase shadow-sm">
                  Preview
                </span>
              </div>
              <h3 className="text-on-surface font-bold text-sm mb-4">
                Market Outlook
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant font-medium">
                    Demand Level
                  </span>
                  <span className="text-xs font-bold text-secondary tracking-widest">
                    CRITICAL
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant font-medium">
                    Avg. Neighborhood Rate
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    $5.20/hr
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(246,115,183,0.5)]"></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
