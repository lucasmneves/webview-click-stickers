
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isSale = false,
  discount = 0,
}: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const discountedPrice = isSale && discount ? price - (price * discount) / 100 : price;
  const formattedDiscountedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(discountedPrice);

  return (
    <div className="sticker-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-sticker-teal hover:bg-sticker-teal">
            Novo
          </Badge>
        )}
        
        {isSale && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-800 mb-1 hover:text-sticker-purple transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="text-sm text-gray-500 mb-2">{category}</div>
        
        <div className="flex justify-between items-center">
          <div>
            {isSale && discount ? (
              <div className="flex items-center">
                <span className="text-gray-400 line-through text-sm mr-2">
                  {formattedPrice}
                </span>
                <span className="font-bold text-sticker-pink">
                  {formattedDiscountedPrice}
                </span>
              </div>
            ) : (
              <span className="font-bold text-gray-800">{formattedPrice}</span>
            )}
          </div>
          
          <Button size="sm" className="rounded-full w-9 h-9 p-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
