import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { ProductImg } from '@/components/ProductImg';
import { Button, Eyebrow } from '@/components/Atoms';

const ORDERS = [
  { id: 'K-92041', date: 'Oct 12, 2026', status: 'Delivered', items: ['lp-04', 'bl-05'], total: 138 },
  { id: 'K-91002', date: 'Sep 02, 2026', status: 'Delivered', items: ['mg-07'],          total: 219 },
  { id: 'K-87889', date: 'Jul 18, 2026', status: 'Delivered', items: ['wb-13', 'sm-11'], total: 193 },
];

const NAV_ITEMS = [
  ['Orders',      true],
  ['Addresses',   false],
  ['Payment',     false],
  ['Wishlist',    false],
  ['Preferences', false],
  ['Sign out',    false],
] as const;

export default function AccountPage() {
  return (
    <main style={{ padding: '64px 40px 96px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Eyebrow label="Account"/>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
          Hello, Alex.
        </h1>
        <p style={{ marginTop: 12, color: 'var(--ink-3)', fontSize: 14 }}>Member since March 2025 · 7 orders</p>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, marginTop: 56 }}>
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_ITEMS.map(([n, on]) => (
                <li key={n}>
                  <a style={{ display: 'block', fontSize: 14, color: on ? 'var(--ink)' : 'var(--ink-2)', fontWeight: on ? 500 : 400, padding: '8px 0 8px 14px', cursor: 'pointer', border: 'none', borderLeft: on ? '2px solid var(--ink)' : '2px solid transparent' }}>
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, letterSpacing: '-0.02em' }}>Recent orders</h2>
              <a style={{ fontSize: 13, color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: 2, cursor: 'pointer' }}>View all</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ORDERS.map(o => {
                const products = o.items.map(id => PRODUCTS.find(x => x.id === id)).filter(Boolean);
                return (
                  <div key={o.id} style={{ background: 'var(--bone)', border: '1px solid var(--hairline)', borderRadius: 2, padding: 22, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 22, alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {products.map(p => p && (
                        <div key={p.id} style={{ width: 60 }}>
                          <ProductImg shape={p.shape} bg={p.bg} ratio="1/1"/>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.02em' }}>{o.id} · {o.date}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginTop: 4 }}>
                        {products.map(p => p?.name).join(', ')}
                      </div>
                      <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sage-deep)', fontSize: 12 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--sage-deep)', flexShrink: 0 }}/> {o.status}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ink)' }}>${o.total}</div>
                      <a style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: 'var(--ink)', borderBottom: '1px solid var(--hairline)', paddingBottom: 1, cursor: 'pointer' }}>Reorder</a>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--hairline)' }}>
              <Eyebrow label="For your next chapter"/>
              <p style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ink)', maxWidth: '40ch' }}>
                Based on the Recover edit you've bought from, the heating pad pairs well.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link href="/product/hp-09" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, padding: '12px 22px', background: 'transparent', color: '#1A1814', borderRadius: 4, border: '1px solid #1A1814', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  See the heating pad &nbsp;→
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
