export interface ProdutoDTO {
  id?: number
  nome: string
  precoUnitario: number
  unidade: string
  quantidadeEstoque: number
  quantidadeMinima: number
  quantidadeMaxima: number
  categoria: string
}