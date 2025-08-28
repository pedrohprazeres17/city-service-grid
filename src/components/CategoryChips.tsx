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
    <div className="flex flex-wrap gap-2">
      <Button
        variant={activeCategory === "Todas" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("Todas")}
        className={`transition-smooth font-medium ${
          activeCategory === "Todas" 
            ? "gradient-primary shadow-glow hover:shadow-glow" 
            : "border-border/50 hover:border-primary/50 hover:bg-primary/10"
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
          className={`transition-smooth font-medium ${
            activeCategory === name
              ? "gradient-primary shadow-glow hover:shadow-glow"
              : `border-border/50 hover:border-primary/50 hover:bg-primary/10 category-${getCategorySlug(name)}-hover`
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