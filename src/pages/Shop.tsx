import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Bag, Check, CheckCircle, Coffee, CreditCard, Crown,
  Minus, Plus, ShieldCheck, Star, Trash, Truck,
} from "@phosphor-icons/react";
import { CATEGORIES, PRODUCTS, formatMoney, productById } from "@/data";
import { useApp, linePrice } from "@/store";
import { GoldButton, PageHero, Reveal, SectionHeading } from "@/components/Layout";
import { ProductCard } from "@/pages/Home";
import { cn } from "@/lib/utils";

/* ============ MENU ============ */
export function Menu() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = ["All", ...CATEGORIES];
  const list = useMemo(
    () =>
      PRODUCTS.filter((p) => (cat === "All" || p.category === cat) &&
        (p.name.toLowerCase().includes(q.toLowerCase()) || p.notes.join(" ").toLowerCase().includes(q.toLowerCase()))),
    [cat, q],
  );

  return (
    <>
      <PageHero crumb="Menu" title="The full menu" sub="Every pour, pastry and bag of beans we're proud to serve." />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  cat === c ? "bg-espresso text-cream shadow-lg" : "bg-secondary text-espresso hover:bg-secondary/70",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search drinks…"
            className="w-full rounded-full border border-border bg-card px-5 py-2.5 text-sm focus:border-caramel focus:outline-none md:w-64"
          />
        </div>

        {list.length === 0 ? (
          <div className="mt-20 text-center text-muted-foreground">No matches — try another search.</div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i % 8} />)}
          </div>
        )}
      </section>
    </>
  );
}

/* ============ PRODUCT DETAILS ============ */
const SIZES = [
  { id: "S", label: "Small 8oz" },
  { id: "M", label: "Medium 12oz" },
  { id: "L", label: "Large 16oz" },
];
const MILKS = ["Dairy", "Oat", "Almond", "Soy", "None"];

export function ProductDetails() {
  const { id } = useParams();
  const p = productById(id || "");
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const navigate = useNavigate();
  const [size, setSize] = useState("M");
  const [milk, setMilk] = useState("Dairy");
  const [qty, setQty] = useState(1);

  if (!p) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl text-espresso">Product not found</h1>
        <div className="mt-6"><GoldButton as="link" to="/menu">Back to menu</GoldButton></div>
      </div>
    );
  }
  const fav = isFavorite(p.id);
  const price = linePrice(p, size);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-espresso">
          <ArrowLeft size={16} /> Back to menu
        </Link>
        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
              {p.badge && <span className="absolute left-5 top-5 rounded-full bg-espresso/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold">{p.badge}</span>}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-caramel">{p.category}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Star size={15} weight="fill" className="text-gold" /> {p.rating} · {p.reviews} reviews</span>
            </div>
            <h1 className="mt-3 font-display text-4xl text-espresso sm:text-5xl">{p.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{p.origin} · {p.roast} roast</p>
            <p className="mt-5 leading-relaxed text-espresso/80">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.notes.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 rounded-full border hairline px-3 py-1 text-xs font-medium text-espresso">
                  <Coffee size={13} className="text-caramel" /> {n}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-espresso">Size</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SIZES.map((s) => (
                  <button key={s.id} onClick={() => setSize(s.id)} className={cn("rounded-xl border px-3 py-3 text-center transition-all", size === s.id ? "border-caramel bg-caramel/10" : "border-border hover:border-caramel/50")}>
                    <span className="block text-sm font-semibold text-espresso">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{formatMoney(linePrice(p, s.id))}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-espresso">Milk</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {MILKS.map((m) => (
                  <button key={m} onClick={() => setMilk(m)} className={cn("rounded-full border px-4 py-2 text-sm font-medium transition-all", milk === m ? "border-espresso bg-espresso text-cream" : "border-border text-espresso hover:border-caramel")}>{m}</button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-border p-1.5">
                <button onClick={() => setQty((v) => Math.max(1, v - 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-espresso"><Minus size={16} /></button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((v) => v + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-espresso"><Plus size={16} /></button>
              </div>
              <span className="font-display text-3xl text-espresso">{formatMoney(price * qty)}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <GoldButton onClick={() => { addToCart(p, size, milk, qty); toast.success(`${p.name} added to cart`); }} className="flex-1">
                Add to cart · {formatMoney(price * qty)} <ArrowRight size={16} />
              </GoldButton>
              <button onClick={() => { addToCart(p, size, milk, qty); navigate("/checkout"); }} className="rounded-full border border-espresso px-6 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-espresso hover:text-cream">Buy now</button>
              <button onClick={() => toggleFavorite(p.id)} className={cn("flex h-[52px] w-[52px] items-center justify-center rounded-full border transition-colors", fav ? "border-caramel bg-caramel text-cream" : "border-border text-espresso hover:border-caramel")}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Truck size={18} className="text-caramel" /> Ready in ~8 min</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={18} className="text-caramel" /> Freshness guaranteed</span>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <SectionHeading eyebrow="You may also like" title="Pairs well with" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => <ProductCard key={r.id} p={r} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
}

/* ============ CART ============ */
function CartLine({ line }: { line: ReturnType<typeof useApp>["cart"][number] }) {
  const { updateQty, removeItem } = useApp();
  const p = productById(line.productId);
  if (!p) return null;
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-4">
      <Link to={`/product/${p.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg text-espresso">{p.name}</h3>
            <p className="text-xs text-muted-foreground">{line.size} · {line.milk}</p>
          </div>
          <button onClick={() => removeItem(line.lineId)} className="text-muted-foreground transition-colors hover:text-destructive"><Trash size={18} /></button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 rounded-full border border-border p-1">
            <button onClick={() => updateQty(line.lineId, -1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"><Minus size={14} /></button>
            <span className="w-5 text-center text-sm font-semibold">{line.qty}</span>
            <button onClick={() => updateQty(line.lineId, 1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary"><Plus size={14} /></button>
          </div>
          <span className="font-semibold text-espresso">{formatMoney(line.price * line.qty)}</span>
        </div>
      </div>
    </div>
  );
}

export function Cart() {
  const { cart, cartSubtotal, clearCart } = useApp();
  if (cart.length === 0) {
    return (
      <>
        <PageHero crumb="Cart" title="Your cart" />
        <div className="mx-auto max-w-xl px-5 py-20 text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-caramel"><Bag size={36} weight="duotone" /></span>
          <h2 className="mt-6 font-display text-2xl text-espresso">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add a few beautiful things to get started.</p>
          <div className="mt-8"><GoldButton as="link" to="/menu">Browse the menu <ArrowRight size={16} /></GoldButton></div>
        </div>
      </>
    );
  }
  const delivery = cartSubtotal >= 25 ? 0 : 3.5;
  return (
    <>
      <PageHero crumb="Cart" title="Your cart" />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <AnimatePresence>{cart.map((l) => <CartLine key={l.lineId} line={l} />)}</AnimatePresence>
          <button onClick={clearCart} className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-destructive hover:underline">Clear cart</button>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Summary subtotal={cartSubtotal} delivery={delivery} />
          <GoldButton as="link" to="/checkout" className="mt-4 w-full">Proceed to checkout <ArrowRight size={16} /></GoldButton>
        </div>
      </section>
    </>
  );
}

function Summary({ subtotal, delivery }: { subtotal: number; delivery: number }) {
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + delivery + tax) * 100) / 100;
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-xl text-espresso">Order summary</h3>
      <dl className="mt-5 space-y-3 text-sm">
        <Row label="Subtotal" value={formatMoney(subtotal)} />
        <Row label="Delivery" value={delivery === 0 ? "Free" : formatMoney(delivery)} />
        <Row label="Tax (8%)" value={formatMoney(tax)} />
        <div className="my-3 h-px bg-border" />
        <div className="flex items-center justify-between"><dt className="font-display text-lg text-espresso">Total</dt><dd className="font-display text-2xl text-espresso">{formatMoney(total)}</dd></div>
      </dl>
      {delivery > 0 && <p className="mt-4 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-espresso">Add {formatMoney(25 - subtotal)} more for free delivery.</p>}
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium text-espresso">{value}</dd></div>;
}

/* ============ CHECKOUT ============ */
export function Checkout() {
  const { cart, cartSubtotal, placeOrder, user } = useApp();
  const navigate = useNavigate();
  const [fulfillment, setFulfillment] = useState<"Pickup" | "Delivery">("Pickup");
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "", phone: "", address: "",
    card: "", exp: "", cvc: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl text-espresso">Nothing to check out</h1>
        <div className="mt-6"><GoldButton as="link" to="/menu">Browse menu</GoldButton></div>
      </div>
    );
  }
  const delivery = fulfillment === "Delivery" ? (cartSubtotal >= 25 ? 0 : 3.5) : 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please add your name and email"); return; }
    const order = placeOrder(fulfillment);
    toast.success("Order placed — thank you!");
    navigate("/confirmation", { state: { orderId: order.id } });
  };

  return (
    <>
      <PageHero crumb="Checkout" title="Checkout" />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.6fr_1fr]">
        <form onSubmit={submit} className="space-y-8">
          <div>
            <p className="mb-3 text-sm font-semibold text-espresso">How would you like it?</p>
            <div className="grid grid-cols-2 gap-3">
              {(["Pickup", "Delivery"] as const).map((f) => (
                <button type="button" key={f} onClick={() => setFulfillment(f)} className={cn("flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-semibold transition-all", fulfillment === f ? "border-caramel bg-caramel/10 text-espresso" : "border-border text-muted-foreground")}>
                  {f === "Pickup" ? <Coffee size={18} /> : <Truck size={18} />} {f}
                </button>
              ))}
            </div>
          </div>

          <Fieldset title="Contact">
            <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Jordan Rivera" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" type="email" />
              <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="(503) 555-0100" />
            </div>
            {fulfillment === "Delivery" && <Field label="Delivery address" value={form.address} onChange={(v) => set("address", v)} placeholder="123 Rose St, Portland, OR" />}
          </Fieldset>

          <Fieldset title="Payment">
            <div className="flex items-center gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-sm text-espresso">
              <ShieldCheck size={18} className="text-caramel" /> Demo checkout — no real card is charged.
            </div>
            <Field label="Card number" value={form.card} onChange={(v) => set("card", v)} placeholder="4242 4242 4242 4242" icon={<CreditCard size={18} />} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" value={form.exp} onChange={(v) => set("exp", v)} placeholder="MM / YY" />
              <Field label="CVC" value={form.cvc} onChange={(v) => set("cvc", v)} placeholder="123" />
            </div>
          </Fieldset>

          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-gold to-caramel px-7 py-4 font-semibold text-espresso shadow-lg transition-transform hover:scale-[1.01] active:scale-95">
            Place order · {formatMoney(cartSubtotal + delivery + Math.round(cartSubtotal * 0.08 * 100) / 100)}
          </button>
        </form>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg text-espresso">{cart.length} item{cart.length > 1 ? "s" : ""}</h3>
            <ul className="mt-4 space-y-3">
              {cart.map((l) => { const p = productById(l.productId); return (
                <li key={l.lineId} className="flex items-center gap-3 text-sm">
                  <img src={p?.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex-1 text-espresso">{p?.name} <span className="text-muted-foreground">×{l.qty}</span></span>
                  <span className="font-medium">{formatMoney(l.price * l.qty)}</span>
                </li>
              ); })}
            </ul>
          </div>
          <div className="mt-4"><Summary subtotal={cartSubtotal} delivery={delivery} /></div>
        </div>
      </section>
    </>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-5 font-display text-lg text-espresso">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, value, onChange, placeholder, type = "text", icon }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-espresso">{label}</span>
      <span className="relative block">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cn("w-full rounded-xl border border-border bg-cream/40 py-3 text-sm text-espresso placeholder:text-muted-foreground/60 focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20", icon ? "pl-11 pr-4" : "px-4")} />
      </span>
    </label>
  );
}

/* ============ ORDER CONFIRMATION ============ */
export function OrderConfirmation() {
  const { orders } = useApp();
  const order = orders[0];
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-3xl text-espresso">No recent order</h1>
        <div className="mt-6"><GoldButton as="link" to="/menu">Order now</GoldButton></div>
      </div>
    );
  }
  return (
    <section className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
      <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-caramel text-espresso">
        <CheckCircle size={54} weight="fill" />
      </motion.div>
      <h1 className="mt-8 font-display text-4xl text-espresso">Order confirmed!</h1>
      <p className="mt-3 text-muted-foreground">Thank you — your coffee is being crafted with care.</p>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Order number</p><p className="font-display text-xl text-espresso">{order.id}</p></div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-espresso">{order.fulfillment}</span>
        </div>
        <ul className="space-y-3 py-4">
          {order.items.map((it, i) => (
            <li key={i} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-espresso"><Check size={16} className="text-caramel" /> {it.name} <span className="text-muted-foreground">· {it.size} · {it.milk} ×{it.qty}</span></span>
              <span className="font-medium">{formatMoney(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="font-display text-lg text-espresso">Total</span>
          <span className="font-display text-2xl text-espresso">{formatMoney(order.total)}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-sm text-espresso">
          <CrownBadge /> You earned <strong>{order.points} reward points</strong> on this order.
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <GoldButton as="link" to="/orders">View my orders</GoldButton>
        <Link to="/menu" className="inline-flex items-center gap-2 rounded-full border border-espresso px-6 py-3.5 text-sm font-semibold text-espresso hover:bg-espresso hover:text-cream">Order again</Link>
      </div>
    </section>
  );
}
function CrownBadge() {
  return <Crown size={18} weight="fill" className="text-gold" />;
}