/**
 * Modelo de dados de Produto
 * Interface que representa um produto no sistema de estoque
 */
export interface ProdutoDTO {
  id?: number // ID opcional do produto
  nome: string // Nome do produto
  precoUnitario: number // Preco unitario do produto
  unidade: string // Unidade de medida (kg, un, litro, etc)
  quantidadeEstoque: number // Quantidade atual em estoque
  quantidadeMinima: number // Quantidade minima para alerta
  quantidadeMaxima: number // Quantidade maxima do estoque
  categoria: string // Nome da categoria do produto
}