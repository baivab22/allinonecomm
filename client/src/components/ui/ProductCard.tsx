import { Link } from "wouter";
import { Star, Heart, Plus } from "lucide-react";
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
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden">
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {badge}
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 z-10 bg-background/50 backdrop-blur-sm hover:bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Link href={`/product/${id}`}>
          <a className="block w-full h-full">
            <img 
              src={image} 
              alt={name} 
              className="object-cover w-full h-full image-zoom"
            />
          </a>
        </Link>
        
        {/* Quick add button that slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <Button className="w-full shadow-lg gap-2" variant="secondary">
            <Plus className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="space-y-1.5 px-1">
        <div className="flex items-center gap-1.5">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-muted-foreground'}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <Link href={`/product/${id}`}>
          <a className="font-medium text-sm line-clamp-1 hover:underline underline-offset-4">{name}</a>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-semibold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
