import { SortOption } from "@/types/service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortSelectProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortSelect = ({ sortBy, onSortChange }: SortSelectProps) => {
  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-[200px] bg-background border-border focus:border-primary focus:ring-primary/10 shadow-sm">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border shadow-lg">
        <SelectItem value="popularity" className="focus:bg-primary/10 focus:text-primary">
          Popularidade
        </SelectItem>
        <SelectItem value="price-asc" className="focus:bg-primary/10 focus:text-primary">
          Preço ↑
        </SelectItem>
        <SelectItem value="price-desc" className="focus:bg-primary/10 focus:text-primary">
          Preço ↓
        </SelectItem>
      </SelectContent>
    </Select>
  );
};