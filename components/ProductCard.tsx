'use client';

import Link from 'next/link';
import { Product } from '@/lib/data';
import { ProductImg } from './ProductImg';

interface ProductCardProps {
  p: Product;
}

export function ProductCard({ p }: ProductCardProps) {
  return (
    <Link href={`/product/${p.id}`} style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}>
      <div style={{ position: 'relative' }}>
        <ProductImg shape={p.shape} bg={p.bg} ratio="4/5"/>
        {p.tag && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '4px 8px',
            background: p.tag.startsWith('−') ? 'var(--clay)' : 'var(--ink)',
            color: 'var(--paper)', borderRadius: 2,
          }}>
            {p.tag}
          </span>
        )}
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)', lineHeight: 1.2 }}>{p.name}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{p.blurb}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 }}>
          <span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink)' }}>${p.price}</span>
            {p.was && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', marginLeft: 8, textDecoration: 'line-through' }}>
                ${p.was}
              </span>
            )}
          </span>
          <span className="eyebrow" style={{ color: 'var(--ink-3)', fontSize: 10 }}>{p.pillar}</span>
        </div>
      </div>
    </Link>
  );
}
