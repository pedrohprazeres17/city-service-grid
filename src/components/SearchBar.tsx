import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeCategory: string;
}

export const SearchBar = ({ searchTerm, onSearchChange, activeCategory }: SearchBarProps) => {
  const getPlaceholder = () => {
    if (activeCategory === "Todas") {
      return "Busque por serviço...";
    }
    return `Busque em ${activeCategory}...`;
  };

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder={getPlaceholder()}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-12 pr-4 py-3 text-base bg-background border-border focus:border-primary focus:ring-primary/10 rounded-full shadow-sm"
        aria-label="Buscar serviços"
      />
    </div>
  );
};