import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Ban,
  DollarSign, 
  Truck, 
  ShieldCheck, 
  Clock,
  ArrowLeft
} from "lucide-react";

const Checkout = () => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  // Mock cart summary
  const cartSummary = {
    items: [
      {
        id: "1",
        name: "Adesivo Baby Yoda",
        price: 12.90,
        quantity: 2,
      },
      {
        id: "3",
        name: "Pacote Marvel Heroes",
        price: 29.90,
        quantity: 1,
        discount: 15,
      },
    ],
    subtotal: 55.70,
    discount: 4.49,
    shipping: 0,
    total: 51.21,
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi recebido e está sendo processado.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/cart" className="text-gray-500 hover:text-sticker-purple flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar ao Carrinho
            </Link>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Finalizar Compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-bold mb-4">Informações de Entrega</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="Seu nome" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" placeholder="Seu sobrenome" required />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Rua, Avenida, etc." required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input id="number" placeholder="123" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input id="complement" placeholder="Apto, Bloco, etc. (opcional)" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input id="neighborhood" placeholder="Seu bairro" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Sua cidade" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" placeholder="Seu estado" required />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-bold mb-4">Forma de Pagamento</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="credit-card" className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-sticker-purple" /> Cartão de Crédito
                        </Label>
                        {paymentMethod === "credit-card" && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <Label htmlFor="card-number">Número do Cartão</Label>
                              <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Validade (MM/AA)</Label>
                                <Input id="expiry" placeholder="MM/AA" required />
                              </div>
                              
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" required />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="card-name">Nome no Cartão</Label>
                              <Input id="card-name" placeholder="Como está escrito no cartão" required />
                            </div>
                            
                            <div>
                              <Label htmlFor="installments">Parcelas</Label>
                              <select
                                id="installments"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="1">1x de {formatCurrency(cartSummary.total)} (sem juros)</option>
                                <option value="2">2x de {formatCurrency(cartSummary.total / 2)} (sem juros)</option>
                                <option value="3">3x de {formatCurrency(cartSummary.total / 3)} (sem juros)</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="boleto" id="boleto" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="boleto" className="flex items-center">
                          <Ban className="h-5 w-5 mr-2 text-sticker-purple" /> Boleto Bancário
                        </Label>
                        {paymentMethod === "boleto" && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>O boleto será gerado após a confirmação do pedido e terá vencimento em 3 dias úteis.</p>
                            <p className="mt-2">O pedido será processado após a confirmação do pagamento.</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="pix" id="pix" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="pix" className="flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-sticker-purple" /> PIX
                        </Label>
                        {paymentMethod === "pix" && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Um QR Code PIX será gerado após a confirmação do pedido.</p>
                            <p className="mt-2">O pagamento será processado instantaneamente.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-bold mb-4">Observações do Pedido</h2>
                  
                  <div className="mb-4">
                    <Label htmlFor="notes">Alguma observação para o seu pedido?</Label>
                    <Textarea
                      id="notes"
                      placeholder="Instruções especiais para entrega, referências, etc."
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" required />
                    <div>
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal text-gray-600"
                      >
                        Li e concordo com os{" "}
                        <Link
                          to="/terms"
                          className="text-sticker-purple hover:underline"
                        >
                          Termos e Condições
                        </Link>{" "}
                        e{" "}
                        <Link
                          to="/privacy"
                          className="text-sticker-purple hover:underline"
                        >
                          Política de Privacidade
                        </Link>
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Finalizar Pedido
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {cartSummary.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-1">x{item.quantity}</span>
                      </div>
                      <span>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(cartSummary.subtotal)}</span>
                  </div>
                  
                  {cartSummary.discount > 0 && (
                    <div className="flex justify-between text-sticker-pink">
                      <span>Desconto</span>
                      <span>-{formatCurrency(cartSummary.discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>
                      {cartSummary.shipping === 0 ? (
                        <span className="text-green-600">Grátis</span>
                      ) : (
                        formatCurrency(cartSummary.shipping)
                      )}
                    </span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-lg">{formatCurrency(cartSummary.total)}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right mt-1">
                      Impostos incluídos
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-sticker-teal mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Envio Grátis</p>
                      <p className="text-gray-600">Para compras acima de R$ 100</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-sticker-teal mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Compra Segura</p>
                      <p className="text-gray-600">Seus dados estão protegidos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-sticker-teal mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Entrega Rápida</p>
                      <p className="text-gray-600">2-7 dias úteis após confirmação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
