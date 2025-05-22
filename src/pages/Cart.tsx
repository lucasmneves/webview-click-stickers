
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, X, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = () => {
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Teste",
      price: 12.90,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0aWNrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      quantity: 2,
      size: "Médio (7.5cm)",
      finish: "Fosco",
    },
    {
      id: "3",
      name: "Pacote Marvel Heroes",
      price: 29.90,
      image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3RpY2tlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      quantity: 1,
      size: "Grande (10cm)",
      finish: "Holográfico",
      discount: 15,
    },
  ]);
  
  // Calculate subtotal, discount, and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const discountAmount = cartItems.reduce(
    (total, item) => {
      if (item.discount) {
        return total + (item.price * item.quantity * item.discount) / 100;
      }
      return total;
    },
    0
  );
  
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    
    toast({
      title: "Item removido",
      description: "O item foi removido do seu carrinho",
    });
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Erro",
        description: "Por favor, insira um código de cupom",
        variant: "destructive",
      });
      return;
    }
    
    // Mock coupon validation
    if (couponCode === "STICKER10") {
      toast({
        title: "Cupom aplicado",
        description: "Desconto de 10% aplicado ao seu pedido",
      });
    } else {
      toast({
        title: "Cupom inválido",
        description: "O código de cupom inserido é inválido",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Seu Carrinho</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="hidden md:grid md:grid-cols-12 bg-gray-50 p-4 border-b">
                    <div className="md:col-span-6 font-medium">Produto</div>
                    <div className="md:col-span-2 font-medium text-center">Preço</div>
                    <div className="md:col-span-2 font-medium text-center">Quantidade</div>
                    <div className="md:col-span-2 font-medium text-center">Subtotal</div>
                  </div>
                  
                  {cartItems.map((item) => {
                    const itemSubtotal = item.price * item.quantity;
                    const itemDiscountedSubtotal = item.discount
                      ? itemSubtotal - (itemSubtotal * item.discount) / 100
                      : itemSubtotal;
                    
                    return (
                      <div key={item.id} className="p-4 border-b">
                        <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                          {/* Product Info */}
                          <div className="md:col-span-6 flex">
                            <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div>
                              <Link 
                                to={`/product/${item.id}`}
                                className="font-medium text-gray-800 hover:text-sticker-purple transition-colors"
                              >
                                {item.name}
                              </Link>
                              
                              <div className="text-sm text-gray-600 mt-1">
                                <div>Tamanho: {item.size}</div>
                                <div>Acabamento: {item.finish}</div>
                              </div>
                              
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-sm text-red-500 flex items-center mt-2 md:hidden"
                              >
                                <X className="w-4 h-4 mr-1" /> Remover
                              </button>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                            <div className="flex items-center justify-between md:block">
                              <div className="md:hidden font-medium">Preço:</div>
                              {item.discount ? (
                                <div>
                                  <span className="text-gray-400 line-through text-sm block">
                                    {formatCurrency(item.price)}
                                  </span>
                                  <span className="text-sticker-pink">
                                    {formatCurrency(item.price - (item.price * item.discount) / 100)}
                                  </span>
                                </div>
                              ) : (
                                <span>{formatCurrency(item.price)}</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Quantity */}
                          <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                            <div className="flex items-center justify-between md:justify-center">
                              <div className="md:hidden font-medium">Quantidade:</div>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  className="px-2 py-1 text-gray-600 hover:text-sticker-purple"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-2 py-1 min-w-[30px] text-center">{item.quantity}</span>
                                <button
                                  className="px-2 py-1 text-gray-600 hover:text-sticker-purple"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Subtotal */}
                          <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                            <div className="flex items-center justify-between md:block">
                              <div className="md:hidden font-medium">Subtotal:</div>
                              {item.discount ? (
                                <div>
                                  <span className="text-gray-400 line-through text-sm block">
                                    {formatCurrency(itemSubtotal)}
                                  </span>
                                  <span className="font-medium">
                                    {formatCurrency(itemDiscountedSubtotal)}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-medium">
                                  {formatCurrency(itemSubtotal)}
                                </span>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-xs text-red-500 hidden md:inline-flex items-center justify-center mt-2"
                            >
                              <X className="w-3 h-3 mr-1" /> Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex-1">
                    <Link to="/products">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Continuar Comprando
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex-1 sm:max-w-xs">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Código do cupom"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={handleApplyCoupon}>Aplicar</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sticker-pink">
                        <span>Desconto</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frete</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Grátis</span>
                        ) : (
                          formatCurrency(shipping)
                        )}
                      </span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-lg">{formatCurrency(total)}</span>
                      </div>
                      <div className="text-xs text-gray-500 text-right mt-1">
                        Impostos incluídos
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/checkout">
                    <Button className="w-full">
                      Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Métodos de Pagamento</h3>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-1 rounded">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
                      </div>
                      <div className="bg-gray-100 p-1 rounded">
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8" />
                      </div>
                      <div className="bg-gray-100 p-1 rounded">
                        <img src="https://img.icons8.com/color/48/000000/pix.png" alt="Pix" className="h-8" />
                      </div>
                      <div className="bg-gray-100 p-1 rounded">
                        <img src="https://img.icons8.com/color/48/000000/boleto-bankario.png" alt="Boleto" className="h-8" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-medium mb-3">Precisa de ajuda?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Nossos atendentes estão disponíveis de segunda a sexta, das 9h às 18h.
                  </p>
                  <Button variant="outline" className="w-full">
                    Fale Conosco
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-6 inline-flex mb-6">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Seu Carrinho está Vazio</h2>
              <p className="text-gray-600 mb-6">
                Parece que você ainda não adicionou nenhum adesivo ao seu carrinho.
              </p>
              <Link to="/products">
                <Button size="lg">
                  Explorar Adesivos
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
