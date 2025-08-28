import { Service, SortOption } from "@/types/service";

export const getCategoriesWithCount = (services: Service[]) => {
  const categoryCount = services.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCount).map(([category, count]) => ({
    name: category,
    count
  }));
};

export const applyFilters = (
  services: Service[],
  { category, search, sortBy }: { category: string; search: string; sortBy: SortOption }
) => {
  let filtered = [...services];

  // Filter by category
  if (category !== "Todas") {
    filtered = filtered.filter(service => service.category === category);
  }

  // Filter by search term
  if (search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(service =>
      service.name.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort results
  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      filtered.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return filtered;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

export const getCategorySlug = (category: string) => {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};