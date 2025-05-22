
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

const ProductListing = () => {
  const { category } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("featured");
  
  // Mock product data
  const allProducts: ProductCardProps[] = [
    {
      id: "1",
      name: "Teste 1",
      price: 12.90,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0aWNrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      category: "Geek",
      isNew: true,
    },
    {
      id: "2",
      name: "Conjunto de Flores",
      price: 15.90,
      image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3RpY2tlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      category: "Decorativos",
    },
    {
      id: "3",
      name: "Pacote Marvel Heroes",
      price: 29.90,
      image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3RpY2tlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      category: "Pop",
      isSale: true,
      discount: 15,
    },
    {
      id: "4",
      name: "Mapa Mundi Colorido",
      price: 19.90,
      image: "https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0aWNrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      category: "Decorativos",
    },
    {
      id: "5",
      name: "Pack Harry Potter",
      price: 34.90,
      image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhcnJ5JTIwcG90dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "Geek",
      isSale: true,
      discount: 20,
    },
    {
      id: "6",
      name: "Adesivos Vintage",
      price: 17.90,
      image: "https://images.unsplash.com/photo-1594115592991-dec448fa2836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbnRhZ2UlMjBzdGlja2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "Decorativos",
      isSale: true,
      discount: 10,
    },
    {
      id: "7",
      name: "Pack Games Retrô",
      price: 24.90,
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      category: "Geek",
      isSale: true,
      discount: 15,
    },
    {
      id: "8",
      name: "Conjunto Star Wars",
      price: 32.90,
      image: "https://images.unsplash.com/photo-1608889825249-95f00563e1e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhciUyMHdhcnMlMjB0b3lzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "Pop",
      isSale: true,
      discount: 25,
    },
  ];
  
  // Filter products based on category
  let products = allProducts;
  if (category && category !== "offers") {
    products = allProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  } else if (category === "offers") {
    products = allProducts.filter((product) => product.isSale);
  }
  
  // Filter products based on search query
  if (searchQuery) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Filter products based on price range
  products = products.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );
  
  // Sort products
  switch (sortBy) {
    case "price-low":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      products.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      products.sort((a, b) => (a.isNew ? -1 : 1));
      break;
    case "discount":
      products.sort((a, b) => {
        const discountA = a.discount || 0;
        const discountB = b.discount || 0;
        return discountB - discountA;
      });
      break;
    default:
      // Featured - default sorting
      break;
  }
  
  // Categories for filter
  const categories = [
    { id: "pop", name: "Pop" },
    { id: "geek", name: "Geek" },
    { id: "decorativos", name: "Decorativos" },
    { id: "personalizados", name: "Personalizados" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {category ? (
                category === "offers" ? "Ofertas Especiais" : `Adesivos ${category}`
              ) : (
                "Todos os Adesivos"
              )}
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile filter toggle */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? (
                  <>
                    <X className="mr-2 h-4 w-4" /> Fechar Filtros
                  </>
                ) : (
                  <>
                    <Filter className="mr-2 h-4 w-4" /> Filtrar Produtos
                  </>
                )}
              </Button>
            </div>
            
            {/* Filter sidebar */}
            <div className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white p-4 rounded-lg shadow-sm sticky top-20">
                <h2 className="font-bold text-lg mb-4">Filtros</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Buscar</h3>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Buscar adesivos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center">
                        <Checkbox id={cat.id} />
                        <Label htmlFor={cat.id} className="ml-2 text-sm font-normal cursor-pointer">
                          {cat.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Faixa de Preço</h3>
                  <Slider
                    defaultValue={[0, 50]}
                    max={50}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
                
                {/* More filter options */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Ofertas</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="on-sale" />
                      <Label htmlFor="on-sale" className="ml-2 text-sm font-normal cursor-pointer">
                        Em Promoção
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="new-arrivals" />
                      <Label htmlFor="new-arrivals" className="ml-2 text-sm font-normal cursor-pointer">
                        Novidades
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="md:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Mostrando {products.length} produtos
                </p>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="featured">Destaques</SelectItem>
                        <SelectItem value="price-low">Menor Preço</SelectItem>
                        <SelectItem value="price-high">Maior Preço</SelectItem>
                        <SelectItem value="newest">Novidades</SelectItem>
                        <SelectItem value="discount">Maior Desconto</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600 mb-4">
                    Tente ajustar seus filtros ou busque por algo diferente.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 50]);
                  }}>
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductListing;
