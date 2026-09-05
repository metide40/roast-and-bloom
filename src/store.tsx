import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data";

export type CartItem = {
  lineId: string;
  productId: string;
  size: string;
  milk: string;
  qty: number;
  price: number;
};

export type OrderItem = {
  name: string;
  size: string;
  milk: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  points: number;
  status: "Preparing" | "Ready" | "Delivered";
  fulfillment: "Pickup" | "Delivery";
};

export type User = { name: string; email: string };

const SIZE_MULT: Record<string, number> = { S: 0.85, M: 1, L: 1.15 };

export const linePrice = (p: Product, size: string) =>
  Math.round(p.price * (SIZE_MULT[size] ?? 1) * 100) / 100;

type Store = {
  user: User | null;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (p: Product, size: string, milk: string, qty?: number) => void;
  updateQty: (lineId: string, delta: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  orders: Order[];
  placeOrder: (fulfillment: "Pickup" | "Delivery") => Order;
  points: number;
};

const Ctx = createContext<Store | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load("rb_user", null));
  const [cart, setCart] = useState<CartItem[]>(() => load("rb_cart", []));
  const [favorites, setFavorites] = useState<string[]>(() => load("rb_favs", []));
  const [orders, setOrders] = useState<Order[]>(() => load("rb_orders", []));

  useEffect(() => { localStorage.setItem("rb_user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("rb_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("rb_favs", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("rb_orders", JSON.stringify(orders)); }, [orders]);

  const value = useMemo<Store>(() => {
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartSubtotal = Math.round(cart.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;
    const points = orders.reduce((s, o) => s + o.points, 0);

    return {
      user,
      login: (email, name) => setUser({ email, name: name || email.split("@")[0] || "Coffee Lover" }),
      signup: (name, email) => setUser({ name, email }),
      logout: () => setUser(null),
      cart,
      addToCart: (p, size, milk, qty = 1) =>
        setCart((prev) => {
          const price = linePrice(p, size);
          const idx = prev.findIndex((i) => i.productId === p.id && i.size === size && i.milk === milk);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
            return copy;
          }
          return [...prev, { lineId: `${p.id}-${size}-${milk}-${Date.now()}`, productId: p.id, size, milk, qty, price }];
        }),
      updateQty: (lineId, delta) =>
        setCart((prev) =>
          prev.map((i) => (i.lineId === lineId ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
        ),
      removeItem: (lineId) => setCart((prev) => prev.filter((i) => i.lineId !== lineId)),
      clearCart: () => setCart([]),
      cartCount,
      cartSubtotal,
      favorites,
      toggleFavorite: (id) =>
        setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
      isFavorite: (id) => favorites.includes(id),
      orders,
      placeOrder: (fulfillment) => {
        const items: OrderItem[] = cart.map((i) => {
          const p = PRODUCTS.find((x) => x.id === i.productId)!;
          return { name: p.name, size: i.size, milk: i.milk, qty: i.qty, price: i.price };
        });
        const total = cartSubtotal;
        const order: Order = {
          id: "RB-" + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toISOString(),
          items,
          total,
          points: Math.round(total),
          status: "Preparing",
          fulfillment,
        };
        setOrders((prev) => [order, ...prev]);
        setCart([]);
        return order;
      },
      points,
    };
  }, [user, cart, favorites, orders]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
