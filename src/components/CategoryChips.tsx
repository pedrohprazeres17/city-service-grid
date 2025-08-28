import { getCategorySlug } from "@/utils/filters";
import { Button } from "@/components/ui/button";

interface CategoryChipsProps {
  categories: Array<{ name: string; count: number }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  totalCount: number;
}

export const CategoryChips = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  totalCount 
}: CategoryChipsProps) => {
  return (
    <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant={activeCategory === "Todas" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("Todas")}
        className={`transition-smooth font-medium whitespace-nowrap ${
          activeCategory === "Todas" 
            ? "gradient-primary shadow-glow hover:shadow-glow text-white" 
            : "border-border bg-card hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        }`}
        aria-pressed={activeCategory === "Todas"}
      >
        Todas ({totalCount})
      </Button>
      
      {categories.map(({ name, count }) => (
        <Button
          key={name}
          variant={activeCategory === name ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(name)}
          className={`transition-smooth font-medium whitespace-nowrap ${
            activeCategory === name
              ? "gradient-primary shadow-glow hover:shadow-glow text-white"
              : `border-border bg-card hover:border-primary/30 hover:bg-primary/5 hover:text-primary category-${getCategorySlug(name)}`
          }`}
          aria-pressed={activeCategory === name}
        >
          <span className="flex items-center gap-1">
            {name} ({count})
          </span>
        </Button>
      ))}
    </div>
  );
};