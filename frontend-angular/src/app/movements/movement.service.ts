/**
 * Servico de gerenciamento de movimentacoes de estoque
 * Responsavel por todas as operacoes de comunicacao com a API relacionadas a movimentacoes
 * Implementa CRUD completo para registro de entradas e saidas de produtos
 */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../shared/environment'
import { Observable } from 'rxjs'
import { MovimentacaoDTO } from './movement.model'

@Injectable({ providedIn: 'root' })
export class MovementService {
  // URL base da API de movimentacoes
  private base = environment.apiUrl + '/api/movimentacoes'
  
  constructor(private http: HttpClient) {}
  
  /**
   * Lista todas as movimentacoes registradas
   * @returns Observable com array de movimentacoes
   */
  listar(): Observable<any[]> { return this.http.get<any[]>(this.base) }
  
  /**
   * Registra uma nova movimentacao (entrada ou saida)
   * @param dto Objeto MovimentacaoDTO com os dados da movimentacao
   * @returns Observable com a movimentacao criada
   */
  criar(dto: MovimentacaoDTO): Observable<any> { return this.http.post<any>(this.base, dto) }
  
  /**
   * Atualiza uma movimentacao existente
   * @param id ID da movimentacao a ser atualizada
   * @param dto Objeto MovimentacaoDTO com os novos dados
   * @returns Observable com a movimentacao atualizada
   */
  atualizar(id: number, dto: MovimentacaoDTO): Observable<any> { return this.http.put<any>(`${this.base}/${id}`, dto) }
  
  /**
   * Exclui uma movimentacao
   * @param id ID da movimentacao a ser excluida
   * @returns Observable vazio
   */
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`) }
}