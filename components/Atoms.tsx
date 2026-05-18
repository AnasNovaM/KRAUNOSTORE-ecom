'use client';

import { useState, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'clay' | 'ghost' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  full?: boolean;
  disabled?: boolean;
}

export function Button({ children, variant = 'primary', size = 'md', onClick, full, disabled }: ButtonProps) {
  const [hov, setHov] = useState(false);

  const base: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    borderRadius: 4,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-base) var(--ease), color var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease)',
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: full ? '100%' : 'auto',
  };

  const sizes: Record<ButtonSize, React.CSSProperties> = {
    sm: { fontSize: 13, padding: '8px 14px' },
    md: { fontSize: 14, padding: '12px 22px' },
    lg: { fontSize: 15, padding: '16px 28px' },
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: '#1A1814', color: '#F4EFE6', borderColor: '#1A1814' },
    clay:    { background: '#B8674A', color: '#F4EFE6', borderColor: '#B8674A' },
    ghost:   { background: 'transparent', color: '#1A1814', borderColor: '#1A1814' },
    text:    { background: 'transparent', color: '#1A1814', borderColor: 'transparent', borderRadius: 0, borderBottom: '1px solid var(--hairline)', padding: '6px 0' },
  };

  const disabledStyle: React.CSSProperties = disabled
    ? { background: 'var(--paper-2)', color: 'var(--stone)', borderColor: 'var(--paper-2)' }
    : {};

  const hoverStyle: React.CSSProperties = hov && !disabled ? (
    variant === 'primary' ? { background: '#2b2823' } :
    variant === 'clay'    ? { background: '#944E36', borderColor: '#944E36' } :
    variant === 'ghost'   ? { background: '#1A1814', color: '#F4EFE6' } :
    variant === 'text'    ? { borderBottomColor: '#1A1814' } : {}
  ) : {};

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...disabledStyle, ...hoverStyle }}
    >
      {children}
    </button>
  );
}

interface EyebrowProps {
  num?: string;
  label: string;
  rule?: boolean;
}

export function Eyebrow({ num, label, rule }: EyebrowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
      {num && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>{num}</span>
      )}
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
        {label}
      </span>
      {rule && <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }}/>}
    </div>
  );
}
