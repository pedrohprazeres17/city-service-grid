export interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  popularity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'popularity';

export interface FilterState {
  activeCategory: string;
  searchTerm: string;
  sortBy: SortOption;
}