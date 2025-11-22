import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() open = false
  @Input() title = 'Confirmar'
  @Input() description = 'Deseja continuar?'
  @Output() confirm = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
}