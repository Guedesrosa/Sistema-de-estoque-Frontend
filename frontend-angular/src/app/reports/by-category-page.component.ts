/**
 * Componente de relatorio de quantidade de produtos por categoria
 * Agrupa produtos por categoria e exibe quantidade e percentual de cada uma
 * Utiliza barras de progresso visual para representar a distribuicao
 */
import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-by-category', templateUrl: './by-category-page.component.html' })
export class ByCategoryPageComponent {
  items: {categoria:string, quantidade:number}[] = [] // Lista de categorias com suas quantidades
  
  constructor(private products: ProductService){
    // Agrupa produtos por categoria e conta a quantidade
    this.products.listar().subscribe(d => {
      const map = new Map<string,number>()
      d.forEach(x => map.set(x.categoria, (map.get(x.categoria)||0)+1))
      this.items = Array.from(map.entries()).map(([categoria,quantidade])=>({categoria,quantidade}))
    })
  }

  /** Calcula o total de produtos em todas as categorias */
  getTotalProdutos(): number {
    return this.items.reduce((a, b) => a + b.quantidade, 0)
  }

  /** Calcula o percentual de uma categoria em relacao ao total */
  getPercentual(quantidade: number): number {
    const total = this.getTotalProdutos()
    return total > 0 ? (quantidade / total) * 100 : 0
  }

  /** Retorna a largura em percentual para a barra de progresso */
  getPercentualWidth(quantidade: number): number {
    return this.getPercentual(quantidade)
  }

  /** Retorna uma cor para a barra baseada no indice (alterna entre 3 cores) */
  getCorBarra(idx: number): string {
    if (idx % 3 === 0) return 'var(--primary)'
    if (idx % 3 === 1) return 'var(--success)'
    return 'var(--info)'
  }
}