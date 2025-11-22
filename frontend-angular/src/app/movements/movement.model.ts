export type TipoMovimentacao = 'ENTRADA' | 'SAIDA'

export interface MovimentacaoDTO {
  id?: number
  produtoId: number
  data: string
  quantidade: number
  tipo: TipoMovimentacao
}