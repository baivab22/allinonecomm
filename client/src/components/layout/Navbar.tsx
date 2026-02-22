import { Link } from "wouter";
import { Search, ShoppingCart, User, Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Bar - Amazon style but minimal */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="font-heading font-bold text-2xl tracking-tighter hover:opacity-90 transition-opacity">
                LUMINA<span className="text-secondary">.</span>
              </a>
            </Link>
            
            <div className="hidden lg:flex items-center gap-2 text-xs opacity-80 cursor-pointer hover:ring-1 hover:ring-white/20 p-1 rounded transition-all">
              <MapPin className="h-4 w-4" />
              <div className="flex flex-col">
                <span>Deliver to</span>
                <span className="font-bold">New York 10001</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl relative hidden md:block">
            <div className="flex">
              <div className="bg-muted text-muted-foreground text-xs px-3 flex items-center rounded-l-md border-r cursor-pointer hover:bg-muted/80">
                All
              </div>
              <Input 
                className="rounded-none bg-background text-foreground focus-visible:ring-0 border-none h-10" 
                placeholder="Search Lumina essentials..."
              />
              <Button size="icon" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-l-none rounded-r-md h-10 w-12">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" className="hidden lg:flex flex-col items-start h-auto py-1 px-3 hover:bg-white/10">
              <span className="text-[10px] opacity-80">Hello, Sign in</span>
              <span className="text-sm font-bold">Account & Lists</span>
            </Button>
            
            <Link href="/checkout">
              <Button variant="ghost" className="flex items-center gap-2 h-auto py-2 px-3 hover:bg-white/10 relative">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-primary">
                    2
                  </span>
                </div>
                <span className="hidden sm:inline text-sm font-bold self-end mb-0.5">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav Bottom */}
      <div className="bg-primary/95 text-primary-foreground py-2 px-4 border-t border-white/10 hidden sm:block">
        <div className="container mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar">
          <Button variant="ghost" size="sm" className="gap-2 font-bold hover:bg-white/10 h-8">
            <Menu className="h-4 w-4" /> All
          </Button>
          <nav className="flex items-center gap-6 text-sm font-medium whitespace-nowrap">
            <a href="#" className="hover:ring-1 hover:ring-white/20 px-2 py-1 rounded transition-all">Today's Deals</a>
            <a href="#" className="hover:ring-1 hover:ring-white/20 px-2 py-1 rounded transition-all">Best Sellers</a>
            <a href="#" className="hover:ring-1 hover:ring-white/20 px-2 py-1 rounded transition-all">New Releases</a>
            <a href="#" className="hover:ring-1 hover:ring-white/20 px-2 py-1 rounded transition-all">Gift Ideas</a>
          </nav>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="bg-primary p-3 md:hidden">
        <div className="flex bg-background rounded-md overflow-hidden">
          <Input 
            className="border-none focus-visible:ring-0 h-10 text-foreground" 
            placeholder="Search Lumina..."
          />
          <Button size="icon" className="bg-secondary text-secondary-foreground rounded-none h-10 w-12">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
