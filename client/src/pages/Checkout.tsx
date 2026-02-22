import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Minimal Header for Checkout to reduce distraction */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/product/2">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Product
            </a>
          </Link>
          <div className="font-heading font-bold text-xl tracking-tight">
            LUMINA
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" /> Secure
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Main Checkout Flow */}
          <div className="flex-1 space-y-10">
            {/* Step 1: Contact */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="font-heading text-2xl font-bold">Contact Information</h2>
              </div>
              <div className="space-y-4 pl-12">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="h-12 bg-background" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" id="newsletter" className="rounded border-input rounded-sm" />
                  <label htmlFor="newsletter">Keep me up to date on news and exclusive offers</label>
                </div>
              </div>
            </section>

            <Separator />

            {/* Step 2: Shipping */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <h2 className="font-heading text-2xl font-bold">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 pl-12">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input id="fname" placeholder="First Name" className="h-12 bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input id="lname" placeholder="Last Name" className="h-12 bg-background" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" className="h-12 bg-background" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" className="h-12 bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="State" className="h-12 bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="ZIP" className="h-12 bg-background" />
                </div>
              </div>
            </section>

            <Separator />

            {/* Step 3: Payment */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-sm">3</div>
                <h2 className="font-heading text-2xl font-bold text-muted-foreground">Payment</h2>
              </div>
              <div className="pl-12 opacity-50 pointer-events-none">
                <p className="text-sm mb-4">Please complete shipping information to proceed to payment.</p>
                <div className="border rounded-xl p-6 bg-background">
                  <div className="h-12 bg-muted rounded animate-pulse w-full mb-4"></div>
                  <div className="flex gap-4">
                    <div className="h-12 bg-muted rounded animate-pulse w-1/2"></div>
                    <div className="h-12 bg-muted rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
              
              <div className="pl-12 mt-8">
                <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg">
                  Continue to Payment
                </Button>
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="w-full lg:w-[400px]">
            <div className="bg-background rounded-2xl border shadow-sm p-6 sticky top-24">
              <h3 className="font-heading font-bold text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {/* Item item */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0 border">
                    <img src="/src/assets/images/product-headphones.jpg" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-medium text-sm leading-snug mb-1">Silence Pro Wireless Headphones</h4>
                    <span className="text-xs text-muted-foreground mb-2">Color: Midnight Black</span>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm font-medium">Qty: 1</span>
                      <span className="font-bold">$349.00</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$349.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium">Calculated at next step</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl">$349.00</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center mt-6 p-4 bg-muted/50 rounded-lg">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Secure Checkout</span>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
