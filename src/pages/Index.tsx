import React from "react";
import { useMarketplace } from "@/hooks/useMarketplace";
import { ServiceCard } from "@/components/ServiceCard";
import { CategoryChips } from "@/components/CategoryChips";
import { SearchBar } from "@/components/SearchBar";
import { SortSelect } from "@/components/SortSelect";
import { ServiceModal } from "@/components/ServiceModal";
import { EmptyState } from "@/components/EmptyState";
import { services } from "@/data/services";

const Index = () => {
  const {
    filterState,
    filteredServices,
    categoriesWithCount,
    selectedService,
    isModalOpen,
    setActiveCategory,
    setSearchTerm,
    setSortBy,
    openServiceModal,
    closeServiceModal
  } = useMarketplace();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Marketplace de Serviços Locais
            </h1>
            <p className="text-muted-foreground text-lg">
              Encontre os melhores profissionais da sua região
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Control Bar */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar
                searchTerm={filterState.searchTerm}
                onSearchChange={setSearchTerm}
                activeCategory={filterState.activeCategory}
              />
            </div>
            
            <SortSelect
              sortBy={filterState.sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <CategoryChips
            categories={categoriesWithCount}
            activeCategory={filterState.activeCategory}
            onCategoryChange={setActiveCategory}
            totalCount={services.length}
          />
        </section>

        {/* Results Counter */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Exibindo <span className="font-semibold text-foreground">{filteredServices.length}</span> serviço{filteredServices.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Services Grid */}
        <section>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-in slide-in-from-bottom duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ServiceCard
                    service={service}
                    onViewDetails={openServiceModal}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              searchTerm={filterState.searchTerm}
              activeCategory={filterState.activeCategory}
            />
          )}
        </section>
      </main>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeServiceModal}
      />
    </div>
  );
};

export default Index;
