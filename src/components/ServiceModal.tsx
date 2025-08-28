import { Service } from "@/types/service";
import { formatPrice, getCategorySlug } from "@/utils/filters";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Phone, MessageCircle } from "lucide-react";

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card shadow-glow border border-border rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-foreground">{service.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative aspect-video">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <Badge 
              className={`absolute top-4 right-4 category-${getCategorySlug(service.category)} text-sm font-medium`}
            >
              {service.category}
            </Badge>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-base">{service.location}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground text-base">{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-base">{service.reviews} avaliações</span>
                  </div>
                </div>
              </div>
              
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                {formatPrice(service.price)}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-xl text-foreground">Descrição do Serviço</h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {service.description}
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button className="flex-1 gradient-primary hover:shadow-glow transition-spring font-medium text-base py-3">
                <Phone className="w-5 h-5 mr-2" />
                Solicitar Orçamento
              </Button>
              <Button variant="outline" className="flex-1 border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-smooth text-base py-3">
                <MessageCircle className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};