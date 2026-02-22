import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-2xl tracking-tighter">LUMINA</h3>
          <p className="text-primary-foreground/70 text-sm max-w-xs">
            Elevating everyday essentials through minimalist design and premium craftsmanship.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Accessories</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Sale</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Stay Connected</h4>
          <p className="text-primary-foreground/70 text-sm mb-4">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
        <p>&copy; 2026 Lumina Design. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
