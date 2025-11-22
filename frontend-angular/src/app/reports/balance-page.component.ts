import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-balance', templateUrl: './balance-page.component.html' })
export class BalancePageComponent {
  items: any[] = []
  total = 0
  constructor(private products: ProductService){
    this.products.listar().subscribe(d => {
      this.items = d.map(x => ({ nome: x.nome, quantidade: x.quantidadeEstoque, valorUnitario: x.precoUnitario, total: x.quantidadeEstoque * x.precoUnitario }))
      this.total = this.items.reduce((a,b)=>a+b.total,0)
    })
  }

  getMediaPorProduto(): number {
    return this.items.length > 0 ? this.total / this.items.length : 0
  }
}