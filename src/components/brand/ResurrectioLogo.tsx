/**
 * ResurrectioLogo — A bird rising in flight, representing freedom and transformation.
 * Inspired by the spirit of handwritten prison letters — human, warm, hopeful.
 */
interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function ResurrectioLogo({ className = '', size = 40, color = 'currentColor' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Resurrectio — The Rising"
    >
      {/* Bird in flight — two sweeping wings rising upward */}
      <path
        d="M32 48 C28 40, 12 30, 4 20 C10 24, 18 26, 26 32 C24 26, 20 16, 22 8 C24 16, 28 24, 32 30"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 48 C36 40, 52 30, 60 20 C54 24, 46 26, 38 32 C40 26, 44 16, 42 8 C40 16, 36 24, 32 30"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small rising arc beneath — the path forward */}
      <path
        d="M22 54 C26 50, 30 49, 32 49 C34 49, 38 50, 42 54"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export function ResurrectioMark({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <div
      className={`rounded-xl bg-primary/10 flex items-center justify-center ${className}`}
      style={{ width: size + 8, height: size + 8 }}
    >
      <ResurrectioLogo size={size} color="hsl(var(--primary))" />
    </div>
  );
}
