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
    <Card className="group bg-card shadow-card hover:shadow-hover transition-smooth border border-border overflow-hidden rounded-xl">
      <div className="relative aspect-video">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className={`category-${getCategorySlug(service.category)} text-xs font-medium`}
          >
            {service.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl leading-tight group-hover:text-primary transition-smooth line-clamp-2">
            {service.name}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
              <span>{service.location}</span>
            </div>
            
            <div className="flex items-center gap-3">
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

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            {formatPrice(service.price)}
          </div>
          
          <Button 
            variant="default"
            size="sm"
            onClick={() => onViewDetails(service)}
            className="gradient-primary hover:shadow-glow transition-spring font-medium px-6"
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};