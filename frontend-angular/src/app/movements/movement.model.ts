/**
 * Modelos relacionados a Movimentacoes de Estoque
 * Define as estruturas de dados para registro de entradas e saidas de produtos
 */

/**
 * Tipo que define os tipos de movimentacao disponiveis
 */
export type TipoMovimentacao = 'ENTRADA' | 'SAIDA'

/**
 * Interface que representa uma movimentacao de estoque
 */
export interface MovimentacaoDTO {
  id?: number // ID opcional da movimentacao
  produtoId: number // ID do produto que foi movimentado
  data: string // Data da movimentacao (formato ISO string)
  quantidade: number // Quantidade movimentada
  tipo: TipoMovimentacao // Tipo da movimentacao (ENTRADA ou SAIDA)
}