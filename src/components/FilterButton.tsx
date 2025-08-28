import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FilterButtonProps {
  categories: Array<{ name: string; count: number }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  totalCount: number;
}

export const FilterButton = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  totalCount 
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    onCategoryChange("Todas");
    setIsOpen(false);
  };

  const isFiltered = activeCategory !== "Todas";

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 font-medium transition-all duration-200
          ${isFiltered 
            ? "border-primary bg-primary/5 text-primary shadow-[0_6px_16px_rgba(255,138,0,0.15)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.25)]" 
            : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
          }
        `}
        aria-expanded={isOpen}
        aria-controls="filters-dropdown"
        aria-haspopup="listbox"
      >
        <Filter className="w-4 h-4" />
        <span>Filtros</span>
        {isFiltered && (
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        )}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div
          id="filters-dropdown"
          className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] bg-card border border-border/50 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/50">
            <h3 className="font-semibold text-foreground text-sm">
              Filtrar por categoria
            </h3>
          </div>

          {/* Categories List */}
          <div className="max-h-64 overflow-y-auto">
            <RadioGroup
              value={activeCategory}
              onValueChange={handleCategorySelect}
              className="p-2"
            >
              {/* Todas */}
              <div 
                className={`
                  flex items-center justify-between p-2 rounded-lg transition-colors duration-150 hover:bg-primary/5 cursor-pointer
                  ${activeCategory === "Todas" ? "bg-primary/10 ring-1 ring-primary/20" : ""}
                `}
                onClick={() => handleCategorySelect("Todas")}
                role="option"
                aria-selected={activeCategory === "Todas"}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Todas" id="categoria-todas" className="sr-only" />
                  <Label htmlFor="categoria-todas" className="font-medium text-foreground cursor-pointer">
                    Todas
                  </Label>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {totalCount}
                </Badge>
              </div>

              {/* Categories */}
              {categories.map(({ name, count }) => (
                <div
                  key={name}
                  className={`
                    flex items-center justify-between p-2 rounded-lg transition-colors duration-150 hover:bg-primary/5 cursor-pointer
                    ${activeCategory === name ? "bg-primary/10 ring-1 ring-primary/20" : ""}
                  `}
                  onClick={() => handleCategorySelect(name)}
                  role="option"
                  aria-selected={activeCategory === name}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={name} id={`categoria-${name}`} className="sr-only" />
                    <Label htmlFor={`categoria-${name}`} className="font-medium text-foreground cursor-pointer">
                      {name}
                    </Label>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {count}
                  </Badge>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Footer */}
          {isFiltered && (
            <div className="px-4 py-3 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="w-full justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};