import { Link } from "wouter";
import { Star, Heart, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export function ProductCard({ id, name, price, originalPrice, image, rating, reviews, badge }: ProductCardProps) {
  return (
    <div className="group bg-background rounded-lg border hover:shadow-xl transition-all flex flex-col overflow-hidden h-full">
      <div className="relative aspect-square bg-muted">
        {badge && (
          <div className="absolute top-2 left-2 z-10 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {badge}
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Link href={`/product/${id}`}>
          <a className="block w-full h-full p-4">
            <img 
              src={image} 
              alt={name} 
              className="object-contain w-full h-full image-zoom mix-blend-multiply"
            />
          </a>
        </Link>
      </div>
      
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/product/${id}`}>
          <a className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors leading-tight mb-2 h-10">{name}</a>
        </Link>
        
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-muted/20'}`} />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">{reviews}</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through decoration-destructive/50">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Button size="icon" className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
