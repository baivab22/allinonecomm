import { Link } from "wouter";
import { ArrowRight, Star, Percent, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PRODUCTS = [
  { id: "1", name: "Aura Smart Watch Series 3", price: 299, image: "/src/assets/images/product-watch.jpg", rating: 4.8, reviews: 124, badge: "Best Seller" },
  { id: "2", name: "Silence Pro Headphones", price: 349, originalPrice: 399, image: "/src/assets/images/product-headphones.jpg", rating: 4.9, reviews: 89, badge: "15% OFF" },
  { id: "3", name: "Nomad Backpack", price: 125, image: "/src/assets/images/product-backpack.jpg", rating: 4.7, reviews: 56 },
  { id: "4", name: "Eclipse Sunglasses", price: 89, image: "/src/assets/images/product-sunglasses.jpg", rating: 4.5, reviews: 42 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 pb-20">
        {/* Amazon-style Hero with overlapping cards */}
        <section className="relative h-[400px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 z-10" />
          <img 
            src="/src/assets/images/hero.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-muted/20 to-transparent z-10" />
        </section>

        {/* Floating Content Cards */}
        <div className="container mx-auto px-4 -mt-32 md:-mt-64 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background p-6 rounded-xl shadow-lg flex flex-col">
              <h3 className="font-bold text-xl mb-4">Summer Essentials</h3>
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                  <img src="/src/assets/images/product-sunglasses.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                  <img src="/src/assets/images/product-backpack.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                  <img src="/src/assets/images/product-watch.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 text-xs flex items-center justify-center font-bold text-primary">
                  View More
                </div>
              </div>
              <Link href="/"><a className="text-primary text-sm font-medium mt-4 hover:underline">Shop the collection</a></Link>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-lg flex flex-col">
              <h3 className="font-bold text-xl mb-4">Limited Time Offer</h3>
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4 relative group">
                <img src="/src/assets/images/product-headphones.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-2 right-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                  -20%
                </div>
              </div>
              <p className="text-sm font-medium mb-1">Silence Pro Headphones</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-destructive">$319.00</span>
                <span className="text-sm text-muted-foreground line-through">$399.00</span>
              </div>
              <Link href="/"><a className="text-primary text-sm font-medium mt-auto hover:underline">See all deals</a></Link>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-lg flex flex-col">
              <h3 className="font-bold text-xl mb-4">Trending Tech</h3>
              <div className="aspect-square bg-primary/5 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/src/assets/images/product-watch.jpg" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">The latest in wearable technology, curated for Lumina members.</p>
              <Link href="/"><a className="text-primary text-sm font-medium mt-auto hover:underline">Explore tech</a></Link>
            </div>

            <div className="bg-background p-6 rounded-xl shadow-lg flex flex-col">
              <h3 className="font-bold text-xl mb-4">Lumina Prime</h3>
              <p className="text-sm text-muted-foreground mb-6">Fast, free delivery on over 10 million items and exclusive access to movies & music.</p>
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold mb-4">Try Prime Free</Button>
              <p className="text-xs text-center text-muted-foreground">Terms apply. $14.99/mo after trial.</p>
            </div>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Zap className="text-secondary" />, title: "Lightning Fast", desc: "Same day delivery" },
              { icon: <ShieldCheck className="text-primary" />, title: "Secure Checkout", desc: "100% protected" },
              { icon: <TrendingUp className="text-green-500" />, title: "Trending", desc: "Most popular now" },
              { icon: <Percent className="text-destructive" />, title: "Daily Deals", desc: "Up to 50% off" }
            ].map((f, i) => (
              <div key={i} className="bg-background p-4 rounded-lg flex items-center gap-4 border hover:border-primary/20 transition-colors">
                <div className="p-2 bg-muted rounded-full">{f.icon}</div>
                <div>
                  <h4 className="font-bold text-sm">{f.title}</h4>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers Scroll */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold tracking-tight">Best Sellers in Electronics</h2>
            <Link href="/"><a className="text-primary text-sm font-medium hover:underline">Shop more</a></Link>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {PRODUCTS.concat(PRODUCTS).map((p, i) => (
              <div key={i} className="min-w-[200px] md:min-w-[240px]">
                <ProductCard {...p} id={`${p.id}-${i}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Don't miss the next drop.</h2>
              <p className="text-primary-foreground/70 mb-8">Get exclusive access to limited-run collections and early access to sales.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="your@email.com" />
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-auto py-3 px-8">Subscribe</Button>
              </div>
            </div>
            {/* Abstract Background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
