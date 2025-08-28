import { useState, useEffect, useMemo, useCallback } from "react";
import { Service, SortOption, FilterState } from "@/types/service";
import { getCategoriesWithCount, applyFilters } from "@/utils/filters";
import { services } from "@/data/services";

const STORAGE_KEY = "marketplace-filters";

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useMarketplace = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    activeCategory: "Todas",
    searchTerm: "",
    sortBy: "popularity"
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(filterState.searchTerm, 300);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        setFilterState(prev => ({ ...prev, ...parsedState }));
      } catch (error) {
        console.error("Error loading saved filters:", error);
      }
    }
  }, []);

  // Save state to localStorage (except search term for better UX)
  useEffect(() => {
    const stateToSave = {
      activeCategory: filterState.activeCategory,
      sortBy: filterState.sortBy
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [filterState.activeCategory, filterState.sortBy]);

  // Filtered and sorted services
  const filteredServices = useMemo(() => {
    return applyFilters(services, {
      category: filterState.activeCategory,
      search: debouncedSearchTerm,
      sortBy: filterState.sortBy
    });
  }, [filterState.activeCategory, debouncedSearchTerm, filterState.sortBy]);

  // Categories with counts (updated based on current search)
  const categoriesWithCount = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return getCategoriesWithCount(services);
    }
    
    // Filter services by search term first, then count categories
    const searchFiltered = services.filter(service =>
      service.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    return getCategoriesWithCount(searchFiltered);
  }, [debouncedSearchTerm]);

  // Filter handlers
  const setActiveCategory = useCallback((category: string) => {
    setFilterState(prev => ({ ...prev, activeCategory: category }));
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setFilterState(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const setSortBy = useCallback((sort: SortOption) => {
    setFilterState(prev => ({ ...prev, sortBy: sort }));
  }, []);

  // Modal handlers
  const openServiceModal = useCallback((service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  const closeServiceModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 200);
  }, []);

  return {
    // State
    filterState,
    filteredServices,
    categoriesWithCount,
    selectedService,
    isModalOpen,
    
    // Actions
    setActiveCategory,
    setSearchTerm,
    setSortBy,
    openServiceModal,
    closeServiceModal
  };
};