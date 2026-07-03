export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`brand-divider ${className}`} aria-hidden="true">
      <span className="brand-diamond" />
    </div>
  );
}
