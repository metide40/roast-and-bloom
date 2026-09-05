import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight, Bag, CheckCircle, Coffee, Crown, EnvelopeSimple, Eye,
  EyeSlash, Gift, HandCoins, Lock, MapPin, Medal, Password, Phone,
  Receipt, ShieldCheck, SignOut, Storefront, Truck, UserPlus,
} from "@phosphor-icons/react";
import { IMG, LOCATIONS, PRODUCTS, formatMoney } from "@/data";
import { useApp } from "@/store";
import { GoldButton, PageHero, Reveal, SectionHeading } from "@/components/Layout";
import { ProductCard } from "@/pages/Home";
import { cn } from "@/lib/utils";

/* ---------- shared auth shell ---------- */
function AuthShell({ title, sub, children, footer }: { title: string; sub: string; children: ReactNode; footer: ReactNode }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-0 px-5 py-12 sm:px-8 lg:grid-cols-2">
      <Reveal className="hidden lg:block">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={IMG.latte} alt="" className="aspect-[4/5] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-cream">
            <Coffee size={30} weight="fill" className="text-gold" />
            <p className="mt-4 font-display text-2xl leading-snug">"Great coffee is a ritual worth logging in for."</p>
            <p className="mt-3 text-sm text-cream/70">Members earn points, unlock single origins and skip the queue.</p>
          </div>
        </div>
      </Reveal>
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-display text-3xl text-espresso sm:text-4xl">{title}</h1>
        <p className="mt-2 text-muted-foreground">{sub}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
      </div>
    </section>
  );
}

function TextField({ label, type = "text", icon, value, onChange, placeholder }: { label: string; type?: string; icon?: ReactNode; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  const t = isPw ? (show ? "text" : "password") : type;
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-espresso">{label}</span>
      <span className="relative block">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input type={t} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cn("w-full rounded-xl border border-border bg-card py-3 text-sm text-espresso placeholder:text-muted-foreground/60 focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20", isPw ? "pr-11 pl-11" : icon ? "pl-11 pr-4" : "px-4")} />
        {isPw && <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">{show ? <EyeSlash size={18} /> : <Eye size={18} />}</button>}
      </span>
    </label>
  );
}

function useAuthForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return { email, setEmail, pw, setPw };
}

export function Login() {
  const { login } = useApp();
  const nav = useNavigate();
  const f = useAuthForm();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.email) { toast.error("Enter your email"); return; }
    login(f.email);
    toast.success("Welcome back!");
    nav("/profile");
  };
  return (
    <AuthShell title="Welcome back" sub="Sign in to your Roast & Bloom account." footer={<>New here? <Link to="/signup" className="font-semibold text-caramel">Create an account</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <TextField label="Email" type="email" icon={<EnvelopeSimple size={18} />} value={f.email} onChange={f.setEmail} placeholder="you@email.com" />
        <TextField label="Password" type="password" icon={<Lock size={18} />} value={f.pw} onChange={f.setPw} placeholder="••••••••" />
        <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-medium text-caramel">Forgot password?</Link></div>
        <button className="w-full rounded-full bg-gradient-to-r from-gold to-caramel px-7 py-3.5 font-semibold text-espresso shadow-lg transition-transform hover:scale-[1.01] active:scale-95">Sign in</button>
      </form>
    </AuthShell>
  );
}

export function SignUp() {
  const { signup } = useApp();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const f = useAuthForm();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !f.email) { toast.error("Add your name and email"); return; }
    signup(name, f.email);
    toast.success("Account created — welcome to the club!");
    nav("/profile");
  };
  return (
    <AuthShell title="Create your account" sub="Join Bloom Rewards and start earning with every cup." footer={<>Already a member? <Link to="/login" className="font-semibold text-caramel">Sign in</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <TextField label="Full name" icon={<UserPlus size={18} />} value={name} onChange={setName} placeholder="Jordan Rivera" />
        <TextField label="Email" type="email" icon={<EnvelopeSimple size={18} />} value={f.email} onChange={f.setEmail} placeholder="you@email.com" />
        <TextField label="Password" type="password" icon={<Password size={18} />} value={f.pw} onChange={f.setPw} placeholder="At least 6 characters" />
        <button className="w-full rounded-full bg-gradient-to-r from-gold to-caramel px-7 py-3.5 font-semibold text-espresso shadow-lg transition-transform hover:scale-[1.01] active:scale-95">Create account</button>
      </form>
    </AuthShell>
  );
}

export function ForgotPassword() {
  const f = useAuthForm();
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.email) { toast.error("Enter your email"); return; }
    setSent(true);
    toast.success("Reset link sent");
  };
  return (
    <AuthShell title="Reset password" sub="We'll email you a secure link to set a new password." footer={<><Link to="/login" className="font-semibold text-caramel">Back to sign in</Link></>}>
      {sent ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <CheckCircle size={44} weight="fill" className="mx-auto text-caramel" />
          <p className="mt-4 font-display text-xl text-espresso">Check your inbox</p>
          <p className="mt-2 text-sm text-muted-foreground">If an account exists for {f.email}, a reset link is on its way.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <TextField label="Email" type="email" icon={<EnvelopeSimple size={18} />} value={f.email} onChange={f.setEmail} placeholder="you@email.com" />
          <button className="w-full rounded-full bg-gradient-to-r from-gold to-caramel px-7 py-3.5 font-semibold text-espresso shadow-lg transition-transform hover:scale-[1.01] active:scale-95">Send reset link</button>
        </form>
      )}
    </AuthShell>
  );
}

/* ---------- account dashboard ---------- */
const ACCOUNT_NAV = [
  { to: "/profile", label: "Profile", icon: Coffee },
  { to: "/orders", label: "Orders", icon: Receipt },
  { to: "/favorites", label: "Favorites", icon: Crown },
  { to: "/loyalty", label: "Rewards", icon: Gift },
];

function AccountShell({ active, children }: { active: string; children: ReactNode }) {
  const { user, logout } = useApp();
  const nav = useNavigate();
  return (
    <>
      <PageHero crumb="Account" title={user ? `Hi, ${user.name.split(" ")[0]}` : "Your account"} />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-3">
            {ACCOUNT_NAV.map((n) => (
              <Link key={n.to} to={n.to} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors", active === n.to ? "bg-espresso text-cream" : "text-espresso hover:bg-secondary")}>
                <n.icon size={18} /> {n.label}
              </Link>
            ))}
            <button onClick={() => { logout(); nav("/"); }} className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10">
              <SignOut size={18} /> Sign out
            </button>
          </div>
        </aside>
        <div>{children}</div>
      </section>
    </>
  );
}

export function Profile() {
  const { user, orders } = useApp();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  return (
    <AccountShell active="/profile">
      <Reveal>
        <div className="rounded-2xl border border-border bg-card p-7">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-caramel font-display text-2xl text-espresso">{(user?.name || "G")[0]}</span>
            <div>
              <h2 className="font-display text-2xl text-espresso">{user?.name || "Guest"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email || "Not signed in"}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <TextField label="Full name" value={name} onChange={setName} />
            <TextField label="Email" type="email" value={email} onChange={setEmail} />
          </div>
          <div className="mt-6"><GoldButton onClick={() => toast.success("Profile saved")}>Save changes</GoldButton></div>
        </div>
      </Reveal>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[["Orders", orders.length], ["Lifetime points", useApp().points], ["Status", user ? "Member" : "Guest"]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl border border-border bg-card p-5 text-center">
            <p className="font-display text-2xl text-espresso">{v}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </AccountShell>
  );
}

export function Orders() {
  const { orders } = useApp();
  return (
    <AccountShell active="/orders">
      {orders.length === 0 ? (
        <EmptyState icon={<Bag size={30} />} title="No orders yet" text="When you place an order it will appear here." cta="Browse menu" to="/menu" />
      ) : (
        <div className="space-y-5">
          {orders.map((o) => (
            <Reveal key={o.id}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <p className="font-display text-lg text-espresso">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.date).toLocaleDateString(undefined, { dateStyle: "medium" })} · {o.fulfillment}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-espresso">{o.status}</span>
                    <span className="font-display text-lg text-espresso">{formatMoney(o.total)}</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-espresso">{it.name} <span className="text-muted-foreground">· {it.size} · {it.milk} ×{it.qty}</span></span>
                      <span className="font-medium">{formatMoney(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary/60 px-4 py-2.5 text-sm text-espresso"><Crown size={16} weight="fill" className="text-gold" /> Earned {o.points} points</div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </AccountShell>
  );
}

export function Favorites() {
  const { favorites } = useApp();
  const list = PRODUCTS.filter((p) => favorites.includes(p.id));
  return (
    <AccountShell active="/favorites">
      {list.length === 0 ? (
        <EmptyState icon={<Crown size={30} />} title="No favorites yet" text="Tap the heart on any item to save it here." cta="Explore menu" to="/menu" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      )}
    </AccountShell>
  );
}

export function Loyalty() {
  const { points, orders } = useApp();
  const tiers = [
    { name: "Sprout", min: 0, icon: Coffee, perk: "Free filter refill" },
    { name: "Bloom", min: 150, icon: Medal, perk: "Free drink monthly" },
    { name: "Gold", min: 400, icon: Crown, perk: "Members-only single origins" },
  ];
  const next = tiers.find((t) => points < t.min) || tiers[tiers.length - 1];
  const current = [...tiers].reverse().find((t) => points >= t.min) || tiers[0];
  const pct = Math.min(100, Math.round((points / next.min) * 100) || 100);
  return (
    <AccountShell active="/loyalty">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-espresso p-8 text-cream">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Bloom Rewards</p>
              <p className="mt-2 font-display text-5xl text-gold">{points}</p>
              <p className="text-sm text-cream/70">points available</p>
            </div>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold"><HandCoins size={34} weight="duotone" /></span>
          </div>
          <div className="relative mt-8">
            <div className="flex justify-between text-xs text-cream/60"><span>{current.name}</span><span>{next.name} · {next.min} pts</span></div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream/10">
              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-gold to-caramel" />
            </div>
            <p className="mt-3 text-sm text-cream/70">{points >= next.min ? "You've reached our top tier — enjoy!" : `Earn ${next.min - points} more points to unlock ${next.name}.`}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {tiers.map((t) => (
          <Reveal key={t.name}>
            <div className={cn("rounded-2xl border bg-card p-6", current.name === t.name ? "border-caramel" : "border-border")}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-caramel"><t.icon size={22} weight="duotone" /></span>
              <p className="mt-4 font-display text-lg text-espresso">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.min}+ points</p>
              <p className="mt-3 text-sm text-espresso">{t.perk}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display text-lg text-espresso">Redeem your points</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[["Free any drink", 100], ["Bag of single origin", 250], ["Pastry box for 6", 180]].map(([r, c]) => (
            <div key={String(r)} className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
              <span className="text-sm font-medium text-espresso">{r}</span>
              <button onClick={() => points >= (c as number) ? toast.success(`Redeemed: ${r}`) : toast.error("Not enough points")} className="rounded-full bg-espresso px-4 py-1.5 text-xs font-semibold text-cream">{c} pts</button>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">You've placed {orders.length} order{orders.length === 1 ? "" : "s"} — keep sipping to climb the tiers.</p>
      </div>
    </AccountShell>
  );
}

function EmptyState({ icon, title, text, cta, to }: { icon: ReactNode; title: string; text: string; cta: string; to: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-20 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-caramel">{icon}</span>
      <h3 className="mt-5 font-display text-xl text-espresso">{title}</h3>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <div className="mt-6"><GoldButton as="link" to={to}>{cta} <ArrowRight size={16} /></GoldButton></div>
    </div>
  );
}

/* ---------- info pages ---------- */
export function About() {
  return (
    <>
      <PageHero crumb="Our story" title="Rooted in craft, poured with heart" sub="From a single roaster in 2016 to a neighbourhood of coffee lovers." />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <Reveal><img src={IMG.interior} alt="Café" className="aspect-[4/3] w-full rounded-3xl object-cover" /></Reveal>
        <Reveal delay={0.1}>
          <SectionHeading eyebrow="Since 2016" title="We started with one question" sub="" />
          <p className="mt-4 text-lg leading-relaxed text-espresso/80">What if a cup of coffee could slow the whole day down? That curiosity led us to origin, to the roaster, and finally to your hands.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[["30+", "Partner farms"], ["1.2M", "Cups poured"], ["48", "Team members"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-secondary/60 p-5 text-center"><p className="font-display text-2xl text-caramel">{n}</p><p className="text-xs text-muted-foreground">{l}</p></div>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading center eyebrow="What we believe" title="Three promises in every cup" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Storefront, t: "Community first", s: "Cafés designed to be lived in — not just passed through." },
              { icon: Truck, t: "Sustainable sourcing", s: "Direct trade, fair prices and compostable everything." },
              { icon: ShieldCheck, t: "Radical freshness", s: "Roasted weekly, never older than seven days on the shelf." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-card p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-caramel"><v.icon size={24} weight="duotone" /></span>
                  <h3 className="mt-5 font-display text-xl text-espresso">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Locations() {
  return (
    <>
      <PageHero crumb="Visit us" title="Our locations" sub="Three warm rooms, one shared obsession with great coffee." />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {LOCATIONS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.1}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative h-44"><img src={i === 1 ? IMG.pour : IMG.interior} alt={l.name} className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-espresso/90 px-3 py-1 text-xs font-semibold text-gold">{l.tag}</span></div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-espresso">{l.name}</h3>
                  <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground"><MapPin size={18} className="mt-0.5 shrink-0 text-caramel" /> {l.address}, {l.city}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Coffee size={18} className="shrink-0 text-caramel" /> {l.hours}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Phone size={18} className="shrink-0 text-caramel" /> {l.phone}</p>
                  <div className="mt-auto pt-5"><GhostLink to="/contact">Get directions</GhostLink></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) { toast.error("Please fill in all fields"); return; }
    toast.success("Message sent — we'll reply within a day!");
    setForm({ name: "", email: "", msg: "" });
  };
  return (
    <>
      <PageHero crumb="Contact" title="Say hello" sub="Questions, catering or press — we'd love to hear from you." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="space-y-5">
            {[
              { icon: Phone, t: "Call us", s: "(503) 555-0142" },
              { icon: EnvelopeSimple, t: "Email", s: "hello@roastandbloom.coffee" },
              { icon: MapPin, t: "Head roastery", s: "204 Market Street, Portland, OR" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-caramel"><c.icon size={22} weight="duotone" /></span>
                <div><p className="text-sm font-semibold text-espresso">{c.t}</p><p className="text-sm text-muted-foreground">{c.s}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-7">
            <TextField label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Your name" />
            <TextField label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@email.com" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-espresso">Message</span>
              <textarea value={form.msg} onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))} placeholder="How can we help?" rows={5} className="w-full rounded-xl border border-border bg-cream/40 px-4 py-3 text-sm text-espresso focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/20" />
            </label>
            <button className="w-full rounded-full bg-gradient-to-r from-gold to-caramel px-7 py-3.5 font-semibold text-espresso shadow-lg transition-transform hover:scale-[1.01] active:scale-95">Send message</button>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function GhostLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-sm font-semibold text-espresso">
      {children}
      <span className="h-px w-6 bg-espresso/40 transition-all duration-300 group-hover:w-10 group-hover:bg-caramel" />
    </Link>
  );
}
