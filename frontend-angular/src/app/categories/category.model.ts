/**
 * Modelos e tipos relacionados a Categorias
 * Define as estruturas de dados usadas para gerenciar categorias no sistema
 */

/**
 * Tipo que define os tamanhos disponiveis para categorias
 */
export type Tamanho = 'Pequeno' | 'Médio' | 'Grande'

/**
 * Tipo que define os tipos de embalagem disponiveis para categorias
 */
export type Embalagem = 'Lata' | 'Vidro' | 'Plástico'

/**
 * Interface que representa uma categoria na interface do usuario
 * Utilizada para exibicao e manipulacao de dados de categorias
 */
export interface CategoriaUI {
  id?: number // ID opcional da categoria
  nome: string // Nome da categoria
  tamanho: Tamanho // Tamanho da categoria
  embalagem: Embalagem // Tipo de embalagem da categoria
}

/**
 * Interface para criacao de categorias no backend
 * Utilizada para enviar dados ao servidor ao criar ou atualizar categorias
 */
export interface CategoriaCreateDTO {
  nome: string // Nome da categoria
  descricao?: string // Descricao opcional (armazena tamanho e embalagem em formato string)
}