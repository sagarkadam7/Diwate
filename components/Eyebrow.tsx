export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="tracked-caps text-[11px] sm:text-xs text-gold-text font-medium mb-3">
      {children}
    </p>
  );
}
