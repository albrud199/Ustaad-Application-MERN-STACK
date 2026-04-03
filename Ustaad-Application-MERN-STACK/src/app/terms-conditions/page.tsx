import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Terms of Service | Ustaad" };

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Background Orbs */}
      <div className="fixed w-[600px] h-[600px] bg-secondary-container/10 blur-[120px] rounded-full top-[-100px] right-[-100px] -z-10 pointer-events-none"></div>
      <div className="fixed w-[500px] h-[500px] bg-tertiary-container/10 blur-[120px] rounded-full bottom-[-100px] left-[-100px] -z-10 pointer-events-none"></div>

      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row gap-12 font-[family-name:var(--font-body)]">
          
          {/* Side Navigation (The Map) */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="md:sticky md:top-32 space-y-2">
              <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-[0.2em] mb-6 px-4 font-[family-name:var(--font-label)]">Navigation</h3>
              <nav className="space-y-1">
                <Link href="#introduction" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold transition-all group">
                  <span className="text-sm">1. Introduction</span>
                </Link>
                <Link href="#responsibilities" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all group">
                  <span className="text-sm">2. Responsibilities</span>
                </Link>
                <Link href="#privacy" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all group">
                  <span className="text-sm">3. Data Privacy</span>
                </Link>
                <Link href="#liability" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all group">
                  <span className="text-sm">4. Liability</span>
                </Link>
              </nav>
              <div className="mt-12 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Last Updated:<br/>
                  <span className="text-on-surface font-medium block mt-1">October 24, 2024</span>
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content (The Vessel) */}
          <section className="flex-1 max-w-3xl">
            <header className="mb-12">
              <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-4">Terms of Service</h1>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Welcome to Ustaad. These terms govern your use of our celestial navigation and parking optimization services.
              </p>
            </header>

            <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-outline-variant/15 shadow-2xl space-y-16">
              
              {/* Section 1 */}
              <article id="introduction" className="scroll-mt-32">
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  1. Introduction
                </h2>
                <div className="space-y-4 text-on-surface-variant leading-relaxed text-[15px]">
                  <p>
                    By accessing or using the Ustaad platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. We provide a decentralized parking and logistical coordination network that operates on real-time data streaming.
                  </p>
                  <p>
                    Our platform uses advanced algorithmic celestial mapping to ensure high-fidelity navigation data. These services are provided &quot;as-is&quot; and are subject to continuous iteration and updates.
                  </p>
                </div>
              </article>

              {/* Section 2 */}
              <article id="responsibilities" className="scroll-mt-32">
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  2. User Responsibilities
                </h2>
                <div className="space-y-4 text-on-surface-variant leading-relaxed text-[15px]">
                  <p>
                    Users are responsible for maintaining the confidentiality of their account credentials. You agree to provide accurate, current, and complete information during the registration process and to update such information as needed.
                  </p>
                  <ul className="list-none space-y-4 mt-8">
                    <li className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">check_circle</span>
                      <span className="text-on-surface">You must be at least <strong className="text-on-secondary-container">18 years of age</strong> to utilize our logistical protocols.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">check_circle</span>
                      <span className="text-on-surface">Commercial use of the platform requires a verified Admin enterprise license.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">check_circle</span>
                      <span className="text-on-surface">No reverse engineering of the celestial mapping engine is permitted.</span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 3 */}
              <article id="privacy" className="scroll-mt-32">
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  3. Data Privacy
                </h2>
                <div className="space-y-6 text-on-surface-variant leading-relaxed text-[15px]">
                  <p>
                    Your privacy is paramount. We encrypt all telemetry data at the edge. Please refer to our separate Privacy Policy for a detailed breakdown of how we handle your metadata. 
                  </p>
                  <div className="bg-surface-container-highest p-6 rounded-2xl border-l-4 border-tertiary shadow-inner">
                    <p className="text-sm font-bold text-tertiary mb-2 italic flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm">security</span>
                       Crucial Protocol Notice:
                    </p>
                    <p className="text-sm text-on-surface-variant font-medium">Ustaad never shares real-time location vectors with third-party advertisers without explicit cryptographic consent.</p>
                  </div>
                </div>
              </article>

              {/* Section 4 */}
              <article id="liability" className="scroll-mt-32">
                <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  4. Limitation of Liability
                </h2>
                <div className="space-y-4 text-on-surface-variant leading-relaxed text-[15px]">
                  <p>
                    To the maximum extent permitted by law, Ustaad shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues. Navigation accuracy may be affected by atmospheric interference or solar flares.
                  </p>
                </div>
              </article>

              <div className="pt-8 border-t border-outline-variant/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-primary hover:bg-primary-dim text-on-primary-fixed px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 font-[family-name:var(--font-headline)]">
                      Accept Terms
                    </button>
                    <button className="w-full sm:w-auto text-on-surface hover:text-primary px-6 py-3 transition-colors font-bold font-[family-name:var(--font-headline)] text-sm border border-outline-variant/20 rounded-xl hover:border-primary/50">
                      Download PDF
                    </button>
                  </div>
                  <p className="text-[10px] text-outline font-bold uppercase tracking-widest font-[family-name:var(--font-label)] shrink-0">Version 2.4.1-Etheric</p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
