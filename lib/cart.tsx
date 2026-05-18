'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PRODUCTS } from './data';

interface CartItem {
  id: string;
  qty: number;
}

interface CartCtxValue {
  items: CartItem[];
  open: boolean;
  count: number;
  subtotal: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setOpen: (open: boolean) => void;
}

const CartCtx = createContext<CartCtxValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { id: 'lp-04', qty: 1 },
    { id: 'sm-11', qty: 1 },
  ]);
  const [open, setOpen] = useState(false);

  const add = (id: string) => {
    setItems(prev => {
      const found = prev.find(i => i.id === id);
      return found
        ? prev.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems(prev =>
      qty <= 0
        ? prev.filter(i => i.id !== id)
        : prev.map(i => (i.id === id ? { ...i, qty } : i))
    );

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce(
    (s, i) => s + i.qty * (PRODUCTS.find(p => p.id === i.id)?.price ?? 0),
    0
  );

  return (
    <CartCtx.Provider value={{ items, open, count, subtotal, add, remove, setQty, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
