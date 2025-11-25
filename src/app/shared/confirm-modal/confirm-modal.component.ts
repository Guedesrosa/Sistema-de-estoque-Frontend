/**
 * Componente modal de confirmacao reutilizavel
 * Permite exibir um modal para confirmar ou cancelar acoes
 * Utiliza Input/Output para comunicacao com componentes pais
 */
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  /** Controla se o modal esta aberto ou fechado */
  @Input() open = false
  
  /** Titulo do modal */
  @Input() title = 'Confirmar'
  
  /** Descricao/mensagem do modal */
  @Input() description = 'Deseja continuar?'
  
  /** Evento emitido quando o usuario confirma a acao */
  @Output() confirm = new EventEmitter<void>()
  
  /** Evento emitido quando o usuario cancela a acao */
  @Output() cancel = new EventEmitter<void>()
}