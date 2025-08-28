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
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={getPlaceholder()}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-input/50 border-border/50 focus:border-primary/50 focus:bg-input transition-smooth"
      />
    </div>
  );
};