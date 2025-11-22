import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  message: string
  type: ToastType
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  stream = new Subject<Toast>()
  success(message: string) { this.stream.next({ message, type: 'success' }) }
  error(message: string) { this.stream.next({ message, type: 'error' }) }
  info(message: string) { this.stream.next({ message, type: 'info' }) }
  warning(message: string) { this.stream.next({ message, type: 'warning' }) }
}