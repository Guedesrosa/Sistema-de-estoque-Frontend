import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-price-list', templateUrl: './price-list-page.component.html' })
export class PriceListPageComponent {
  items: any[] = []
  constructor(private products: ProductService){ this.products.listar().subscribe(d => this.items = [...d].sort((a,b)=>a.nome.localeCompare(b.nome))) }
}