import { Link } from "wouter";
import { ArrowRight, Star, Percent, Zap, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const PRODUCTS = [
  { id: "1", name: "Aura Smart Watch Series 3", price: 299, image: "/src/assets/images/product-watch.jpg", rating: 4.8, reviews: 124, badge: "Best Seller" },
  { id: "2", name: "Silence Pro Headphones", price: 349, originalPrice: 399, image: "/src/assets/images/product-headphones.jpg", rating: 4.9, reviews: 89, badge: "15% OFF" },
  { id: "3", name: "Nomad Backpack", price: 125, image: "/src/assets/images/product-backpack.jpg", rating: 4.7, reviews: 56 },
  { id: "4", name: "Eclipse Sunglasses", price: 89, image: "/src/assets/images/product-sunglasses.jpg", rating: 4.5, reviews: 42 },
];

const HERO_SLIDES = [
  {
    image: "/src/assets/images/hero.jpg",
    title: "Minimalist Design, Maximum Impact",
    subtitle: "Discover the new Summer Collection 2026.",
    cta: "Shop Collection"
  },
  {
    image: "/src/assets/images/hero-2.jpg",
    title: "Elevate Your Everyday Space",
    subtitle: "Premium office essentials for modern professionals.",
    cta: "Explore Office"
  },
  {
    image: "/src/assets/images/hero-3.jpg",
    title: "Precision Engineering Meet Style",
    subtitle: "Experience the next generation of wearable tech.",
    cta: "View Tech"
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    content: "The quality of Lumina products is unmatched. Every piece I've purchased feels carefully crafted and built to last.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Product Designer",
    content: "Minimalism done right. Lumina has become my go-to for both office and personal lifestyle essentials.",
    avatar: "MC"
  },
  {
    name: "Emma Williams",
    role: "Tech Enthusiast",
    content: "Fast delivery and exceptional customer service. The Silence Pro headphones are a total game changer for my daily commute.",
    avatar: "EW"
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 pb-20">
        {/* Professional Hero Slider */}
        <section className="relative overflow-hidden bg-primary">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {HERO_SLIDES.map((slide, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] relative h-[500px] md:h-[700px]">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
                  <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={selectedIndex === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="max-w-2xl text-white"
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                        New Season Arrival
                      </span>
                      <h1 className="font-heading text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 rounded-full h-14">
                          {slide.cta}
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-full h-14 px-8">
                          View Lookbook
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 w-12">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 w-12">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Progress Dots */}
          <div className="absolute bottom-10 left-10 z-30 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${selectedIndex === i ? 'w-8 bg-secondary' : 'w-3 bg-white/30'}`}
              />
            ))}
          </div>
        </section>

        {/* Floating Content Cards */}
        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-background p-8 rounded-2xl shadow-xl border border-border/50 flex flex-col group"
            >
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <TrendingUp className="text-secondary h-5 w-5" /> Summer Essentials
              </h3>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="aspect-square bg-muted rounded-xl overflow-hidden cursor-pointer">
                  <img src="/src/assets/images/product-sunglasses.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="aspect-square bg-muted rounded-xl overflow-hidden cursor-pointer">
                  <img src="/src/assets/images/product-backpack.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <Link href="/"><a className="text-primary text-sm font-bold mt-6 flex items-center gap-2 hover:gap-3 transition-all">Shop Collection <ArrowRight className="h-4 w-4" /></a></Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-background p-8 rounded-2xl shadow-xl border border-border/50 flex flex-col group"
            >
              <h3 className="font-bold text-xl mb-6">Limited Time Offer</h3>
              <div className="aspect-[16/9] bg-muted rounded-xl overflow-hidden mb-6 relative">
                <img src="/src/assets/images/product-headphones.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-destructive text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  -20%
                </div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div>
                  <p className="text-sm font-bold">Silence Pro</p>
                  <p className="text-xl font-black text-secondary">$319.00</p>
                </div>
                <Button size="sm" className="rounded-full">Get Deal</Button>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-primary p-8 rounded-2xl shadow-xl text-white flex flex-col overflow-hidden relative"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-4">Lumina Prime</h3>
                <p className="text-sm text-white/70 mb-8 leading-relaxed">
                  Join 10M+ members and get free shipping, exclusive drops, and premium streaming.
                </p>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-12 rounded-xl mb-4">
                  Start 30-Day Free Trial
                </Button>
                <p className="text-[10px] text-center text-white/40 uppercase tracking-widest font-bold">Cancel anytime</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>

        {/* Feature Highlights */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="text-secondary" />, title: "Lightning Fast", desc: "Same day delivery" },
              { icon: <ShieldCheck className="text-secondary" />, title: "Secure Checkout", desc: "100% protected" },
              { icon: <TrendingUp className="text-secondary" />, title: "Trending", desc: "Most popular now" },
              { icon: <Percent className="text-secondary" />, title: "Daily Deals", desc: "Up to 50% off" }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-border">
                <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">{f.icon}</div>
                <div>
                  <h4 className="font-bold text-base mb-1">{f.title}</h4>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Product Videos Preview */}
        <section className="bg-primary py-24 overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="max-w-xl text-white">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">In Motion</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">See Our Products in Action</h2>
                <p className="text-white/60">Experience the craftsmanship and detail of our latest releases through cinematic highlights.</p>
              </div>
              <Button variant="link" className="text-white hover:text-secondary p-0 h-auto font-bold flex items-center gap-2">
                Watch All Stories <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 group relative rounded-3xl overflow-hidden aspect-video bg-muted border border-white/10">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                >
                  <source src="/src/assets/videos/product-showcase.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Aura Series 3: The Design Process</h3>
                  <div className="flex items-center gap-4">
                    <Button size="icon" className="rounded-full h-12 w-12 bg-white text-black hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </Button>
                    <span className="text-white/70 text-sm font-medium">04:20 Full Feature</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="flex-1 bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 bg-muted rounded-xl overflow-hidden">
                      <img src="/src/assets/images/product-headphones.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Silence Pro ANC</h4>
                      <p className="text-white/40 text-xs">Acoustic Testing</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary" 
                      animate={{ width: ["0%", "100%"] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <h4 className="text-white font-bold mb-2">Sustainable Materials</h4>
                  <p className="text-white/40 text-sm mb-4">Our journey to 100% recycled packaging by 2027.</p>
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 w-full rounded-xl">Watch Journey</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        </section>

        {/* Testimonials */}
        <section className="py-24 container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Loved by our Global Community</h2>
            <p className="text-muted-foreground italic">Join over 1,000,000+ satisfied customers worldwide who trust Lumina for their daily essentials.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-border flex flex-col h-full"
              >
                <div className="flex text-secondary mb-6">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <Quote className="h-10 w-10 text-secondary/10 mb-6" />
                <p className="text-lg leading-relaxed mb-8 flex-1">"{t.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Best Sellers Scroll */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold tracking-tight">Best Sellers in Electronics</h2>
            <Link href="/"><a className="text-primary text-sm font-bold hover:underline flex items-center gap-2">View All <ArrowRight className="h-4 w-4" /></a></Link>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="min-w-[280px]">
                <ProductCard {...p} id={`${p.id}-${i}`} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
