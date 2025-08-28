import { SortOption } from "@/types/service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortSelectProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortSelect = ({ sortBy, onSortChange }: SortSelectProps) => {
  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px] bg-input/50 border-border/50 focus:border-primary/50">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border/50">
        <SelectItem value="popularity">Popularidade</SelectItem>
        <SelectItem value="price-asc">Preço ↑</SelectItem>
        <SelectItem value="price-desc">Preço ↓</SelectItem>
      </SelectContent>
    </Select>
  );
};