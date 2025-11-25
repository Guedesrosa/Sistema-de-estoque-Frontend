/**
 * Servico de notificacoes Toast
 * Gerencia a exibicao de mensagens de notificacao na aplicacao
 * Permite enviar mensagens de sucesso, erro, info e aviso
 */
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

/**
 * Tipos de notificacao disponiveis
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning'

/**
 * Interface que define a estrutura de uma notificacao
 */
export interface Toast {
  message: string // Mensagem a ser exibida
  type: ToastType // Tipo da notificacao
}

/**
 * Servico singleton fornecido na raiz da aplicacao
 * Utiliza Subject do RxJS para emitir eventos de notificacao
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  // Stream de notificacoes que sera observado pelo componente ToastsComponent
  stream = new Subject<Toast>()
  
  /**
   * Envia uma notificacao de sucesso
   * @param message Mensagem a ser exibida
   */
  success(message: string) { this.stream.next({ message, type: 'success' }) }
  
  /**
   * Envia uma notificacao de erro
   * @param message Mensagem a ser exibida
   */
  error(message: string) { this.stream.next({ message, type: 'error' }) }
  
  /**
   * Envia uma notificacao informativa
   * @param message Mensagem a ser exibida
   */
  info(message: string) { this.stream.next({ message, type: 'info' }) }
  
  /**
   * Envia uma notificacao de aviso
   * @param message Mensagem a ser exibida
   */
  warning(message: string) { this.stream.next({ message, type: 'warning' }) }
}