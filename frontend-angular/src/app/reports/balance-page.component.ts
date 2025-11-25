/**
 * Componente de relatorio de balanco fisico e financeiro
 * Exibe todos os produtos com quantidade em estoque, precos unitarios e valores totais
 * Calcula o valor total do estoque e a media por produto
 */
import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-balance', templateUrl: './balance-page.component.html' })
export class BalancePageComponent {
  items: any[] = [] // Lista de produtos com valores calculados
  total = 0 // Valor total do estoque
  
  constructor(private products: ProductService){
    // Carrega produtos e calcula valores totais
    this.products.listar().subscribe(d => {
      this.items = d.map(x => ({ nome: x.nome, quantidade: x.quantidadeEstoque, valorUnitario: x.precoUnitario, total: x.quantidadeEstoque * x.precoUnitario }))
      this.total = this.items.reduce((a,b)=>a+b.total,0)
    })
  }

  /** Calcula a media de valor por produto */
  getMediaPorProduto(): number {
    return this.items.length > 0 ? this.total / this.items.length : 0
  }
}