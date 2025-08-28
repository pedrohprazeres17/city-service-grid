import { useState, useEffect, useMemo, useCallback } from "react";
import { Service, SortOption, FilterState } from "@/types/service";
import { getCategoriesWithCount, applyFilters } from "@/utils/filters";
import { services } from "@/data/services";

/**
 * ============================================================================
 * HOOK PRINCIPAL DO MARKETPLACE - useMarketplace
 * ============================================================================
 * 
 * Este hook gerencia todo o estado e lógica do marketplace, incluindo:
 * - Estado dos filtros (categoria, busca, ordenação)
 * - Processamento dinâmico do array de serviços
 * - Modal de detalhes do serviço
 * - Persistência no localStorage
 * - Otimizações de performance
 */

const STORAGE_KEY = "marketplace-filters";

/**
 * HOOK AUXILIAR: useDebounce
 * ============================================================================
 * 
 * Implementa debounce para otimizar a busca em tempo real.
 * 
 * COMO FUNCIONA:
 * 1. Recebe um valor (searchTerm) e um delay (300ms)
 * 2. Só atualiza o valor retornado após o delay especificado
 * 3. Se o valor mudar antes do delay, reinicia o timer
 * 4. Evita executar filtros a cada tecla digitada
 * 
 * BENEFÍCIO: Melhora performance evitando filtros excessivos durante digitação
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Define timer para atualizar valor após delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancela timer anterior se valor mudar
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * HOOK PRINCIPAL: useMarketplace
 * ============================================================================
 */
export const useMarketplace = () => {
  /**
   * ESTADO DOS FILTROS
   * ========================================================================
   * 
   * filterState: Objeto que controla todos os filtros aplicados
   * - activeCategory: Categoria selecionada (padrão: "Todas")
   * - searchTerm: Texto digitado na busca (padrão: vazio)
   * - sortBy: Ordenação selecionada (padrão: "popularity")
   */
  const [filterState, setFilterState] = useState<FilterState>({
    activeCategory: "Todas",
    searchTerm: "",
    sortBy: "popularity"
  });

  /**
   * ESTADO DO MODAL
   * ========================================================================
   * 
   * selectedService: Serviço selecionado para exibir detalhes (null = nenhum)
   * isModalOpen: Controla se o modal está aberto ou fechado
   */
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * DEBOUNCE DA BUSCA
   * ========================================================================
   * 
   * Aplica debounce de 300ms ao termo de busca para otimizar performance.
   * O filtro só executa 300ms após o usuário parar de digitar.
   */
  const debouncedSearchTerm = useDebounce(filterState.searchTerm, 300);

  /**
   * EFEITO: Carregamento do localStorage
   * ========================================================================
   * 
   * Executa apenas na montagem do componente para restaurar filtros salvos.
   * Só carrega activeCategory e sortBy (searchTerm não é persistido para melhor UX).
   */
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

  /**
   * EFEITO: Salvamento no localStorage
   * ========================================================================
   * 
   * Salva automaticamente mudanças nos filtros (exceto searchTerm).
   * Executa sempre que activeCategory ou sortBy mudarem.
   * 
   * MOTIVO para não salvar searchTerm: 
   * - Melhor UX (usuário não quer busca anterior ao voltar)
   * - Evita poluir localStorage com termos temporário
   */
  useEffect(() => {
    const stateToSave = {
      activeCategory: filterState.activeCategory,
      sortBy: filterState.sortBy
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [filterState.activeCategory, filterState.sortBy]);

  /**
   * COMPUTED: Array de serviços filtrados
   * ========================================================================
   * 
   * USEMEMO: Recalcula apenas quando dependências mudam, evitando processamento desnecessário.
   * 
   * PROCESSAMENTO:
   * 1. Aplica filtro de categoria
   * 2. Aplica filtro de busca (usando valor debounced)
   * 3. Aplica ordenação
   * 
   * DEPENDÊNCIAS: activeCategory, debouncedSearchTerm, sortBy
   * RESULTADO: Array filtrado e ordenado pronto para exibição
   */
  const filteredServices = useMemo(() => {
    return applyFilters(services, {
      category: filterState.activeCategory,
      search: debouncedSearchTerm,
      sortBy: filterState.sortBy
    });
  }, [filterState.activeCategory, debouncedSearchTerm, filterState.sortBy]);

  /**
   * COMPUTED: Categorias com contagem dinâmica
   * ========================================================================
   * 
   * USEMEMO: Recalcula contagem de categorias baseada no termo de busca atual.
   * 
   * LÓGICA CONDICIONAL:
   * - SEM busca: Conta todos os serviços por categoria
   * - COM busca: Primeiro filtra por busca, depois conta por categoria
   * 
   * RESULTADO: Array de objetos { name: "categoria", count: número }
   * EXEMPLO: [{ name: "Pets", count: 12 }, { name: "Casa & Limpeza", count: 5 }]
   */
  const categoriesWithCount = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      // Sem busca: conta todos os serviços
      return getCategoriesWithCount(services);
    }
    
    // Com busca: filtra primeiro, depois conta
    const searchFiltered = services.filter(service =>
      service.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    return getCategoriesWithCount(searchFiltered);
  }, [debouncedSearchTerm]);

  /**
   * HANDLERS DE FILTROS
   * ========================================================================
   * 
   * USECALLBACK: Memoriza funções para evitar re-renderizações desnecessárias
   * dos componentes filhos que recebem essas funções como props.
   */
  
  const setActiveCategory = useCallback((category: string) => {
    setFilterState(prev => ({ ...prev, activeCategory: category }));
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setFilterState(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const setSortBy = useCallback((sort: SortOption) => {
    setFilterState(prev => ({ ...prev, sortBy: sort }));
  }, []);

  /**
   * HANDLERS DO MODAL
   * ========================================================================
   */
  
  const openServiceModal = useCallback((service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  const closeServiceModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay para permitir animação de fechamento
    setTimeout(() => setSelectedService(null), 200);
  }, []);

  /**
   * RETORNO DO HOOK
   * ========================================================================
   * 
   * Organizado em duas seções:
   * - State: Estados computados e valores atuais
   * - Actions: Funções para modificar o estado
   */
  return {
    // ESTADO E DADOS COMPUTADOS
    filterState,           // Estado atual dos filtros
    filteredServices,      // Array de serviços processados (filtrado + ordenado)
    categoriesWithCount,   // Categorias com contagem dinâmica
    selectedService,       // Serviço selecionado no modal
    isModalOpen,          // Estado do modal (aberto/fechado)
    
    // AÇÕES/HANDLERS
    setActiveCategory,     // Muda categoria ativa
    setSearchTerm,        // Atualiza termo de busca
    setSortBy,            // Muda ordenação
    openServiceModal,     // Abre modal com serviço
    closeServiceModal     // Fecha modal
  };
};