import { Link } from "wouter";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/">
            <a className="font-heading font-bold text-2xl tracking-tighter transition-opacity hover:opacity-80">
              LUMINA
            </a>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</a></Link>
            <Link href="/"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Collections</a></Link>
            <Link href="/"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a></Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Link href="/checkout">
            <Button variant="ghost" size="icon" className="text-foreground relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
