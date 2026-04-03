import DashboardNavbar from "@/components/DashboardNavbar";
import NebulaBackground from "@/components/NebulaBackground";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = { title: "Pending Listings Review | Ustaad" };

export default function PendingListingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <NebulaBackground />
      <DashboardNavbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-headline)] font-extrabold tracking-tight text-on-surface mb-2">Pending Review</h1>
              <p className="text-on-surface-variant text-lg font-[family-name:var(--font-body)]">Verification queue for celestial partner listings</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-surface-container-high px-4 py-2 rounded-xl border border-outline-variant/15 flex items-center gap-3">
                <span className="text-secondary font-bold font-[family-name:var(--font-headline)] text-xl">24</span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold font-[family-name:var(--font-label)]">Total Pending</span>
              </div>
              <div className="bg-surface-container-high px-4 py-2 rounded-xl border border-outline-variant/15 flex items-center gap-3">
                <span className="text-tertiary font-bold font-[family-name:var(--font-headline)] text-xl">08</span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold font-[family-name:var(--font-label)]">High Priority</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listing Table Container */}
        <div className="glass-card rounded-3xl overflow-hidden mb-12 border border-outline-variant/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant/15">
                  <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant font-[family-name:var(--font-label)]">Listing Details</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant font-[family-name:var(--font-label)]">Host</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant font-[family-name:var(--font-label)]">Submitted</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant font-[family-name:var(--font-label)]">Flags</th>
                  <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-on-surface-variant font-[family-name:var(--font-label)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 font-[family-name:var(--font-body)]">
                
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/20 relative shadow-sm">
                        <Image 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACy5sO1hbEJUxA0RuE_ivvPlFb4egU8mKYxZ417uIgCTrgm_QlpM7gA17sRD5To5g9hcyme0DjN6Pyjl30z2js99T6NnyHyXxD1BaMC_DDb_Q2eAPHxPAPFhgZqR8B06MIcXCTFfYkBdlr0afGpzZADcCT5TZQkQu3vtkrKxByIlo_gnBDT0OG13kc9zH6TtUWnwbovdhexQjoIMIqeyh19Z8TGJPMJPSkb_nDIQ0w-7znLRwcgfkQoggHgGIVcYMz4vaGe6iW3TE" 
                          alt="Listing" 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-headline)] font-bold text-on-surface group-hover:text-primary transition-colors text-base">Aetheris Observatory Suite</div>
                        <div className="text-sm text-on-surface-variant mt-0.5">Dubai, Marina • <span className="text-secondary">$1,200</span>/month</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs shadow-inner">ZK</div>
                      <span className="text-sm font-medium">Zayn K.</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm text-on-surface-variant">Oct 24, 14:20</td>
                  <td className="px-6 py-6">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest border border-secondary/20 whitespace-nowrap">Identity Verified</span>
                      <span className="px-2 py-1 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest border border-tertiary/20 whitespace-nowrap">New Host</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="bg-primary-container/20 hover:bg-primary-container text-primary hover:text-on-primary-container px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 border border-primary/10 hover:shadow-lg">
                      Review
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/20 relative shadow-sm">
                        <Image 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZMlCwopHMOOQecvnICYCczQ1sas61RJJafruR-0ra3v5PTkA_yW_-wUt3tMHLu3wPtEgeGG4MTOj73dO7e4Cxr_Rv9h0miO3HXVSjRPpNzm2cvUzMMbnB-vsudJ_UYsI0jZ-xyfA_xsDL6hineLlSPF12nRPa3ptmA0MX0Q2euEFrzcxoJaPYv_j9D-r3In8A_bgIjP9zVaSmjis_K3nUe4TvVKwqkaRuqdYb61p2GjdReyFvfc0flHwepA-91Y1debN23Gs7yg0" 
                          alt="Listing" 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-headline)] font-bold text-on-surface group-hover:text-primary transition-colors text-base">Nebula Glass House</div>
                        <div className="text-sm text-on-surface-variant mt-0.5">Reykjavik, IS • <span className="text-secondary">$850</span>/month</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs shadow-inner">EL</div>
                      <span className="text-sm font-medium">Elena L.</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm text-on-surface-variant">Oct 24, 09:15</td>
                  <td className="px-6 py-6">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 whitespace-nowrap">Pro Partner</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="bg-primary-container/20 hover:bg-primary-container text-primary hover:text-on-primary-container px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 border border-primary/10 hover:shadow-lg">
                      Review
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-highest/30 transition-colors group cursor-pointer bg-error/5 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/20 relative shadow-sm">
                        <Image 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyHHCW98ImgIILGqKlrRf3hbAurPNp-9Svg_QZncYimbIkEXjaT2wFZbrWr7svQxaiA4eTRt5vf_RqDhoW3JZxYxFr5EhwWcJHE4u6O4xNK5xi-h8j52ZDWKZms6vBNvVsXzHVKd3xcxzyj9fo6QX97KIeRDs_xmAuJBlYlqszPW5EkvtC7xVVORB_pOmFbeVdfaKLkxr_P3giwb6ogCZYkKEmawdT5osEkOQs2s-jgtecUAhlvNnS_PxPYBgtFJ9hiHyvv_DYirI" 
                          alt="Listing" 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-headline)] font-bold text-on-surface group-hover:text-primary transition-colors text-base">Stellar Cabin Retreat</div>
                        <div className="text-sm text-on-surface-variant mt-0.5">Aspen, CO • <span className="text-secondary">$540</span>/month</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold text-xs shadow-inner">MW</div>
                      <span className="text-sm font-medium">Marcus W.</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm text-on-surface-variant">Oct 23, 18:45</td>
                  <td className="px-6 py-6">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 rounded bg-error/10 text-error flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest border border-error/20 whitespace-nowrap">
                        <span className="material-symbols-outlined text-[12px]">warning</span> Address Issue
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="bg-primary-container/20 hover:bg-primary-container text-primary hover:text-on-primary-container px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 border border-primary/10 hover:shadow-lg">
                      Review
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal (Simulated inline view for active review) */}
        <div className="glass-card rounded-3xl p-6 md:p-8 relative mt-24 border border-outline-variant/15 ring-1 ring-primary/20 shadow-[0_0_40px_rgba(163,166,255,0.05)]">
          <div className="absolute -top-6 left-8 bg-primary-container text-on-primary-container px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_4px_15px_rgba(163,166,255,0.3)] border border-primary/30">Active Review Focus</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            
            {/* Left: Media & Details */}
            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 h-[350px] rounded-2xl overflow-hidden border border-outline-variant/20 relative group shadow-md">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCptxB32CdDKqLRQvpQQbz0pQig33x9SMh6Y9WuP0NienVOlZ9-Gthu7hRueC6_KY9AC2V7J2-0BB0aYQHuj7GdSJ7Mffg-MMKNCYTwbVkjGqymcNejO5sXToEAA9NcSoqmfpT02Y46k_nXfMCatgnrkMhmXAqRRu-0doCI6fxCGWGW835OAC75MGykfOfJ7na79RG33-irpsBosvJwCWHBiVYiUX3UO0puD60hqxOR0WQQfE9stNMGvYOXRuFrK2w2GRxV3UpxSVI" 
                    alt="Main view" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent via-surface/20"></div>
                  <div className="absolute bottom-6 left-6 flex gap-2 font-[family-name:var(--font-label)]">
                    <span className="bg-surface/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold border border-outline-variant/30 text-on-surface shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">image</span> MAIN_EXTERIOR.JPG
                    </span>
                    <span className="bg-success/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold border border-success/30 text-success shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span> RAW_METADATA_OK
                    </span>
                  </div>
                </div>
                <div className="h-[180px] rounded-2xl overflow-hidden border border-outline-variant/20 relative group">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVtVHr1kZEhZeWmWROsPWIfSXsKirhNa1a2SI4d1K3SSqMBLevGUuusbix8u5ALqvVT9kBuFcaW4yNNDC3GjRlxHHaBQQxWPVZmY4xfGhcuC-nA5qdw3ddag75GDUuwNjzmMeznDjqQjsEWWtSZ-8dRSo6i3BWNZ52u4AMFCmB7BLKfRsrtWh1cFbWGAxlcZPoYQKRoc3ysJI1vwRXBS95ZnNPhKd5luKdOI9x7uvTi74jR2HGxhbMfpGYVCmYyjUUactT72telh0" 
                    alt="Detail 1" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="h-[180px] rounded-2xl overflow-hidden border border-outline-variant/20 relative group cursor-pointer">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiGfvscZ3HGc32PujMxgBPx8QKjfs0egt8fAm2ZJ79GA-carhRrp_r-U_tlH_ExgJbvnJn94Z4zeG-1Klwxu1Dk5gdtsvS_UjY2DjOtzb6FGwim9lPE4Q__QuyvdI-9n9ifWmkvX1wxOUMdbN0kfnsGpcf9guSFLbdc8WF01MP0E2jR95S0uCiSdQ7DTMDG5-LeaECpnEkyl2DfgFr4SG_uNEedtHt2Yup20d_GlpXs12uxieyAbctK9hilVlSRRrFy7Ff-3jQUEs" 
                    alt="Detail 2" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-sm group-hover:bg-surface/40 transition-colors">
                    <span className="text-on-surface font-extrabold text-lg flex items-center gap-2 font-[family-name:var(--font-headline)]">
                      <span className="material-symbols-outlined bg-surface p-2 rounded-full border border-outline-variant/30 shadow-md">photo_library</span>
                      +8 more
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 font-[family-name:var(--font-body)]">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2 font-[family-name:var(--font-label)]">Location</div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    <span className="text-sm font-semibold text-on-surface">Palm Jumeirah, AE</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2 font-[family-name:var(--font-label)]">Host Trust</div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                    <span className="text-sm font-semibold text-on-surface">98.4 Score</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-inner">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2 font-[family-name:var(--font-label)]">Submitted</div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">schedule</span>
                    <span className="text-sm font-semibold text-on-surface">2h ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Decision Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <h2 className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface leading-tight">Aetheris Observatory Suite</h2>
                    <span className="text-primary font-bold text-2xl font-[family-name:var(--font-headline)] whitespace-nowrap">$1,200</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed font-[family-name:var(--font-body)] text-[15px]">
                    Celestial themed penthouse with 360-degree views of the Persian Gulf. Features an automated telescope array and zero-gravity filtration sleep pods.
                  </p>
                </div>

                <div className="space-y-6 mb-12 font-[family-name:var(--font-body)]">
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest font-bold text-on-surface flex items-center justify-between font-[family-name:var(--font-label)]">
                      Reviewer Notes 
                      <span className="text-[10px] text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded border border-outline-variant/20">INTERNAL ONLY</span>
                    </label>
                    <textarea 
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary text-sm min-h-[140px] p-4 text-on-surface placeholder:text-on-surface-variant/40 transition-all font-[family-name:var(--font-body)] resize-none" 
                      placeholder="Describe any concerns or reasons for rejection..."
                      defaultValue="All metadata checks out. Location matches coordinates. Host ID verified."
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/15">
                    <label className="flex items-center gap-3 cursor-pointer group w-full relative">
                      <input type="checkbox" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer bg-surface appearance-none checked:bg-primary checked:border-primary relative
                         before:content-['✓'] before:absolute before:text-white before:text-xs before:left-[4px] before:top-[1px] before:opacity-0 checked:before:opacity-100" />
                      <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors select-none">Prioritize Onboarding Process</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-error-container/10 border border-error-container/30 hover:bg-error-container/30 text-error px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-[0.98] font-[family-name:var(--font-label)]">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                  Reject
                </button>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-success to-emerald-400 hover:from-success hover:to-success text-on-primary-fixed px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_4px_20px_rgba(34,197,94,0.3)] transition-all active:scale-[0.98] font-[family-name:var(--font-label)]">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Approve
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
