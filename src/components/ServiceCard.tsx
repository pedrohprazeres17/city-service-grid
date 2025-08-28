import { Service } from "@/types/service";
import { formatPrice, getCategorySlug } from "@/utils/filters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

export const ServiceCard = ({ service, onViewDetails }: ServiceCardProps) => {
  return (
    <Card className="group gradient-card shadow-card hover:shadow-hover transition-smooth border-border/50 overflow-hidden">
      <div className="relative">
        <img
          src={service.image}
          alt={service.alt || service.name}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className={`category-${getCategorySlug(service.category)} border text-xs font-medium`}
          >
            {service.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-smooth">
            {service.name}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{service.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Users className="w-3 h-3" />
                <span>{service.reviews}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="text-xl font-bold text-primary">
            {formatPrice(service.price)}
          </div>
          
          <Button 
            variant="default"
            size="sm"
            onClick={() => onViewDetails(service)}
            className="gradient-primary hover:shadow-glow transition-spring font-medium"
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};