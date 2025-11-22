import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-below-minimum', templateUrl: './below-minimum-page.component.html' })
export class BelowMinimumPageComponent {
  items: any[] = []
  constructor(private products: ProductService){
    this.products.listar().subscribe(d => {
      this.items = d.filter(x => x.quantidadeEstoque < x.quantidadeMinima).map(x => ({ nome: x.nome, minima: x.quantidadeMinima, atual: x.quantidadeEstoque }))
    })
  }
}