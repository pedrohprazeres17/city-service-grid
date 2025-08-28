import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <div className="text-8xl font-bold gradient-primary bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-2xl font-bold">Página não encontrada</h1>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button 
            onClick={() => window.location.href = "/"}
            className="gradient-primary hover:shadow-glow transition-spring"
          >
            <Home className="w-4 h-4 mr-2" />
            Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
