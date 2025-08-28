import { Search, Frown } from "lucide-react";

interface EmptyStateProps {
  searchTerm: string;
  activeCategory: string;
}

export const EmptyState = ({ searchTerm, activeCategory }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-2">
        {searchTerm ? (
          <Search className="w-8 h-8 text-muted-foreground" />
        ) : (
          <Frown className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Nenhum serviço encontrado</h3>
        <p className="text-muted-foreground max-w-md">
          {searchTerm ? (
            <>
              Não encontramos serviços para "{searchTerm}"
              {activeCategory !== "Todas" && ` em ${activeCategory}`}.
              <br />
              Tente ajustar sua busca ou categoria.
            </>
          ) : (
            <>
              Não há serviços disponíveis na categoria "{activeCategory}".
              <br />
              Experimente uma categoria diferente.
            </>
          )}
        </p>
      </div>
    </div>
  );
};