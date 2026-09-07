export const IMG = {
  hero: "/images/hero-beans.webp",
  latte: "/images/latte-art.webp",
  interior: "/images/shop-interior.webp",
  coldbrew: "/images/bag-coldbrew.webp",
  espresso: "/images/bag-espresso.webp",
  single: "/images/bag-singleorigin.webp",
  pour: "/images/pour-over.webp",
  pastry: "/images/pastry.webp",
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  origin: string;
  roast: string;
  notes: string[];
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
};

export const CATEGORIES = ["Coffee", "Espresso", "Cold Brew", "Pastries", "Beans"];

export const PRODUCTS: Product[] = [
  {
    id: "bloom-house-blend", name: "Bloom House Blend", category: "Coffee", price: 4.5,
    image: IMG.latte, origin: "Brazil · Colombia", roast: "Medium",
    notes: ["Caramel", "Cocoa", "Toasted Almond"],
    description: "Our signature everyday cup — balanced, silky and endlessly drinkable. A gentle roast built for slow mornings and long conversations.",
    rating: 4.8, reviews: 412, badge: "Bestseller",
  },
  {
    id: "velvet-oat-latte", name: "Velvet Oat Latte", category: "Coffee", price: 5.25,
    image: IMG.pour, origin: "Single Origin Ethiopia", roast: "Light-Medium",
    notes: ["Vanilla", "Oat", "Brown Sugar"],
    description: "Double-shot espresso folded into steamed barista oat milk. Creamy, naturally sweet and beautifully plant-based.",
    rating: 4.9, reviews: 288, badge: "New",
  },
  {
    id: "golden-flat-white", name: "Golden Flat White", category: "Espresso", price: 4.75,
    image: IMG.latte, origin: "Colombia Huila", roast: "Medium",
    notes: ["Honey", "Hazelnut", "Silk"],
    description: "A ristretto-forward flat white with micro-foam poured to a glossy finish. Small, strong and impossibly smooth.",
    rating: 4.7, reviews: 196,
  },
  {
    id: "midterm-espresso", name: "Noir Espresso", category: "Espresso", price: 3.5,
    image: IMG.espresso, origin: "Brazil Cerrado", roast: "Dark",
    notes: ["Dark Chocolate", "Molasses", "Cherry"],
    description: "A bold, syrupy single shot pulled from our darkest roast. Intense crema and a lingering bittersweet finish.",
    rating: 4.6, reviews: 154,
  },
  {
    id: "slow-cold-brew", name: "20hr Slow Cold Brew", category: "Cold Brew", price: 5.0,
    image: IMG.coldbrew, origin: "Guatemala Antigua", roast: "Medium",
    notes: ["Cocoa", "Citrus Peel", "Smooth"],
    description: "Steeped cold for twenty hours for a naturally sweet, low-acid brew served over clear ice. Refreshingly clean.",
    rating: 4.8, reviews: 233, badge: "Staff Pick",
  },
  {
    id: "bloom-tonic", name: "Espresso Tonic Bloom", category: "Cold Brew", price: 5.5,
    image: IMG.coldbrew, origin: "Kenya Nyeri", roast: "Light",
    notes: ["Tonic", "Orange", "Floral"],
    description: "Bright Kenyan espresso poured over artisan tonic and a wheel of orange. Sparkling, aromatic and unexpectedly elegant.",
    rating: 4.7, reviews: 121,
  },
  {
    id: "butter-croissant", name: "Golden Butter Croissant", category: "Pastries", price: 3.75,
    image: IMG.pastry, origin: "Baked Daily", roast: "—",
    notes: ["Butter", "Flaky", "Sea Salt"],
    description: "Laminated over three days with cultured French butter for a shatteringly crisp shell and cloud-soft centre.",
    rating: 4.9, reviews: 340, badge: "Fresh",
  },
  {
    id: "almond-financier", name: "Toasted Almond Financier", category: "Pastries", price: 3.25,
    image: IMG.pastry, origin: "Baked Daily", roast: "—",
    notes: ["Almond", "Brown Butter", "Vanilla"],
    description: "A delicate brown-butter cake with toasted almond, crisp at the edges and tender within. The perfect espresso companion.",
    rating: 4.6, reviews: 98,
  },
  {
    id: "ethiopia-solana", name: "Ethiopia · Solana Beans", category: "Beans", price: 18.0,
    image: IMG.single, origin: "Yirgacheffe, Ethiopia", roast: "Light",
    notes: ["Jasmine", "Bergamot", "Peach"],
    description: "A washed heirloom lotus of a coffee — floral, tea-like and luminous. Roasted weekly for filter and pour-over.",
    rating: 4.9, reviews: 176, badge: "Single Origin",
  },
  {
    id: "house-espresso-beans", name: "House Espresso Beans", category: "Beans", price: 16.0,
    image: IMG.espresso, origin: "Brazil · Colombia", roast: "Medium-Dark",
    notes: ["Chocolate", "Caramel", "Walnut"],
    description: "The beans behind every drink at the bar. Forgiving, sweet and built for milk. Pull a flawless shot at home.",
    rating: 4.8, reviews: 254,
  },
  {
    id: "guatemala-coldbrew-beans", name: "Cold Brew Reserve Beans", category: "Beans", price: 17.0,
    image: IMG.coldbrew, origin: "Guatemala Antigua", roast: "Medium",
    notes: ["Cocoa", "Orange", "Malt"],
    description: "Coarsely blended for long cold extraction. Sweet, chocolatey and never bitter — your fridge's new best friend.",
    rating: 4.7, reviews: 87,
  },
  {
    id: "honey-cortado", name: "Honey Cortado", category: "Espresso", price: 4.25,
    image: IMG.latte, origin: "Costa Tarrazú", roast: "Medium",
    notes: ["Honey", "Milk Chocolate", "Citrus"],
    description: "Equal parts espresso and silky steamed milk, kissed with wildflower honey. Small but mighty.",
    rating: 4.7, reviews: 143,
  },
];

export type Location = {
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  tag: string;
};

export const LOCATIONS: Location[] = [
  { name: "Roast & Bloom · Bole", address: "Bole Road, near Edna Mall", city: "Addis Ababa", hours: "Mon–Sun · 7am – 8pm", phone: "+251 911 630 142", tag: "Flagship" },
  { name: "Roast & Bloom · Piazza", address: "Churchill Avenue", city: "Addis Ababa", hours: "Mon–Sat · 6:30am – 7pm", phone: "+251 922 552 177", tag: "Roastery" },
  { name: "Roast & Bloom · Kazanchis", address: "Ethio-China Street", city: "Addis Ababa", hours: "Mon–Sun · 7am – 6pm", phone: "+251 933 470 110", tag: "Café" },
];

export const TESTIMONIALS = [
  { name: "Amara O.", role: "Loyal member since 2022", quote: "The Slow Cold Brew ruined every other coffee for me. Roast & Bloom feels like a warm ritual I get to keep." },
  { name: "Daniel R.", role: "Home barista", quote: "Their House Espresso beans pull the cleanest shots I've made at home. The loyalty rewards are just the cherry on top." },
  { name: "Priya S.", role: "Regular, Riverside", quote: "Beautiful space, kinder people, and a flat white that genuinely tastes like velvet. My favourite corner of the city." },
];

export const formatMoney = (n: number) => `$${n.toFixed(2)}`;

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
