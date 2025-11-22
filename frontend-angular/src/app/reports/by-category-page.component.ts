import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-by-category', templateUrl: './by-category-page.component.html' })
export class ByCategoryPageComponent {
  items: {categoria:string, quantidade:number}[] = []
  
  constructor(private products: ProductService){
    this.products.listar().subscribe(d => {
      const map = new Map<string,number>()
      d.forEach(x => map.set(x.categoria, (map.get(x.categoria)||0)+1))
      this.items = Array.from(map.entries()).map(([categoria,quantidade])=>({categoria,quantidade}))
    })
  }

  getTotalProdutos(): number {
    return this.items.reduce((a, b) => a + b.quantidade, 0)
  }

  getPercentual(quantidade: number): number {
    const total = this.getTotalProdutos()
    return total > 0 ? (quantidade / total) * 100 : 0
  }

  getPercentualWidth(quantidade: number): number {
    return this.getPercentual(quantidade)
  }

  getCorBarra(idx: number): string {
    if (idx % 3 === 0) return 'var(--primary)'
    if (idx % 3 === 1) return 'var(--success)'
    return 'var(--info)'
  }
}