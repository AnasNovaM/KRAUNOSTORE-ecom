import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Eyebrow } from '@/components/Atoms';
import { Icons } from '@/components/Icons';

function PillarIcon({ kind }: { kind: string }) {
  const props = { width: 32, height: 32, viewBox: '0 0 48 48' as const, fill: 'none', stroke: '#1A1814', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (kind === 'work') return (
    <svg {...props}>
      <rect x="8" y="12" width="32" height="20" rx="1"/>
      <line x1="20" y1="32" x2="20" y2="38"/>
      <line x1="28" y1="32" x2="28" y2="38"/>
      <line x1="14" y1="38" x2="34" y2="38"/>
    </svg>
  );
  if (kind === 'recover') return (
    <svg {...props}>
      <circle cx="24" cy="24" r="6"/>
      <path d="M24 10 V14"/><path d="M24 34 V38"/>
      <path d="M10 24 H14"/><path d="M34 24 H38"/>
      <path d="M14 14 L17 17"/><path d="M31 31 L34 34"/>
      <path d="M34 14 L31 17"/><path d="M17 31 L14 34"/>
    </svg>
  );
  return (
    <svg {...props}>
      <path d="M32 28 A14 14 0 1 1 20 14 A11 11 0 0 0 32 28 Z"/>
    </svg>
  );
}

const FEATURED_IDS = ['lp-04', 'mg-07', 'sm-11', 'sc-02', 'wb-13', 'ad-15'];

export default function Home() {
  const featuredProducts = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as typeof PRODUCTS;

  const pillars = [
    { id: 'Work',    bg: '#DED7C8', desc: 'Eliminate the physical friction that costs you focus and hours.', ico: 'work' },
    { id: 'Recover', bg: '#C8D0BF', desc: 'Tools to undo what long hours and accumulated stress quietly do.', ico: 'recover' },
    { id: 'Rest',    bg: '#B8B5AB', desc: 'The foundation everything else is built on. Sleep is not optional.', ico: 'rest' },
  ] as const;

  return (
    <main>
      {/* HERO */}
      <section style={{ padding: '96px 40px 64px', borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>Issue 04 &nbsp;·&nbsp; The Work Edit</div>
            <h1 style={{ marginTop: 22, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 80, lineHeight: 0.98, letterSpacing: '-0.025em', color: 'var(--ink)' }}>
              Your body keeps score <span style={{ fontStyle: 'italic' }}>of every hour.</span>
            </h1>
            <p style={{ marginTop: 28, maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)' }}>
              You spend a third of your life at your desk. Another third in bed. KRAUNO carries the small set of things that give something back to a body that's quietly being eroded by both.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
              <Link href="/collection/Work" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15, padding: '16px 28px', background: '#1A1814', color: '#F4EFE6', borderRadius: 4, border: '1px solid #1A1814', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Shop the Edit
              </Link>
              <Link href="/" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15, padding: '16px 28px', background: 'transparent', color: '#1A1814', borderRadius: 4, border: '1px solid #1A1814', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Read the story
              </Link>
            </div>
          </div>
          <div style={{ background: 'var(--paper-2)', aspectRatio: '5/6', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 500 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="hwall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E8DFCF"/>
                  <stop offset="1" stopColor="#CDBFA6"/>
                </linearGradient>
              </defs>
              <rect width="500" height="600" fill="url(#hwall)"/>
              <rect x="60" y="80" width="180" height="240" fill="#FBF8F2" opacity="0.55"/>
              <rect y="420" width="500" height="180" fill="#9F8E72"/>
              <rect x="80" y="380" width="380" height="14" fill="#3A362F"/>
              <rect x="98" y="394" width="6" height="120" fill="#3A362F"/>
              <rect x="450" y="394" width="6" height="120" fill="#3A362F"/>
              <rect x="200" y="240" width="200" height="140" fill="#1A1814"/>
              <rect x="208" y="248" width="184" height="124" fill="#3A362F"/>
              <rect x="288" y="380" width="14" height="18" fill="#1A1814"/>
              <rect x="160" y="340" width="60" height="120" rx="6" fill="#3A362F"/>
              <ellipse cx="440" cy="270" rx="32" ry="36" fill="#6E7B68"/>
              <rect x="425" y="290" width="30" height="60" fill="#4E5A48"/>
            </svg>
            <div style={{ position: 'absolute', bottom: 18, left: 18, color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Photographed in Toronto
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ padding: '80px 40px', borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Eyebrow num="01" label="Three pillars" rule/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {pillars.map(p => (
              <Link
                key={p.id}
                href={`/collection/${p.id}`}
                style={{ background: p.bg, padding: '40px 32px', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, textDecoration: 'none' }}
              >
                <PillarIcon kind={p.ico}/>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>{p.id}.</div>
                  <p style={{ marginTop: 18, maxWidth: '28ch', color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.5 }}>{p.desc}</p>
                  <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
                    <span>Shop the edit</span>{Icons.right(14)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE EDIT */}
      <section style={{ padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
            <div>
              <Eyebrow num="02" label="The October Edit"/>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 48, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                Six things, <span style={{ fontStyle: 'italic' }}>chosen carefully.</span>
              </h2>
            </div>
            <Link href="/collection/Work" style={{ fontSize: 14, color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>
              Shop all 47 →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {featuredProducts.map(p => <ProductCard key={p.id} p={p}/>)}
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div className="eyebrow" style={{ color: 'var(--clay-soft)' }}>From the brief</div>
          <blockquote style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            "We don't carry everything. <span style={{ fontStyle: 'italic', color: 'var(--clay-soft)' }}>We carry what works.</span>"
          </blockquote>
          <p style={{ marginTop: 36, color: '#B8B5AB', fontSize: 16, lineHeight: 1.65, maxWidth: 640 }}>
            Every product on KRAUNO answers a single question: does this give something back to the person spending their hours wisely? If the answer is yes, it belongs here. If not, we keep looking.
          </p>
        </div>
      </section>
    </main>
  );
}
