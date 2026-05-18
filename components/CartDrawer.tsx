'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart';
import { PRODUCTS } from '@/lib/data';
import { ProductImg } from './ProductImg';
import { Button } from './Atoms';
import { Icons } from './Icons';

const qtyBtn: React.CSSProperties = {
  background: 'transparent', border: 'none', padding: '6px 10px',
  cursor: 'pointer', color: 'var(--ink)', display: 'inline-flex',
};

const FREE_THRESHOLD = 80;

export function CartDrawer() {
  const cart = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') cart.setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cart]);

  if (!cart.open) return null;

  const progress = Math.min(1, cart.subtotal / FREE_THRESHOLD);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      <div
        onClick={() => cart.setOpen(false)}
        style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,20,0.5)', animation: 'fadeOverlay 200ms var(--ease) both' }}
      />
      <aside style={{
        position: 'absolute', top: 0, right: 0, height: '100%', width: 460,
        background: 'var(--paper)', display: 'flex', flexDirection: 'column',
        boxShadow: '0 16px 48px -24px rgba(26,24,20,0.4)',
        animation: 'slideIn 320ms var(--ease-out) both',
      }}>
        <header style={{ padding: '22px 28px', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
            Cart <span style={{ color: 'var(--ink-3)', fontSize: 18 }}>({cart.count})</span>
          </div>
          <button onClick={() => cart.setOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}>
            {Icons.close(20)}
          </button>
        </header>

        {cart.subtotal < FREE_THRESHOLD && (
          <div style={{ padding: '14px 28px', borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>${FREE_THRESHOLD - cart.subtotal}</span> away from free shipping.
            </div>
            <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--clay)', transition: 'width 320ms var(--ease-out)' }}/>
            </div>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px' }}>
          {cart.items.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)' }}>Nothing here yet.</div>
              <div style={{ marginTop: 8, fontSize: 14 }}>Start with the Work edit.</div>
            </div>
          )}
          {cart.items.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            if (!p) return null;
            return (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ width: 80 }}><ProductImg shape={p.shape} bg={p.bg} ratio="1/1"/></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--ink)' }}>{p.name}</div>
                    <div className="eyebrow" style={{ marginTop: 2, fontSize: 10, color: 'var(--ink-3)' }}>{p.pillar}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'inline-flex', border: '1px solid var(--hairline)', borderRadius: 2 }}>
                      <button onClick={() => cart.setQty(item.id, item.qty - 1)} style={qtyBtn}>{Icons.minus(14)}</button>
                      <span style={{ padding: '0 10px', display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, minWidth: 22, justifyContent: 'center' }}>{item.qty}</span>
                      <button onClick={() => cart.setQty(item.id, item.qty + 1)} style={qtyBtn}>{Icons.plus(14)}</button>
                    </div>
                    <button onClick={() => cart.remove(item.id)} style={{ background: 'transparent', border: 'none', fontSize: 12, color: 'var(--ink-3)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                      Remove
                    </button>
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink)' }}>${p.price * item.qty}</div>
              </div>
            );
          })}
        </div>

        {cart.items.length > 0 && (
          <footer style={{ padding: '24px 28px 28px', borderTop: '1px solid var(--hairline)', background: 'var(--bone)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--ink)' }}>${cart.subtotal}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Tax and shipping calculated at checkout.</div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" size="lg" full>Checkout</Button>
              <Button variant="text" full onClick={() => cart.setOpen(false)}>Continue shopping</Button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
