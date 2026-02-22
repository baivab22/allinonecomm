import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, Heart, Share2, Star, Minus, Plus, Truck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PRODUCT = {
  id: "2",
  name: "Silence Pro Wireless Headphones",
  price: 349.00,
  originalPrice: 399.00,
  rating: 4.9,
  reviews: 89,
  description: "Experience pure audio bliss with the Silence Pro Wireless Headphones. Engineered with industry-leading active noise cancellation and custom 40mm drivers for rich, detailed sound. The minimalist design ensures all-day comfort without compromising on style.",
  images: [
    "/src/assets/images/product-headphones.jpg",
    "/src/assets/images/product-watch.jpg", // reuse for gallery mockup
    "/src/assets/images/product-backpack.jpg",
  ],
  colors: ["#171717", "#f5f5f5", "#0ea5e9"],
  stock: true,
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8 container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/"><a className="hover:text-foreground transition-colors">Home</a></Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/"><a className="hover:text-foreground transition-colors">Audio</a></Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground font-medium truncate">{PRODUCT.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="space-y-4 sticky top-24">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted relative">
              <img 
                src={PRODUCT.images[activeImage]} 
                alt={PRODUCT.name} 
                className="w-full h-full object-cover"
              />
              {PRODUCT.originalPrice && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">
                  SALE
                </div>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {PRODUCT.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-muted border-2 transition-all ${activeImage === i ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {PRODUCT.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(PRODUCT.rating) ? 'fill-current' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-1">{PRODUCT.rating}</span>
                </div>
                <a href="#reviews" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                  See all {PRODUCT.reviews} reviews
                </a>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold">${PRODUCT.price.toFixed(2)}</span>
                {PRODUCT.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through mb-1">${PRODUCT.originalPrice.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {PRODUCT.description}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-sm uppercase tracking-wider">Color</span>
                </div>
                <div className="flex gap-3">
                  {PRODUCT.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedColor === i ? 'ring-2 ring-primary ring-offset-2' : 'ring-1 ring-border hover:scale-110'}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${i}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1 max-w-[120px]">
                  <span className="block font-medium text-sm uppercase tracking-wider mb-3">Quantity</span>
                  <div className="flex items-center justify-between border rounded-lg h-12 px-3 bg-background">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 flex gap-3">
                  <Link href="/checkout" className="flex-1">
                    <Button className="w-full h-12 text-base font-semibold rounded-lg" size="lg">
                      Add to Cart
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg flex-shrink-0">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {PRODUCT.stock && (
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 text-green-700 w-fit px-3 py-1.5 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  In Stock & Ready to Ship
                </div>
              )}
            </div>

            {/* Features Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="features">
                <AccordionTrigger className="text-base font-medium hover:no-underline">Key Features</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Active Noise Cancellation (ANC)</li>
                    <li>Up to 40 hours battery life</li>
                    <li>Bluetooth 5.3 multipoint connectivity</li>
                    <li>Premium memory foam ear cushions</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-medium hover:no-underline">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Free Standard Shipping</p>
                        <p className="text-sm">Delivery in 3-5 business days.</p>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      Not satisfied? Return it within 30 days for a full refund. No questions asked.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
