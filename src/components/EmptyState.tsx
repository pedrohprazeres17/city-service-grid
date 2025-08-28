import { Search, Frown } from "lucide-react";

interface EmptyStateProps {
  searchTerm: string;
  activeCategory: string;
}

export const EmptyState = ({ searchTerm, activeCategory }: EmptyStateProps) => {
  const getMessage = () => {
    if (searchTerm && activeCategory !== "Todas") {
      return `Nenhum serviço encontrado para "${searchTerm}" em ${activeCategory}`;
    }
    if (searchTerm) {
      return `Nenhum serviço encontrado para "${searchTerm}"`;
    }
    if (activeCategory !== "Todas") {
      return `Nenhum serviço encontrado na categoria ${activeCategory}`;
    }
    return "Nenhum serviço encontrado";
  };

  const getSuggestion = () => {
    if (searchTerm) {
      return "Tente buscar por outros termos ou navegue pelas categorias disponíveis.";
    }
    return "Tente selecionar uma categoria diferente ou ajustar seus filtros.";
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-xl shadow-card border border-border">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {getMessage()}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        {getSuggestion()}
      </p>
      
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Sugestões:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Verifique a ortografia dos termos de busca</li>
          <li>• Use termos mais genéricos</li>
          <li>• Explore diferentes categorias</li>
        </ul>
      </div>
    </div>
  );
};