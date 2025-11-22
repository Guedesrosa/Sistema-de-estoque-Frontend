import { Component } from '@angular/core'
import { ToastService, Toast } from './toast.service'

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent {
  items: Toast[] = []
  constructor(private toasts: ToastService) {
    this.toasts.stream.subscribe(t => {
      this.items = [...this.items, t]
      setTimeout(() => { this.items = this.items.slice(1) }, 3000)
    })
  }
}