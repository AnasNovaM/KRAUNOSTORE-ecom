'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS, Pillar } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Eyebrow } from '@/components/Atoms';

type PriceFilter = 'any' | 'under-100' | '100-200' | 'over-200';

const pillarBg: Record<string, string> = {
  Work:    '#DED7C8',
  Recover: '#C8D0BF',
  Rest:    '#B8B5AB',
};

const intros: Record<string, { line: string; sub: string }> = {
  Work:    { line: 'Eliminate the friction.',  sub: 'Your desk should support you as hard as you work.' },
  Recover: { line: 'Help the body forget.',    sub: 'Tools to undo what long hours and accumulated stress quietly do.' },
  Rest:    { line: 'The foundation.',          sub: 'Everything you do during the day is built on how well you rested.' },
};

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: 18, marginBottom: 18, borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </div>
  );
}

function FilterRadio({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: 0, fontSize: 13, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>
      <span style={{ width: 14, height: 14, borderRadius: 999, border: '1px solid var(--ink)', background: on ? 'var(--ink)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {on && <span style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--paper)' }}/>}
      </span>
      {label}
    </button>
  );
}

function FilterCheck({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: 0, fontSize: 13, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>
      <span style={{ width: 14, height: 14, border: '1px solid var(--ink)', background: on ? 'var(--ink)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, flexShrink: 0 }}>
        {on && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F4EFE6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

export default function CollectionPage() {
  const params = useParams();
  const pillar = (params.pillar as string) || 'Work';
  const [sort, setSort] = useState('Featured');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('any');
  const [inStockOnly, setInStockOnly] = useState(false);

  const list = useMemo(() => {
    let l = PRODUCTS.filter(p => p.pillar === pillar);
    if (inStockOnly) l = l.filter(p => p.stock !== 'sold');
    if (priceFilter === 'under-100') l = l.filter(p => p.price < 100);
    if (priceFilter === '100-200')   l = l.filter(p => p.price >= 100 && p.price < 200);
    if (priceFilter === 'over-200')  l = l.filter(p => p.price >= 200);
    if (sort === 'Price ↑') l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 'Price ↓') l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [pillar, sort, priceFilter, inStockOnly]);

  const intro = intros[pillar] ?? intros.Work;
  const bg = pillarBg[pillar] ?? pillarBg.Work;

  return (
    <main>
      <section style={{ padding: '64px 40px 32px', background: bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Eyebrow label={`${pillar} edit`}/>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 72, letterSpacing: '-0.025em', lineHeight: 1.02, color: 'var(--ink)' }}>
            {intro.line}
          </h1>
          <p style={{ marginTop: 18, maxWidth: 480, fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55 }}>{intro.sub}</p>
        </div>
      </section>

      <section style={{ padding: '40px 40px 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48 }}>
          <aside>
            <div className="eyebrow" style={{ color: 'var(--ink-3)', marginBottom: 18 }}>Filter</div>
            <FilterGroup title="Price">
              {([['any', 'Any price'], ['under-100', 'Under $100'], ['100-200', '$100 – $200'], ['over-200', 'Over $200']] as [PriceFilter, string][]).map(([k, l]) => (
                <FilterRadio key={k} on={priceFilter === k} label={l} onClick={() => setPriceFilter(k)}/>
              ))}
            </FilterGroup>
            <FilterGroup title="Availability">
              <FilterCheck on={inStockOnly} label="In stock only" onClick={() => setInStockOnly(v => !v)}/>
            </FilterGroup>
            <FilterGroup title="Category">
              {['Cushions', 'Lighting', 'Input', 'Display', 'Eyewear'].map(t => (
                <FilterCheck key={t} on={false} label={t} onClick={() => {}}/>
              ))}
            </FilterGroup>
          </aside>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, paddingBottom: 12, borderBottom: '1px solid var(--hairline)' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>{list.length}</span> products
              </span>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-3)' }}>
                Sort
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink)', background: 'var(--bone)', border: '1px solid var(--hairline)', borderRadius: 2, padding: '6px 28px 6px 10px', appearance: 'none', cursor: 'pointer' }}
                >
                  <option>Featured</option>
                  <option>Price ↑</option>
                  <option>Price ↓</option>
                </select>
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
              {list.map(p => <ProductCard key={p.id} p={p}/>)}
            </div>
            {list.length === 0 && (
              <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ink)' }}>Nothing matches.</div>
                <p style={{ marginTop: 8 }}>Try fewer filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
