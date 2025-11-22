import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../shared/environment'
import { Observable } from 'rxjs'
import { MovimentacaoDTO } from './movement.model'

@Injectable({ providedIn: 'root' })
export class MovementService {
  private base = environment.apiUrl + '/api/movimentacoes'
  constructor(private http: HttpClient) {}
  listar(): Observable<any[]> { return this.http.get<any[]>(this.base) }
  criar(dto: MovimentacaoDTO): Observable<any> { return this.http.post<any>(this.base, dto) }
  atualizar(id: number, dto: MovimentacaoDTO): Observable<any> { return this.http.put<any>(`${this.base}/${id}`, dto) }
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`) }
}