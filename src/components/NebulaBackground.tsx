export default function NebulaBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="nebula-orb bg-primary w-[500px] h-[500px] -top-[10%] -left-[10%] animate-pulse-glow" />
      <div className="nebula-orb bg-secondary w-[600px] h-[600px] bottom-[10%] -right-[5%] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="nebula-orb bg-tertiary w-[300px] h-[300px] top-[40%] left-[60%] animate-pulse-glow" style={{ animationDelay: '4s' }} />
    </div>
  );
}
