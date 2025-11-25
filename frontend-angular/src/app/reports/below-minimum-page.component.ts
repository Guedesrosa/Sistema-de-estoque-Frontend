/**
 * Componente de relatorio de produtos abaixo da quantidade minima
 * Filtra e exibe apenas produtos que estao com estoque abaixo do minimo configurado
 * Util para identificar produtos que necessitam reposicao urgente
 */
import { Component } from '@angular/core'
import { ProductService } from '../products/product.service'

@Component({ selector: 'app-below-minimum', templateUrl: './below-minimum-page.component.html' })
export class BelowMinimumPageComponent {
  items: any[] = [] // Lista de produtos abaixo do minimo
  
  constructor(private products: ProductService){
    // Filtra produtos com estoque abaixo da quantidade minima
    this.products.listar().subscribe(d => {
      this.items = d.filter(x => x.quantidadeEstoque < x.quantidadeMinima).map(x => ({ nome: x.nome, minima: x.quantidadeMinima, atual: x.quantidadeEstoque }))
    })
  }
}