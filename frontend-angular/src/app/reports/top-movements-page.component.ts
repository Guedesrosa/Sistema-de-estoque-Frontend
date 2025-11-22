import { Component } from '@angular/core'
import { MovementService } from '../movements/movement.service'

@Component({ selector: 'app-top-movements', templateUrl: './top-movements-page.component.html' })
export class TopMovementsPageComponent {
  entrada?: {produto:string, quantidade:number}
  saida?: {produto:string, quantidade:number}
  constructor(private movements: MovementService){
    this.movements.listar().subscribe(d => {
      const sum = (tipo:string) => {
        const map = new Map<string,number>()
        d.filter(x => x.tipo===tipo).forEach(x => {
          const nome = x.produto?.nome || 'Desconhecido'
          map.set(nome, (map.get(nome)||0) + (x.quantidade||0))
        })
        const arr = Array.from(map.entries()).map(([produto,quantidade])=>({produto,quantidade}))
        return arr.sort((a,b)=>b.quantidade-a.quantidade)[0]
      }
      this.entrada = sum('ENTRADA')
      this.saida = sum('SAIDA')
    })
  }
}