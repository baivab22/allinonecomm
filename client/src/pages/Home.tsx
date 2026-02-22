import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Mock data
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Aura Smart Watch Series 3",
    price: 299.00,
    image: "/src/assets/images/product-watch.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "New"
  },
  {
    id: "2",
    name: "Silence Pro Wireless Headphones",
    price: 349.00,
    originalPrice: 399.00,
    image: "/src/assets/images/product-headphones.jpg",
    rating: 4.9,
    reviews: 89,
    badge: "Sale"
  },
  {
    id: "3",
    name: "Nomad Everyday Backpack",
    price: 125.00,
    image: "/src/assets/images/product-backpack.jpg",
    rating: 4.7,
    reviews: 56
  },
  {
    id: "4",
    name: "Eclipse Polarized Sunglasses",
    price: 89.00,
    image: "/src/assets/images/product-sunglasses.jpg",
    rating: 4.5,
    reviews: 42
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10" /> {/* subtle overlay */}
          <img 
            src="/src/assets/images/hero.jpg" 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          <div className="container relative z-20 px-4 text-center text-white">
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-3xl mx-auto drop-shadow-lg">
              Redefining Modern Essentials
            </h1>
            <p className="text-lg md:text-xl font-medium mb-8 max-w-xl mx-auto drop-shadow-md text-white/90">
              Curated objects designed to elevate your everyday experience with uncompromising quality and minimalist aesthetics.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-8 rounded-full h-12">
                Shop Collection
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full h-12">
                Discover More
              </Button>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-12 bg-muted/50 border-b">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Free Global Delivery</h3>
                <p className="text-sm text-muted-foreground">On all orders over $150</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">100% encrypted transactions</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">30-Day Returns</h3>
                <p className="text-sm text-muted-foreground">Hassle-free return policy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight mb-2">Featured Selection</h2>
              <p className="text-muted-foreground">Discover our most sought-after pieces.</p>
            </div>
            <Link href="/products">
              <a className="hidden sm:flex items-center text-sm font-medium hover:underline underline-offset-4 gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" className="w-full">View All Products</Button>
          </div>
        </section>
        
        {/* Categories Section - Asymmetric layout */}
        <section className="py-12 pb-24 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-8 bg-muted rounded-3xl overflow-hidden relative group">
              <img src="/src/assets/images/product-headphones.jpg" alt="Audio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-sm font-medium mb-2 uppercase tracking-wider">Category</span>
                <h3 className="font-heading text-3xl font-bold mb-4">Premium Audio</h3>
                <Button variant="outline" className="w-fit text-white border-white hover:bg-white hover:text-black">
                  Shop Collection
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex-1 bg-muted rounded-3xl overflow-hidden relative group min-h-[250px]">
                <img src="/src/assets/images/product-watch.jpg" alt="Wearables" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="font-heading text-xl font-bold">Wearables</h3>
                </div>
              </div>
              <div className="flex-1 bg-primary rounded-3xl overflow-hidden p-8 flex flex-col justify-center text-primary-foreground">
                <h3 className="font-heading text-2xl font-bold mb-2">New Arrivals</h3>
                <p className="text-sm text-primary-foreground/70 mb-6">Explore the latest additions to our curated collection.</p>
                <Link href="/">
                  <a className="inline-flex items-center text-sm font-medium hover:underline gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
