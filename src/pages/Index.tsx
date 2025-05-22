
import { Link } from "react-router-dom";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import CategoryPill from "@/components/CategoryPill";
import TestimonialCard from "@/components/TestimonialCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock data for featured products
  const featuredProducts = [
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
  ];

  // Mock data for sale products
  const saleProducts = [
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

  // Mock data for categories
  const categories = [
    {
      name: "Pop",
      path: "/products/pop",
      icon: "https://img.icons8.com/fluency/96/000000/pop-art.png",
      color: "bg-sticker-pink",
    },
    {
      name: "Geek",
      path: "/products/geek",
      icon: "https://img.icons8.com/fluency/96/000000/controller.png",
      color: "bg-sticker-purple",
    },
    {
      name: "Personalizados",
      path: "/products/custom",
      icon: "https://img.icons8.com/fluency/96/000000/pencil.png",
      color: "bg-sticker-teal",
    },
    {
      name: "Decorativos",
      path: "/products/decorative",
      icon: "https://img.icons8.com/fluency/96/000000/paint-palette.png",
      color: "bg-sticker-yellow",
    },
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      name: "Ana Silva",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "Os adesivos são de excelente qualidade! Já comprei várias vezes e sempre fico satisfeita. A entrega é rápida e o atendimento é ótimo.",
      rating: 5,
    },
    {
      name: "Marcelo Santos",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Personalizei adesivos para meu notebook e ficaram incríveis! O material é resistente e as cores são vibrantes. Recomendo!",
      rating: 5,
    },
    {
      name: "Camila Oliveira",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "Comprei para decorar meu quarto e adorei! Os adesivos são fáceis de aplicar e não deixam resíduos quando removidos.",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <HeroBanner
          title="Expressão em Cada Adesivo"
          subtitle="Adesivos únicos e personalizados para refletir sua personalidade e estilo. Decore, personalize e expresse-se!"
          buttonText="Ver Coleção"
          buttonLink="/products"
          backgroundImage="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        
        {/* Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Categorias
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryPill
                  key={category.name}
                  name={category.name}
                  path={category.path}
                  icon={category.icon}
                  color={category.color}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Destaques
              </h2>
              <Link to="/products">
                <Button variant="outline">Ver Todos</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Mid Banner - Promotion */}
        <section className="py-12 bg-sticker-teal text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Personalização Gratuita!
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Crie seus próprios adesivos personalizados. Envie suas imagens e nós transformamos em adesivos incríveis!
            </p>
            <Link to="/custom">
              <Button className="bg-white text-sticker-teal hover:bg-gray-100">
                Personalizar Agora
              </Button>
            </Link>
          </div>
        </section>
        
        {/* On Sale Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-sticker-pink">
                Ofertas Especiais
              </h2>
              <Link to="/products/offers">
                <Button variant="outline" className="text-sticker-pink border-sticker-pink hover:bg-sticker-pink/10">
                  Ver Todas as Ofertas
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              O Que Nossos Clientes Dizem
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
        
        {/* Features */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-sticker-purple/10 rounded-full p-4 inline-flex mb-4">
                  <svg className="w-8 h-8 text-sticker-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0v10l-8 4m-8-4V7m16 10l-8-4m-8 4l8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Envio Rápido</h3>
                <p className="text-gray-600">
                  Entregamos em todo o Brasil com rapidez e segurança.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-sticker-teal/10 rounded-full p-4 inline-flex mb-4">
                  <svg className="w-8 h-8 text-sticker-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Alta Qualidade</h3>
                <p className="text-gray-600">
                  Adesivos duráveis, resistentes à água e à prova de desbotamento.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-sticker-pink/10 rounded-full p-4 inline-flex mb-4">
                  <svg className="w-8 h-8 text-sticker-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Suporte Amigável</h3>
                <p className="text-gray-600">
                  Estamos sempre prontos para ajudar com suas dúvidas e necessidades.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
