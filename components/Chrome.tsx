'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { useCart } from '@/lib/cart';

export function PromoBar() {
  return (
    <div style={{ padding: '9px 24px', background: 'var(--ink)', color: 'var(--paper)', fontSize: 12, textAlign: 'center', letterSpacing: '0.02em' }}>
      Free shipping on orders over <span style={{ fontFamily: 'var(--font-mono)' }}>$80</span>. 30-day returns. Ships from Toronto.
    </div>
  );
}

const navLinks = [
  { label: 'Work',     href: '/collection/Work' },
  { label: 'Recover',  href: '/collection/Recover' },
  { label: 'Rest',     href: '/collection/Rest' },
  { label: 'The Edit', href: '/' },
  { label: 'Journal',  href: '/' },
];

const iconBtn: React.CSSProperties = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  color: 'var(--ink)', padding: 0, display: 'inline-flex',
};

export function Header() {
  const cart = useCart();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <>
      <PromoBar/>
      <header style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--hairline)', background: 'var(--paper)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.18em', color: 'var(--ink)', border: 'none' }}>
            KRAUNO
          </Link>
          <nav style={{ display: 'flex', gap: 24 }}>
            {navLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                onMouseEnter={() => setHover(l.label)}
                onMouseLeave={() => setHover(null)}
                style={{
                  fontSize: 13,
                  color: hover === l.label ? 'var(--ink)' : 'var(--ink-2)',
                  border: 'none',
                  transition: 'color var(--dur-base) var(--ease)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, color: 'var(--ink)' }}>
          <button style={iconBtn}>{Icons.search(18)}</button>
          <Link href="/account" style={{ display: 'inline-flex', ...iconBtn }}>{Icons.user(18)}</Link>
          <button style={iconBtn} onClick={() => cart.setOpen(true)} title="Cart">
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              {Icons.bag(18)}
              {cart.count > 0 && (
                <span style={{
                  position: 'absolute', top: -7, right: -9,
                  background: 'var(--clay)', color: 'var(--paper)',
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  minWidth: 16, height: 16, padding: '0 4px',
                  borderRadius: 999, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  {cart.count}
                </span>
              )}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  const cols = [
    { h: 'Shop',    items: ['Work', 'Recover', 'Rest', 'The Edit', 'Bundles', 'Gift cards'] },
    { h: 'About',   items: ['Our story', 'Journal', 'Press', 'Careers'] },
    { h: 'Support', items: ['Shipping', 'Returns', 'Warranty', 'Contact'] },
  ];
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '80px 40px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, maxWidth: 1280, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, letterSpacing: '0.18em' }}>KRAUNO</div>
          <p style={{ marginTop: 22, color: '#B8B5AB', maxWidth: 360, lineHeight: 1.6, fontSize: 14 }}>
            We don't carry everything. We carry what works. For the third of your life you spend at a desk, and the third you spend trying to sleep.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <input
              placeholder="you@domain.com"
              style={{ background: 'transparent', border: '1px solid #6E665A', color: 'var(--paper)', padding: '12px 14px', fontSize: 13, flex: 1, borderRadius: 2, fontFamily: 'var(--font-body)', maxWidth: 280 }}
            />
            <button style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '0 22px', fontSize: 13, fontWeight: 500, borderRadius: 2, cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>
        {cols.map(col => (
          <div key={col.h}>
            <div className="eyebrow" style={{ color: '#8A857C', marginBottom: 18 }}>{col.h}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map(item => (
                <li key={item} style={{ fontSize: 13, color: '#DED7C8', cursor: 'pointer' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '60px auto 0', paddingTop: 24, borderTop: '1px solid #3A362F', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#8A857C' }}>
        <span>&copy; 2026 KRAUNO. Toronto.</span>
        <div style={{ display: 'flex', gap: 22 }}>
          <span>Privacy</span><span>Terms</span><span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
