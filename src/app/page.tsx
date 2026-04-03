import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HeroPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        {/* Background Orbs (The Nebula) */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary nebula-glow rounded-full" />
        <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] bg-primary nebula-glow rounded-full" />
        <div className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] bg-tertiary nebula-glow rounded-full" />

        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 px-6 md:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-secondary via-primary to-tertiary rounded-full blur-[160px] opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-8xl font-extrabold tracking-tighter leading-[1.05] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                Navigate the <br />
                <span className="text-primary italic">Celestial Frontier</span>{" "}
                <br />
                of Parking
              </h1>
              <p className="font-[family-name:var(--font-body)] text-lg md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed">
                Ustaad connects car owners with smart parking and premium
                vehicle services across the nebula.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  href="/register"
                  className="group relative px-10 py-5 bg-surface-variant/40 backdrop-blur-xl border border-outline-variant/30 rounded-full overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative font-[family-name:var(--font-headline)] text-lg font-bold text-white flex items-center gap-2">
                    Get Started{" "}
                    <span className="material-symbols-outlined text-primary">
                      arrow_forward
                    </span>
                  </span>
                </Link>
                <Link
                  href="/search-parking"
                  className="font-[family-name:var(--font-headline)] text-lg font-semibold text-on-surface hover:text-primary transition-colors duration-300"
                >
                  Explore Services
                </Link>
              </div>
            </div>
            {/* Decorative gradient mesh */}
            <div className="mt-24 relative w-full h-[400px] flex justify-center items-end">
              <div className="absolute bottom-0 w-full h-[300px] opacity-30">
                <div className="w-full h-full rounded-t-[100px] bg-gradient-to-t from-primary-dim/20 via-secondary/10 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPS (Bento Style Grid) */}
        <section className="py-24 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "radar",
                title: "Real-Time Discovery",
                desc: "Find verified parking slots instantly using our deep-space mapping algorithms. No more circling the nebula.",
                color: "primary-fixed",
                bg: "primary-container",
              },
              {
                icon: "auto_awesome",
                title: "Celestial Subscriptions",
                desc: "Flexible hourly to monthly plans tailored for your trajectory. Pay only for the space you occupy.",
                color: "secondary",
                bg: "secondary-container",
              },
              {
                icon: "support_agent",
                title: "Emergency Assistance",
                desc: "Our 24/7 vehicle service network is on standby across the galaxy for repairs and maintenance.",
                color: "tertiary",
                bg: "tertiary-container",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass-panel p-10 rounded-[2.5rem] border border-outline-variant/15 flex flex-col items-start gap-6 hover:translate-y-[-8px] transition-transform duration-500"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-${card.bg}/20 flex items-center justify-center`}
                >
                  <span
                    className={`material-symbols-outlined text-${card.color} text-3xl`}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-on-surface-variant leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN THE NETWORK SECTION */}
        <section className="py-32 px-6 md:px-12 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs tracking-widest uppercase mb-6">
                The Hub
              </span>
              <h2 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
                Join the <span className="text-tertiary">Network.</span>
              </h2>
              <p className="font-[family-name:var(--font-body)] text-lg text-on-surface-variant mb-10 max-w-lg">
                Whether you&apos;re cruising through the city or managing a
                parking fleet, Ustaad offers the tools to thrive in the smart
                mobility ecosystem.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {/* Car Owners Card */}
              <div className="glass-panel p-8 rounded-3xl border border-outline-variant/10 hover:border-primary/40 transition-all duration-300">
                <div className="mb-12">
                  <span
                    className="material-symbols-outlined text-primary-fixed text-5xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    directions_car
                  </span>
                </div>
                <h4 className="font-[family-name:var(--font-headline)] text-2xl font-bold mb-4">
                  Car Owners
                </h4>
                <p className="text-sm text-on-surface-variant mb-8 h-12">
                  Register your vehicle and gain access to premium valet
                  services.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-primary font-bold tracking-tight hover:gap-4 transition-all"
                >
                  Sign Up{" "}
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
              </div>
              {/* Garage Owners Card */}
              <div className="glass-panel p-8 rounded-3xl border border-outline-variant/10 hover:border-secondary/40 transition-all duration-300 sm:mt-8">
                <div className="mb-12">
                  <span
                    className="material-symbols-outlined text-secondary text-5xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    garage
                  </span>
                </div>
                <h4 className="font-[family-name:var(--font-headline)] text-2xl font-bold mb-4">
                  Garage Owners
                </h4>
                <p className="text-sm text-on-surface-variant mb-8 h-12">
                  Monetize your empty space and join the world&apos;s smartest
                  parking fleet.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-secondary font-bold tracking-tight hover:gap-4 transition-all"
                >
                  Sign Up{" "}
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
            <div className="relative glass-panel rounded-[3rem] p-12 md:p-24 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />
              <div className="relative z-10 text-center md:text-left">
                <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-5xl font-extrabold mb-4">
                  Ready for Liftoff?
                </h2>
                <p className="text-on-surface-variant text-lg">
                  Secure your spot in the future of urban navigation.
                </p>
              </div>
              <Link
                href="/register"
                className="relative z-10 px-12 py-6 bg-white text-black font-[family-name:var(--font-headline)] font-bold text-xl rounded-2xl hover:bg-primary-container transition-colors duration-300"
              >
                Launch Ustaad
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
