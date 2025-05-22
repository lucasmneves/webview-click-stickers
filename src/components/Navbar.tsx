
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Dummy cart count for now
  
  const categories = [
    { name: "Pop", path: "/products/pop" },
    { name: "Geek", path: "/products/geek" },
    { name: "Personalizados", path: "/products/custom" },
    { name: "Decorativos", path: "/products/decorative" },
    { name: "Ofertas", path: "/products/offers" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-sticker-purple">
              Sticker<span className="text-sticker-teal">Mix</span>
            </h1>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex relative w-1/3">
            <Input
              type="search"
              placeholder="Buscar adesivos..."
              className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-sticker-purple focus:ring-sticker-purple"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-sticker-purple transition-colors" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
            <Link to="/account">
              <User className="h-6 w-6 text-gray-700 hover:text-sticker-purple transition-colors" />
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Cadastrar</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Category navigation - desktop */}
        <div className="hidden md:flex items-center justify-center mt-3 space-x-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-gray-600 hover:text-sticker-purple text-sm font-medium transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-in">
          <div className="px-4 py-3">
            <div className="relative mb-4">
              <Input
                type="search"
                placeholder="Buscar adesivos..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-gray-600 hover:text-sticker-purple py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/cart" className="flex items-center justify-between text-gray-600 hover:text-sticker-purple">
                  <span>Carrinho</span>
                  {cartCount > 0 && (
                    <Badge variant="destructive" className="rounded-full px-2 py-0.5">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
                <Link to="/account" className="text-gray-600 hover:text-sticker-purple">
                  Minha Conta
                </Link>
                <div className="flex space-x-2 pt-2">
                  <Link to="/login" className="w-1/2">
                    <Button variant="outline" className="w-full">Entrar</Button>
                  </Link>
                  <Link to="/signup" className="w-1/2">
                    <Button className="w-full">Cadastrar</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
