
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu e-mail",
        variant: "destructive",
      });
      return;
    }
    
    // Mock form submission
    toast({
      title: "Sucesso!",
      description: "Obrigado por se inscrever em nossa newsletter!",
    });
    
    setEmail("");
  };

  return (
    <div className="bg-sticker-purple py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Receba ofertas exclusivas
          </h2>
          <p className="text-white/90 mb-6">
            Inscreva-se em nossa newsletter e receba cupons de desconto e novidades em primeira mão.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />
            <Button type="submit" className="bg-sticker-teal hover:bg-sticker-teal/90 text-white sm:min-w-[120px]">
              Inscrever
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
