/**
 * Componente de relatorio de top movimentacoes
 * Identifica o produto com maior quantidade de entradas e maior quantidade de saidas
 * Util para analise de movimentacao de estoque e identificacao de produtos mais movimentados
 */
import { Component } from '@angular/core'
import { MovementService } from '../movements/movement.service'

@Component({ selector: 'app-top-movements', templateUrl: './top-movements-page.component.html' })
export class TopMovementsPageComponent {
  entrada?: {produto:string, quantidade:number} // Produto com maior quantidade de entradas
  saida?: {produto:string, quantidade:number} // Produto com maior quantidade de saidas
  
  constructor(private movements: MovementService){
    // Processa movimentacoes e identifica os produtos com maior movimentacao
    this.movements.listar().subscribe(d => {
      // Funcao auxiliar para somar movimentacoes por produto e tipo
      const sum = (tipo:string) => {
        const map = new Map<string,number>()
        d.filter(x => x.tipo===tipo).forEach(x => {
          const nome = x.produto?.nome || 'Desconhecido'
          map.set(nome, (map.get(nome)||0) + (x.quantidade||0))
        })
        const arr = Array.from(map.entries()).map(([produto,quantidade])=>({produto,quantidade}))
        return arr.sort((a,b)=>b.quantidade-a.quantidade)[0] // Retorna o produto com maior quantidade
      }
      this.entrada = sum('ENTRADA')
      this.saida = sum('SAIDA')
    })
  }
}