export type Tamanho = 'Pequeno' | 'Médio' | 'Grande'
export type Embalagem = 'Lata' | 'Vidro' | 'Plástico'

export interface CategoriaUI {
  id?: number
  nome: string
  tamanho: Tamanho
  embalagem: Embalagem
}

export interface CategoriaCreateDTO {
  nome: string
  descricao?: string
}