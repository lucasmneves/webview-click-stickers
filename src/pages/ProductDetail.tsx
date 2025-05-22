
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Minus, Plus, Star, ShoppingCart, Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedFinish, setSelectedFinish] = useState("matte");
  
  // Mock product data
  const product = {
    id,
    name: "Pack Marvel Heroes",
    price: 29.90,
    images: [
      "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3RpY2tlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1608889825271-3f5c75a3f911?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1608889825337-0328d8a4e881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ],
    discount: 15,
    isSale: true,
    description: "Pacote com 10 adesivos com tema de super-heróis da Marvel. Perfeito para decorar notebooks, cadernos, garrafas d'água e muito mais. Adesivos de alta qualidade, resistentes à água e raios UV.",
    features: [
      "Conjunto com 10 adesivos diferentes",
      "Tamanhos variados entre 5cm e 10cm",
      "Material vinil de alta qualidade",
      "Resistente à água e raios UV",
      "Fácil aplicação e remoção",
      "Não deixa resíduos quando removido",
    ],
    category: "Pop",
    stock: 15,
    sku: "MARVEL-10PK",
    finishes: [
      { id: "matte", name: "Fosco" },
      { id: "glossy", name: "Brilhante" },
      { id: "holographic", name: "Holográfico", extraPrice: 5 },
    ],
    sizes: [
      { id: "small", name: "Pequeno (5cm)", extraPrice: -5 },
      { id: "medium", name: "Médio (7.5cm)" },
      { id: "large", name: "Grande (10cm)", extraPrice: 5 },
    ],
    reviews: [
      {
        id: 1,
        user: "João Silva",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        date: "15/03/2023",
        content: "Adorei os adesivos! A qualidade é excelente e as cores são vibrantes. Todos os meus amigos já estão perguntando onde comprei.",
      },
      {
        id: 2,
        user: "Maria Oliveira",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        date: "02/04/2023",
        content: "Muito bom! O tamanho é perfeito para meu notebook e a qualidade do vinil é ótima. Só tirei uma estrela porque demorou um pouco para chegar.",
      },
      {
        id: 3,
        user: "Lucas Santos",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        date: "18/04/2023",
        content: "Simplesmente perfeito! Já é o segundo pack que compro, e a qualidade continua excelente. Recomendo a todos os fãs da Marvel.",
      },
    ],
  };
  
  // Mock related products
  const relatedProducts = [
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
  
  // Calculate current price
  const originalPrice = product.price;
  let currentPrice = product.isSale
    ? originalPrice - (originalPrice * (product.discount / 100))
    : originalPrice;
  
  // Add extra price for size
  const selectedSizeObj = product.sizes.find((size) => size.id === selectedSize);
  if (selectedSizeObj && selectedSizeObj.extraPrice) {
    currentPrice += selectedSizeObj.extraPrice;
  }
  
  // Add extra price for finish
  const selectedFinishObj = product.finishes.find((finish) => finish.id === selectedFinish);
  if (selectedFinishObj && selectedFinishObj.extraPrice) {
    currentPrice += selectedFinishObj.extraPrice;
  }
  
  // Format prices
  const formattedOriginalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(originalPrice);
  
  const formattedCurrentPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currentPrice);
  
  // Calculate average rating
  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
  
  const handleAddToCart = () => {
    toast({
      title: "Adicionado ao carrinho",
      description: `${quantity} x ${product.name} foi adicionado ao seu carrinho`,
    });
  };
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  // Image state
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-sticker-purple">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-sticker-purple">Produtos</Link>
            <span className="mx-2">/</span>
            <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-sticker-purple">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-sticker-purple" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews.length} avaliações)
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  SKU: {product.sku}
                </div>
              </div>
              
              <div className="mb-6">
                {product.isSale ? (
                  <div className="flex items-center">
                    <span className="text-gray-400 line-through text-lg mr-2">
                      {formattedOriginalPrice}
                    </span>
                    <span className="text-2xl font-bold text-sticker-pink">
                      {formattedCurrentPrice}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    {formattedCurrentPrice}
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Tamanho</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      className={`border rounded-md py-2 px-3 text-sm font-medium ${
                        selectedSize === size.id
                          ? "border-sticker-purple bg-sticker-purple/10 text-sticker-purple"
                          : "border-gray-300 text-gray-700 hover:border-sticker-purple/50"
                      }`}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      {size.name}
                      {size.extraPrice ? (
                        <span className="block text-xs mt-1">
                          {size.extraPrice > 0
                            ? `+R$ ${size.extraPrice.toFixed(2)}`
                            : `-R$ ${Math.abs(size.extraPrice).toFixed(2)}`}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Finish Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Acabamento</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish.id}
                      className={`border rounded-md py-2 px-3 text-sm font-medium ${
                        selectedFinish === finish.id
                          ? "border-sticker-purple bg-sticker-purple/10 text-sticker-purple"
                          : "border-gray-300 text-gray-700 hover:border-sticker-purple/50"
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      {finish.name}
                      {finish.extraPrice ? (
                        <span className="block text-xs mt-1">
                          +R$ {finish.extraPrice.toFixed(2)}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 text-gray-600 hover:text-sticker-purple"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1 font-medium">{quantity}</span>
                    <button
                      className="px-3 py-1 text-gray-600 hover:text-sticker-purple"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-600">
                    {product.stock} unidades disponíveis
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-sticker-pink text-sticker-pink hover:bg-sticker-pink/10"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <li className="flex items-center text-gray-600">
                    <svg className="mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Qualidade premium
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Entrega expressa
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Garantia de satisfação
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Suporte pós-venda
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start border-b">
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações ({product.reviews.length})</TabsTrigger>
                <TabsTrigger value="shipping">Envio e Devoluções</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Descrição</h3>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-gray-700">
                      Estes adesivos são feitos com materiais de alta qualidade, garantindo durabilidade e resistência. Perfeito para personalizar seus pertences e mostrar seu amor pelos heróis da Marvel.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Características</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Avaliações dos Clientes</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-lg font-semibold">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      Baseado em {product.reviews.length} avaliações
                    </span>
                  </div>
                  
                  <Button>Escrever uma Avaliação</Button>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="text-gray-500 text-sm">{review.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Informações de Envio</h3>
                    <p className="text-gray-700 mb-4">
                      Enviamos para todo o Brasil pelos Correios. O prazo de entrega varia de acordo com a sua localização:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Capitais: 2-4 dias úteis</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Interior: 4-7 dias úteis</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Frete grátis para compras acima de R$ 100,00</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Política de Devolução</h3>
                    <p className="text-gray-700 mb-4">
                      Aceitamos devoluções em até 7 dias após o recebimento do produto, desde que:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>O produto esteja em sua embalagem original</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Não tenha sido utilizado ou danificado</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-sticker-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Entre em contato com nosso suporte para iniciar o processo de devolução</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Você Também Pode Gostar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
