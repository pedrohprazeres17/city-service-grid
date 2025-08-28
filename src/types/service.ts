/**
 * ============================================================================
 * DEFINIÇÕES DE TIPOS E INTERFACES DO MARKETPLACE
 * ============================================================================
 * 
 * Este arquivo contém todas as definições TypeScript que definem a estrutura
 * dos dados utilizados no marketplace de serviços.
 */

/**
 * INTERFACE SERVICE - Estrutura de um serviço individual
 * ============================================================================
 * 
 * Define a estrutura completa de cada objeto serviço no array principal.
 * Todos os campos são obrigatórios exceto 'alt' que é opcional.
 * 
 * CAMPOS DETALHADOS:
 * - id: Chave primária única para identificar o serviço
 * - name: Nome do serviço exibido aos usuários
 * - description: Texto detalhado sobre o que o serviço oferece
 * - category: Deve corresponder a uma das categorias em /data/services.ts
 * - price: Valor monetário em reais (R$)
 * - rating: Avaliação de 0.0 a 5.0 (uma casa decimal)
 * - reviews: Contador de quantas pessoas avaliaram
 * - location: Onde o serviço é prestado (bairro, cidade)
 * - image: Caminho relativo para a imagem (/images/services/...)
 * - alt?: Texto alternativo para acessibilidade (opcional)
 * - popularity: Índice numérico para ordenação por popularidade (0-100)
 */
export interface Service {
  id: number;           // Identificador único - usado como chave em listas React
  name: string;         // Nome do serviço - usado em buscas e exibição
  description: string;  // Descrição completa - usado em buscas e modal
  category: string;     // Categoria - usado para filtros e agrupamento
  price: number;        // Preço em reais - usado para ordenação e exibição
  rating: number;       // Avaliação 0-5 - usado para exibição de estrelas
  reviews: number;      // Quantidade de avaliações - usado para credibilidade
  location: string;     // Localização - exibida nos cards
  image: string;        // Caminho da imagem - usado no <img src={...}>
  alt?: string;         // Texto alternativo - usado no <img alt={...}>
  popularity: number;   // Índice de popularidade - usado para ordenação
}

/**
 * TIPO SORTOPTION - Opções de ordenação disponíveis
 * ============================================================================
 * 
 * Define as três formas possíveis de ordenar os serviços:
 * - 'price-asc': Preço crescente (menor para maior)
 * - 'price-desc': Preço decrescente (maior para menor)  
 * - 'popularity': Por popularidade (mais popular primeiro)
 * 
 * Este tipo é usado no estado de filtros e nas funções de ordenação.
 */
export type SortOption = 'price-asc' | 'price-desc' | 'popularity';

/**
 * INTERFACE FILTERSTATE - Estado dos filtros do marketplace
 * ============================================================================
 * 
 * Define a estrutura do estado que controla todos os filtros aplicados:
 * - activeCategory: Categoria selecionada ("Todas" = sem filtro)
 * - searchTerm: Texto digitado na barra de busca
 * - sortBy: Como os resultados devem ser ordenados
 * 
 * Este estado é:
 * 1. Armazenado no localStorage (exceto searchTerm)
 * 2. Usado para filtrar e ordenar o array de serviços
 * 3. Sincronizado entre diferentes componentes via hook
 */
export interface FilterState {
  activeCategory: string;  // "Todas" ou uma categoria específica
  searchTerm: string;      // Texto da busca (não salvo no localStorage)
  sortBy: SortOption;      // Como ordenar os resultados
}