import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "404 - Lost in the Nebula | Ustaad" };

export default function NotFoundPage() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col overflow-x-hidden">
      
      <main className="flex-grow flex items-center justify-center px-6 relative">
        {/* Background Nebula Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-container/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary-container/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10 py-16">
          
          {/* Celestial Illustration Side */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-full aspect-square max-w-[400px]">
              {/* The Empty Parking Spot in Space */}
              <div className="absolute inset-0 bg-surface-container-high rounded-[2rem] border border-outline-variant/20 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Space background texture */}
                <div 
                  className="absolute inset-0 opacity-40 mix-blend-overlay" 
                  style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "32px 32px" }}
                ></div>
                
                {/* Empty Parking Spot */}
                <div className="relative w-3/4 h-1/2 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-sm">
                  <div className="text-primary/10 absolute -top-12 left-1/2 -translate-x-1/2 font-[family-name:var(--font-headline)] font-black text-7xl select-none">404</div>
                  <span className="material-symbols-outlined text-primary/40 text-[80px]" style={{ fontVariationSettings: "'FILL' 0" }}>rocket_launch</span>
                  
                  {/* Label for the spot */}
                  <div className="absolute -bottom-4 bg-surface px-4 py-1.5 rounded-full border border-outline-variant/30 shadow-md">
                    <span className="text-[10px] font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant font-bold">Reserved for You</span>
                  </div>
                </div>
                
                {/* Orbiting particles */}
                <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-tertiary rounded-full blur-[2px] opacity-60 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-secondary rounded-full blur-[1px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 text-center md:text-left font-[family-name:var(--font-body)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-[family-name:var(--font-label)] uppercase tracking-[0.2em] text-primary font-bold">Signal Lost</span>
            </div>
            
            <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-7xl font-extrabold text-on-surface tracking-tighter mb-6 leading-none">
              Oops!
            </h1>
            
            <p className="font-[family-name:var(--font-body)] text-xl text-on-surface-variant leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
              The page you're looking for doesn't exist in this sector of the nebula. It might have drifted out of orbit.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(163,166,255,0.3)] active:scale-95 font-[family-name:var(--font-headline)] shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                Return Base
              </Link>
              <button 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 border border-outline-variant/30 hover:bg-surface-bright active:scale-95 font-[family-name:var(--font-headline)] shrink-0"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Go Back
              </button>
            </div>
            
            {/* Help Links */}
            <div className="mt-16 flex flex-wrap justify-center md:justify-start gap-8">
              <Link href="/help-support" className="text-[10px] font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors">Help Center</Link>
              <Link href="/help-support" className="text-[10px] font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors">Contact Support</Link>
              <span className="text-[10px] font-[family-name:var(--font-label)] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors cursor-pointer">Sitemap</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
