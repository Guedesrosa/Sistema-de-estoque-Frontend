/**
 * Componente de relatorio de lista de precos
 * Exibe todos os produtos ordenados alfabeticamente com seus precos, unidades e categorias
 * Util para consulta rapida de precos e geracao de catalogo de produtos
 */
import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-price-list', templateUrl: './price-list-page.component.html' })
export class PriceListPageComponent {
  items: any[] = [] // Lista de produtos ordenados alfabeticamente
  
  constructor(private products: ProductService){ 
    // Carrega produtos e ordena alfabeticamente por nome
    this.products.listar().subscribe(d => this.items = [...d].sort((a,b)=>a.nome.localeCompare(b.nome))) 
  }
}