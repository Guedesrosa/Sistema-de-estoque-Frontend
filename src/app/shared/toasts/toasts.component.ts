/**
 * Componente de exibicao de notificacoes Toast
 * Escuta eventos do ToastService e exibe as notificacoes na tela
 * Remove automaticamente as notificacoes apos 3 segundos
 */
import { Component } from '@angular/core'
import { ToastService, Toast } from './toast.service'

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent {
  // Lista de notificacoes a serem exibidas
  items: Toast[] = []
  
  constructor(private toasts: ToastService) {
    // Subscreve ao stream de notificacoes
    // Quando uma nova notificacao e emitida, adiciona na lista e remove apos 3 segundos
    this.toasts.stream.subscribe(t => {
      this.items = [...this.items, t] // Adiciona a nova notificacao
      setTimeout(() => { 
        this.items = this.items.slice(1) // Remove a primeira notificacao da fila
      }, 3000)
    })
  }
}