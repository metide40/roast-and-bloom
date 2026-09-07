import { useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Bag, Heart, House, List, MapPin, Moon, Phone, Sun, User,
  X, Coffee, InstagramLogo, FacebookLogo, TwitterLogo, EnvelopeSimple,
  CheckCircle,
} from "@phosphor-icons/react";
import { useApp } from "@/store";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/* ---------- Theme toggle ---------- */
function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary",
        className,
      )}
    >
      {theme === "dark" ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
    </button>
  );
}

/* ---------- Motion helper ---------- */
export function Reveal({
  children, delay = 0, y = 24, className,
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow, title, sub, center,
}: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-caramel">
          <span className="h-px w-6 bg-caramel/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ---------- Buttons ---------- */
export function GoldButton({
  children, className, as, to, ...rest
}: {
  children: ReactNode; className?: string; as?: "button" | "link"; to?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-caramel px-7 py-3.5",
    "text-sm font-semibold text-espresso shadow-[0_10px_30px_-12px_rgba(176,125,67,0.7)]",
    "transition-transform duration-300 hover:scale-[1.03] active:scale-95",
    className,
  );
  if (as === "link" && to) return <Link to={to} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}

export function GhostLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground">
      {children}
      <span className="h-px w-6 bg-espresso/40 transition-all duration-300 group-hover:w-10 group-hover:bg-caramel" />
    </Link>
  );
}

/* ---------- Navbar ---------- */
const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/menu", label: "Menu", icon: Coffee },
  { to: "/about", label: "About", icon: List },
  { to: "/locations", label: "Locations", icon: MapPin },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function Navbar() {
  const { cartCount, favorites, user } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useState(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
      onScroll();
    }
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/90 shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-gold">
            <Coffee size={22} weight="fill" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Roast <span className="text-caramel">&amp;</span> Bloom
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  {isActive && (
                    <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-caramel" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <IconLink to="/favorites" count={favorites.length}><Heart size={20} weight="duotone" /></IconLink>
          <IconLink to="/cart" count={cartCount}><Bag size={20} weight="duotone" /></IconLink>
          <Link
            to={user ? "/profile" : "/login"}
            className="ml-1 hidden items-center gap-2 rounded-full border border-espresso/15 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-caramel hover:text-caramel sm:inline-flex"
          >
            <User size={18} weight="duotone" />
            {user ? user.name.split(" ")[0] : "Sign in"}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-espresso lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                    loc.pathname === n.to ? "bg-secondary text-espresso" : "text-muted-foreground",
                  )}
                >
                  <n.icon size={18} /> {n.label}
                </Link>
              ))}
              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-3 rounded-xl bg-espresso px-4 py-3 text-sm font-semibold text-cream"
              >
                <User size={18} /> {user ? "My Profile" : "Sign in"}
              </Link>
              <ThemeToggle className="mt-1 w-full justify-start gap-3 rounded-xl px-4 text-sm font-medium text-espresso" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconLink({ to, count, children }: { to: string; count?: number; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
    >
      {children}
      {!!count && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-caramel px-1 text-[11px] font-bold text-cream">
          {count}
        </span>
      )}
    </Link>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-espresso">
              <Coffee size={22} weight="fill" />
            </span>
            <span className="font-display text-xl font-semibold text-cream">Roast &amp; Bloom</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            Small-batch coffee, roasted with patience and poured with care. A warm ritual for the everyday.
          </p>
          <div className="mt-6 flex gap-3">
            {[InstagramLogo, FacebookLogo, TwitterLogo].map((I, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-gold hover:text-espresso">
                <I size={18} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Explore" links={[["Menu", "/menu"], ["About", "/about"], ["Locations", "/locations"], ["Loyalty", "/loyalty"]]} />
        <FooterCol title="Account" links={[["Sign in", "/login"], ["Create account", "/signup"], ["Order history", "/orders"], ["Favorites", "/favorites"]]} />

        <div>
          <h4 className="font-display text-lg text-cream">Stay in the loop</h4>
          <p className="mt-4 text-sm text-cream/60">Fresh roasts, seasonal pours and member-only perks.</p>
          {newsletterEmail ? (
            <div className="mt-5 flex items-center gap-3 rounded-full border border-cream/10 bg-cream/5 px-4 py-3 text-sm text-cream">
              <CheckCircle size={18} weight="fill" className="text-gold" />
              <span>Subscribed as {newsletterEmail}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex overflow-hidden rounded-full bg-cream/10 p-1">
              <span className="flex items-center pl-3 text-cream/50"><EnvelopeSimple size={18} /></span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent px-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-gold px-4 text-sm font-semibold text-espresso">Join</button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Roast &amp; Bloom Coffee. All rights reserved.</p>
          <p>Crafted with care · Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-lg text-cream">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="text-cream/60 transition-colors hover:text-gold">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Page shell ---------- */
export function PageHero({ title, sub, crumb }: { title: string; sub?: string; crumb: string }) {
  return (
    <section className="relative overflow-hidden bg-espresso">
      <div className="absolute inset-0 opacity-25">
        <img src="/images/hero-beans.webp" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{crumb}</p>
        <h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl md:text-6xl">{title}</h1>
        {sub && <p className="mx-auto mt-5 max-w-xl text-cream/70">{sub}</p>}
      </div>
    </section>
  );
}