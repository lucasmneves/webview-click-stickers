
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  AlertCircle,
  Check,
  Truck
} from "lucide-react";

const Account = () => {
  const { toast } = useToast();
  
  // Mock user data
  const user = {
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    phone: "(11) 98765-4321",
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Jardim Primavera",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
  };
  
  // Mock orders
  const orders = [
    {
      id: "ORD-1234",
      date: "12/04/2023",
      status: "Entregue",
      total: 98.70,
      items: [
        { name: "Pacote Marvel Heroes", quantity: 1 },
        { name: "Adesivo Baby Yoda", quantity: 2 },
      ],
      statusHistory: [
        { date: "12/04/2023", status: "Pedido realizado" },
        { date: "13/04/2023", status: "Pagamento confirmado" },
        { date: "14/04/2023", status: "Em separação" },
        { date: "15/04/2023", status: "Enviado" },
        { date: "18/04/2023", status: "Entregue" },
      ],
    },
    {
      id: "ORD-1189",
      date: "23/03/2023",
      status: "Entregue",
      total: 64.50,
      items: [
        { name: "Conjunto Star Wars", quantity: 1 },
      ],
      statusHistory: [
        { date: "23/03/2023", status: "Pedido realizado" },
        { date: "24/03/2023", status: "Pagamento confirmado" },
        { date: "25/03/2023", status: "Em separação" },
        { date: "26/03/2023", status: "Enviado" },
        { date: "29/03/2023", status: "Entregue" },
      ],
    },
    {
      id: "ORD-1421",
      date: "05/05/2023",
      status: "Em trânsito",
      total: 32.80,
      items: [
        { name: "Adesivos Vintage", quantity: 1 },
        { name: "Conjunto de Flores", quantity: 1 },
      ],
      statusHistory: [
        { date: "05/05/2023", status: "Pedido realizado" },
        { date: "06/05/2023", status: "Pagamento confirmado" },
        { date: "07/05/2023", status: "Em separação" },
        { date: "08/05/2023", status: "Enviado" },
      ],
    },
  ];
  
  // Mock wishlist
  const wishlist = [
    {
      id: "5",
      name: "Pack Harry Potter",
      price: 34.90,
      image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhcnJ5JTIwcG90dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      discount: 20,
    },
    {
      id: "7",
      name: "Pack Games Retrô",
      price: 24.90,
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      discount: 15,
    },
  ];
  
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const handleUpdateProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso",
    });
  };
  
  const handleAddToCart = (id: string) => {
    toast({
      title: "Adicionado ao carrinho",
      description: "Item adicionado ao seu carrinho",
    });
  };
  
  const handleRemoveFromWishlist = (id: string) => {
    toast({
      title: "Removido da lista de desejos",
      description: "Item removido da sua lista de desejos",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <div className="flex-shrink-0 bg-sticker-purple/10 p-3 rounded-full mr-4">
              <User className="h-6 w-6 text-sticker-purple" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Minha Conta</h1>
              <p className="text-gray-600">Gerencie seus dados e pedidos</p>
            </div>
          </div>
          
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="w-full justify-start border-b bg-transparent p-0 mb-4">
              <TabsTrigger 
                value="orders" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-b-none"
              >
                <Package className="h-4 w-4 mr-2" /> Pedidos
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-b-none"
              >
                <User className="h-4 w-4 mr-2" /> Perfil
              </TabsTrigger>
              <TabsTrigger 
                value="wishlist" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-b-none"
              >
                <Heart className="h-4 w-4 mr-2" /> Lista de Desejos
              </TabsTrigger>
              <TabsTrigger 
                value="payment" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-b-none"
              >
                <CreditCard className="h-4 w-4 mr-2" /> Métodos de Pagamento
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-6 m-0">
              <h2 className="text-xl font-bold">Meus Pedidos</h2>
              
              {selectedOrder ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Voltar aos Pedidos
                    </Button>
                    
                    <div className="text-right">
                      <h3 className="font-medium">Pedido #{selectedOrder}</h3>
                      <p className="text-sm text-gray-600">
                        {orders.find((o) => o.id === selectedOrder)?.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-medium mb-4">Status do Pedido</h4>
                    <div className="relative">
                      <div className="overflow-hidden mb-4">
                        <div className="border-b-2 absolute w-full top-1/2 border-gray-200 z-0"></div>
                        <ul className="flex justify-between relative z-10">
                          {orders
                            .find((o) => o.id === selectedOrder)
                            ?.statusHistory.map((status, index) => {
                              const isCompleted = true; // For completed steps
                              const isCurrent = index === orders.find((o) => o.id === selectedOrder)?.statusHistory.length - 1;
                              
                              return (
                                <li key={index} className="flex flex-col items-center">
                                  <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                                    isCompleted
                                      ? isCurrent
                                        ? "bg-sticker-teal text-white"
                                        : "bg-sticker-purple text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}>
                                    {isCompleted ? (
                                      <Check className="h-5 w-5" />
                                    ) : (
                                      index + 1
                                    )}
                                  </div>
                                  <span className="text-xs mt-1 font-medium whitespace-nowrap">{status.status}</span>
                                  <span className="text-xs text-gray-500 whitespace-nowrap">{status.date}</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-medium mb-4">Itens do Pedido</h4>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Produto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantidade
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Preço
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders
                            .find((o) => o.id === selectedOrder)
                            ?.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {item.quantity}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  -
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm text-gray-600">Total do Pedido:</p>
                      <p className="text-lg font-bold">
                        {formatCurrency(orders.find((o) => o.id === selectedOrder)?.total || 0)}
                      </p>
                    </div>
                    
                    <div className="space-x-2">
                      <Button variant="outline">Solicitar Ajuda</Button>
                      <Button>Comprar Novamente</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">Pedido #{order.id}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "Entregue"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Em trânsito"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{order.date}</p>
                          <div className="mt-2 text-sm">
                            {order.items.map((item, index) => (
                              <span key={index}>
                                {item.quantity}x {item.name}
                                {index < order.items.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end">
                          <div className="md:mr-6 text-right">
                            <p className="text-sm text-gray-600">Total:</p>
                            <p className="font-bold">{formatCurrency(order.total)}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Progress for in-transit orders */}
                      {order.status === "Em trânsito" && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center">
                            <Truck className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <p className="text-sm font-medium">Em trânsito</p>
                              <p className="text-xs text-gray-500">Previsão de entrega: 12/05/2023</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6 m-0">
              <h2 className="text-xl font-bold">Meu Perfil</h2>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Informações Pessoais</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue={user.phone} />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Alterar Senha</Label>
                        <Input id="password" type="password" placeholder="Nova senha" />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirmar senha" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Endereço</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zip">CEP</Label>
                          <Input id="zip" defaultValue={user.address.zipCode} />
                        </div>
                        
                        <div>
                          <Label htmlFor="street">Rua</Label>
                          <Input id="street" defaultValue={user.address.street} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="number">Número</Label>
                          <Input id="number" defaultValue={user.address.number} />
                        </div>
                        
                        <div>
                          <Label htmlFor="complement">Complemento</Label>
                          <Input id="complement" defaultValue={user.address.complement} />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" defaultValue={user.address.neighborhood} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input id="city" defaultValue={user.address.city} />
                        </div>
                        
                        <div>
                          <Label htmlFor="state">Estado</Label>
                          <Input id="state" defaultValue={user.address.state} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleUpdateProfile}>Salvar Alterações</Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-medium mb-4">Privacidade e Preferências</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-600">
                        Receba novidades e ofertas exclusivas por e-mail
                      </p>
                    </div>
                    <Button variant="outline">Inscrito</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Excluir Conta</p>
                      <p className="text-sm text-gray-600">
                        Excluir permanentemente sua conta e todos os seus dados
                      </p>
                    </div>
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      Excluir Conta
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="wishlist" className="space-y-6 m-0">
              <h2 className="text-xl font-bold">Minha Lista de Desejos</h2>
              
              {wishlist.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="flex border rounded-md overflow-hidden">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="flex items-center mt-1">
                              {item.discount ? (
                                <>
                                  <span className="text-gray-400 line-through text-sm mr-2">
                                    {formatCurrency(item.price)}
                                  </span>
                                  <span className="font-bold text-sticker-pink">
                                    {formatCurrency(item.price - (item.price * item.discount) / 100)}
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold">{formatCurrency(item.price)}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-between mt-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="text-sm"
                            >
                              Remover
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleAddToCart(item.id)}
                              className="text-sm"
                            >
                              Adicionar ao Carrinho
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                    <Heart className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sua lista de desejos está vazia</h3>
                  <p className="text-gray-600 mb-6">
                    Adicione itens à sua lista de desejos enquanto navega pelos produtos
                  </p>
                  <Button>Explorar Produtos</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-6 m-0">
              <h2 className="text-xl font-bold">Métodos de Pagamento</h2>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Nenhum método de pagamento salvo</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Seus métodos de pagamento serão salvos automaticamente durante o checkout
                  </p>
                  <Button>Ir para a Loja</Button>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Segurança em primeiro lugar</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Seus dados de pagamento são sempre criptografados e armazenados com segurança. Nunca compartilhamos suas informações com terceiros.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
              <LogOut className="h-4 w-4 mr-2" /> Sair da Conta
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
