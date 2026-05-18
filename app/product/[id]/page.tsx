'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { ProductImg } from '@/components/ProductImg';
import { ProductCard } from '@/components/ProductCard';
import { Button, Eyebrow } from '@/components/Atoms';
import { Icons } from '@/components/Icons';

const qtyBtn: React.CSSProperties = {
  background: 'transparent', border: 'none', padding: '14px 16px',
  cursor: 'pointer', color: 'var(--ink)', display: 'inline-flex',
};

function Promise({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ color: 'var(--ink)' }}>{icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

const specLabels = ['material', 'feature', 'size', 'weight'];

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const p = PRODUCTS.find(x => x.id === id) ?? PRODUCTS[0];
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [thumb, setThumb] = useState(0);

  const inStock = p.stock !== 'sold';
  const stockLabel = { in: 'In stock · ships in 1–2 days', low: 'Low stock · 4 left', sold: 'Sold out' }[p.stock];
  const stockColor = { in: 'var(--sage-deep)', low: '#B8894A', sold: 'var(--danger)' }[p.stock];

  const related = PRODUCTS.filter(x => x.pillar === p.pillar && x.id !== p.id).slice(0, 4);
  const thumbBgs = [p.bg, '#EBE5D9', '#C8D0BF', '#B8B5AB'];

  return (
    <main>
      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 40px 0', fontSize: 12, color: 'var(--ink-3)' }}>
        <Link href="/" style={{ color: 'inherit', border: 'none' }}>KRAUNO</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link href={`/collection/${p.pillar}`} style={{ color: 'inherit', border: 'none' }}>{p.pillar}</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--ink)' }}>{p.name}</span>
      </div>

      {/* MAIN PDP */}
      <section style={{ padding: '32px 40px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64 }}>
          {/* GALLERY */}
          <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1, 2, 3].map(i => (
                <button
                  key={i}
                  onClick={() => setThumb(i)}
                  style={{ padding: 0, border: thumb === i ? '1px solid var(--ink)' : '1px solid var(--hairline)', background: 'transparent', borderRadius: 4, cursor: 'pointer', overflow: 'hidden' }}
                >
                  <ProductImg shape={p.shape} bg={thumbBgs[i] ?? p.bg} ratio="1/1"/>
                </button>
              ))}
            </div>
            <div>
              <ProductImg shape={p.shape} bg={thumbBgs[thumb] ?? p.bg} ratio="4/5"/>
            </div>
          </div>

          {/* INFO */}
          <div style={{ paddingTop: 8 }}>
            <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>{p.pillar} edit</div>
            <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 56, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--ink)' }}>
              {p.name}
            </h1>
            <p style={{ marginTop: 18, fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: '40ch' }}>{p.blurb}</p>
            <p style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: '46ch' }}>{p.detail}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, color: 'var(--ink)' }}>
              <span style={{ display: 'inline-flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => <span key={i}>{Icons.star(14)}</span>)}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>4.8 · 312 reviews</span>
            </div>

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: 'var(--ink)' }}>${p.price}</span>
              {p.was && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--ink-3)', textDecoration: 'line-through' }}>${p.was}</span>}
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: stockColor }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: stockColor, flexShrink: 0 }}/> {stockLabel}
              </span>
            </div>

            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--ink)', borderRadius: 4 }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={qtyBtn}>{Icons.minus(14)}</button>
                <span style={{ padding: '0 14px', fontFamily: 'var(--font-mono)', fontSize: 15, minWidth: 28, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={qtyBtn}>{Icons.plus(14)}</button>
              </div>
              <div style={{ flex: 1 }}>
                <Button
                  variant="primary" size="lg" full
                  disabled={!inStock}
                  onClick={() => { for (let i = 0; i < qty; i++) cart.add(p.id); }}
                >
                  {inStock ? `Add to cart — $${p.price * qty}` : 'Sold out'}
                </Button>
              </div>
            </div>
            {!inStock && (
              <div style={{ marginTop: 10 }}>
                <Button variant="ghost" full>Email me when restocked</Button>
              </div>
            )}

            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
              <Promise icon={Icons.truck(20)} title="Free over $80" sub="To US & Canada"/>
              <Promise icon={Icons.return(20)} title="30-day returns" sub="No questions"/>
              <Promise icon={Icons.shield(20)} title="Lifetime warranty" sub="If we sold it"/>
            </div>

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
              <Eyebrow label="Specifications"/>
              <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 24px' }}>
                {p.specs.map((s, i) => (
                  <span key={i} style={{ display: 'contents' }}>
                    <dt style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.04em', textTransform: 'uppercase', alignSelf: 'baseline' }}>
                      {specLabels[i] ?? 'spec'}
                    </dt>
                    <dd style={{ margin: 0, fontSize: 14, color: 'var(--ink)' }}>{s}</dd>
                  </span>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE CARRY IT */}
      <section style={{ background: 'var(--bone)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: '80px 40px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <Eyebrow num="—" label="Why we carry it"/>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
            We tested nineteen versions of this. <span style={{ fontStyle: 'italic' }}>Most flattened by month three.</span> This one didn't. It has the same density at month nine as it did out of the box, and the cover is the only one that doesn't pill after a hot wash.
          </p>
          <p style={{ marginTop: 22, fontSize: 14, color: 'var(--ink-3)' }}>— The KRAUNO buying team</p>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section style={{ padding: '80px 40px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 32, letterSpacing: '-0.02em' }}>
                Also in <span style={{ fontStyle: 'italic' }}>{p.pillar}</span>
              </h3>
              <Link href={`/collection/${p.pillar}`} style={{ fontSize: 14, borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>
                Shop {p.pillar.toLowerCase()} →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map(r => <ProductCard key={r.id} p={r}/>)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
