import { Service, SortOption } from "@/types/service";

/**
 * ============================================================================
 * UTILITÁRIOS PARA MANIPULAÇÃO DE ARRAYS E FILTROS
 * ============================================================================
 * 
 * Este arquivo contém funções puras que manipulam o array de serviços
 * para implementar funcionalidades de busca, filtro e ordenação.
 */

/**
 * FUNÇÃO: getCategoriesWithCount
 * ============================================================================
 * 
 * Recebe um array de serviços e retorna as categorias com contagem.
 * 
 * COMO FUNCIONA:
 * 1. REDUCE: Percorre o array services e conta quantos serviços existem em cada categoria
 *    - acc (acumulador): objeto que armazena { "categoria": contador }
 *    - service: cada serviço individual do array
 *    - Incrementa o contador da categoria ou inicia em 1 se não existir
 * 
 * 2. OBJECT.ENTRIES: Converte o objeto { "categoria": numero } em array de [categoria, numero]
 * 
 * 3. MAP: Transforma cada [categoria, numero] em objeto { name: categoria, count: numero }
 * 
 * EXEMPLO DE TRANSFORMAÇÃO:
 * Input: [{ category: "Pets" }, { category: "Pets" }, { category: "Casa" }]
 * Após reduce: { "Pets": 2, "Casa": 1 }
 * Após entries: [["Pets", 2], ["Casa", 1]]
 * Output final: [{ name: "Pets", count: 2 }, { name: "Casa", count: 1 }]
 */
export const getCategoriesWithCount = (services: Service[]) => {
  // REDUCE: Conta serviços por categoria criando um objeto contador
  const categoryCount = services.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // OBJECT.ENTRIES + MAP: Converte objeto contador em array de objetos estruturados
  return Object.entries(categoryCount).map(([category, count]) => ({
    name: category,
    count
  }));
};

/**
 * FUNÇÃO: applyFilters - Aplica todos os filtros e ordenação ao array
 * ============================================================================
 * 
 * Esta é a função principal que processa o array de serviços aplicando
 * todos os filtros em sequência: categoria → busca → ordenação
 * 
 * PARÂMETROS:
 * - services: Array original completo de serviços
 * - category: Categoria selecionada ("Todas" = sem filtro)
 * - search: Termo de busca digitado pelo usuário
 * - sortBy: Tipo de ordenação desejada
 * 
 * PROCESSO EM ETAPAS:
 * 1. Cria cópia do array original (spread operator [...services])
 * 2. Aplica filtro de categoria (se não for "Todas")
 * 3. Aplica filtro de busca textual (nome + descrição)
 * 4. Aplica ordenação conforme critério selecionado
 * 5. Retorna array processado
 */
export const applyFilters = (
  services: Service[],
  { category, search, sortBy }: { category: string; search: string; sortBy: SortOption }
) => {
  // SPREAD OPERATOR: Cria cópia para não modificar o array original
  let filtered = [...services];

  // FILTRO POR CATEGORIA
  // FILTER: Mantém apenas serviços da categoria selecionada
  if (category !== "Todas") {
    filtered = filtered.filter(service => service.category === category);
  }

  // FILTRO POR BUSCA TEXTUAL
  // FILTER + INCLUDES: Busca termo tanto no nome quanto na descrição
  if (search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(service =>
      service.name.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower)
    );
  }

  // ORDENAÇÃO DOS RESULTADOS
  // SORT: Reordena o array conforme critério selecionado
  switch (sortBy) {
    case 'price-asc':
      // SORT CRESCENTE: a.price - b.price (menor primeiro)
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      // SORT DECRESCENTE: b.price - a.price (maior primeiro)
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      // SORT POR POPULARIDADE: b.popularity - a.popularity (mais popular primeiro)
      filtered.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return filtered;
};

/**
 * FUNÇÃO: formatPrice - Formatação monetária brasileira
 * ============================================================================
 * 
 * Converte number em string formatada como moeda brasileira (R$).
 * 
 * INTL.NUMBERFORMAT: API nativa do JavaScript para formatação de números
 * - 'pt-BR': Localização brasileira (vírgula decimal, ponto milhares)
 * - style: 'currency': Formatar como moeda
 * - currency: 'BRL': Real brasileiro
 * 
 * EXEMPLO: formatPrice(150) → "R$ 150,00"
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

/**
 * FUNÇÃO: getCategorySlug - Gera slug para URLs a partir do nome da categoria
 * ============================================================================
 * 
 * Transforma nome de categoria em formato adequado para URLs.
 * 
 * PROCESSO EM ETAPAS:
 * 1. toLowerCase(): Converte para minúsculas
 * 2. normalize('NFD'): Decompõe caracteres acentuados
 * 3. replace(/[\u0300-\u036f]/g, ''): Remove os acentos decompostos
 * 4. replace(/[^a-z0-9]/g, ''): Remove caracteres especiais e espaços
 * 
 * EXEMPLO: "Beleza & Bem-estar" → "belezabemestar"
 */
export const getCategorySlug = (category: string) => {
  return category
    .toLowerCase()                           // "beleza & bem-estar"
    .normalize('NFD')                        // Decompor acentos
    .replace(/[\u0300-\u036f]/g, '')        // Remover acentos: "beleza & bem-estar"
    .replace(/[^a-z0-9]/g, '');             // Remover especiais: "belezabemestar"
};