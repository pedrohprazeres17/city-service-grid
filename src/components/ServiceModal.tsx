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
      <DialogContent className="max-w-2xl gradient-card shadow-glow border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{service.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img
              src={service.image}
              alt={service.alt || service.name}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
              decoding="async"
            />
            <Badge 
              className={`absolute top-3 right-3 category-${getCategorySlug(service.category)} border text-sm font-medium`}
            >
              {service.category}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{service.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{service.reviews} avaliações</span>
                  </div>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-primary">
                {formatPrice(service.price)}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Descrição do Serviço</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 gradient-primary hover:shadow-glow transition-spring font-medium">
                <Phone className="w-4 h-4 mr-2" />
                Ligar Agora
              </Button>
              <Button variant="outline" className="flex-1 border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-smooth">
                <MessageCircle className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};