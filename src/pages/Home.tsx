import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Coffee, Crown, Flame, Leaf, MapPin, Medal, PlayCircle,
  Quotes, ShieldCheck, Star, Storefront, Truck,
} from "@phosphor-icons/react";
import { IMG, PRODUCTS, TESTIMONIALS, formatMoney, type Product } from "@/data";
import { useApp, linePrice } from "@/store";
import { GoldButton, GhostLink, Reveal, SectionHeading } from "@/components/Layout";
import { cn } from "@/lib/utils";

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const fav = isFavorite(p.id);
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(58,36,24,0.45)]">
        <Link to={`/product/${p.id}`} className="relative block aspect-[4/3] overflow-hidden">
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {p.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-espresso/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold backdrop-blur">
              {p.badge}
            </span>
          )}
        </Link>
        <button
          onClick={() => toggleFavorite(p.id)}
          aria-label="Favorite"
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors",
            fav ? "bg-caramel text-cream" : "bg-cream/80 text-espresso hover:bg-cream",
          )}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-caramel">{p.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star size={13} weight="fill" className="text-gold" /> {p.rating}
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-lg text-espresso">{p.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.notes.join(" · ")}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="font-display text-xl text-espresso">{formatMoney(p.price)}</span>
            <button
              onClick={() => addToCart(p, "M", "Dairy")}
              className="inline-flex items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-xs font-semibold text-cream transition-transform hover:scale-105 active:scale-95"
            >
              Add <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 3);
  const popular = PRODUCTS.slice(0, 8);
  const [tab, setTab] = useState("Coffee");
  const tabs = ["Coffee", "Espresso", "Pastries", "Beans"];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/80 to-espresso/40" />
        </div>
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center px-5 py-24 sm:px-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              <Flame size={14} /> Small-batch roasted daily
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl"
            >
              Where every cup <span className="gold-gradient italic">blooms</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75"
            >
              Ethically sourced beans, patient roasting and baristas who care. Order ahead for pickup or have a fresh pour delivered to your door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <GoldButton as="link" to="/menu">Explore the Menu <ArrowRight size={16} /></GoldButton>
              <Link to="/about" className="group inline-flex items-center gap-3 text-cream">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 transition-colors group-hover:border-gold group-hover:text-gold">
                  <PlayCircle size={22} weight="fill" />
                </span>
                <span className="text-sm font-semibold">Our story</span>
              </Link>
            </motion.div>
            <div className="mt-12 flex flex-wrap gap-8">
              {[["12+", "Signature drinks"], ["3", "Cozy locations"], ["4.9★", "Avg. rating"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl text-gold">{n}</p>
                  <p className="text-sm text-cream/60">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {[
            { icon: Truck, t: "Free delivery", s: "On orders over $25" },
            { icon: Leaf, t: "Ethically sourced", s: "Direct-trade farms" },
            { icon: ShieldCheck, t: "Freshness promise", s: "Roasted within 7 days" },
            { icon: Crown, t: "Loyalty rewards", s: "Earn on every sip" },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-caramel">
                <f.icon size={22} weight="duotone" />
              </span>
              <div>
                <p className="text-sm font-semibold text-espresso">{f.t}</p>
                <p className="text-xs text-muted-foreground">{f.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="House favourites" title="This week at the bar" sub="Hand-picked pours our regulars can't stop ordering." />
          <GhostLink to="/menu">View full menu</GhostLink>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </section>

      {/* STORY SPLIT */}
      <section className="bg-secondary/50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img src={IMG.interior} alt="Roast & Bloom café interior" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-espresso px-6 py-5 text-cream shadow-xl sm:block">
              <p className="font-display text-3xl text-gold">Since 2016</p>
              <p className="text-xs text-cream/60">Roasting in Portland</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Our craft" title="Slow coffee for a fast world" />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We travel to origin, build relationships with growers, and roast in small batches so every bean reaches its fullest potential. Then our baristas treat each cup like it's the only one that matters.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                { icon: Storefront, t: "Roastery & café", s: "Watch your beans roasted steps from your table." },
                { icon: Coffee, t: "Barista precision", s: "Dialled-in recipes, poured to order, every time." },
                { icon: Medal, t: "Award-winning blends", s: "Recognised for flavour, consistency and sustainability." },
              ].map((r) => (
                <li key={r.t} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-caramel shadow-sm">
                    <r.icon size={22} weight="duotone" />
                  </span>
                  <div>
                    <p className="font-semibold text-espresso">{r.t}</p>
                    <p className="text-sm text-muted-foreground">{r.s}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8"><GoldButton as="link" to="/about">Learn our story <ArrowRight size={16} /></GoldButton></div>
          </Reveal>
        </div>
      </section>

      {/* POPULAR TABS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading center eyebrow="Most loved" title="Browse by craving" />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                tab === t ? "bg-espresso text-cream shadow-lg" : "bg-secondary text-espresso hover:bg-secondary/70",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.filter((p) => p.category === tab).slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* LOYALTY BANNER */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-espresso px-8 py-14 sm:px-14">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
                  <Crown size={15} weight="fill" /> Bloom Rewards
                </span>
                <h3 className="mt-5 font-display text-3xl text-cream sm:text-4xl">Every sip earns you more.</h3>
                <p className="mt-4 max-w-lg text-cream/70">
                  Collect a point on every dollar, unlock free drinks, birthday pours and members-only single origins. Joining takes ten seconds.
                </p>
                <div className="mt-7"><GoldButton as="link" to="/loyalty">Join rewards <ArrowRight size={16} /></GoldButton></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[["1pt", "per $1"], ["100pts", "= free drink"], ["Tier", "Gold perks"], ["Gift", "Birthday pour"]].map(([a, b]) => (
                  <div key={b} className="rounded-2xl border border-cream/10 bg-cream/5 p-5 text-center">
                    <p className="font-display text-2xl text-gold">{a}</p>
                    <p className="mt-1 text-xs text-cream/60">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading center eyebrow="Kind words" title="Loved by our regulars" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <Quotes size={34} weight="fill" className="text-gold/50" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-espresso/90">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display text-caramel">{t.name[0]}</span>
                  <div>
                    <p className="text-sm font-semibold text-espresso">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VISIT CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-card px-8 py-12 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-5">
              <span className="hidden h-14 w-14 items-center justify-center rounded-full bg-secondary text-caramel sm:flex"><MapPin size={26} weight="duotone" /></span>
              <div>
                <h3 className="font-display text-2xl text-espresso">Come say hello in person.</h3>
                <p className="mt-1 text-muted-foreground">Three cosy locations across Portland &amp; Seattle.</p>
              </div>
            </div>
            <GhostLink to="/locations">Find a café</GhostLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
