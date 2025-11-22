import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../shared/environment'
import { Observable } from 'rxjs'
import { ProdutoDTO } from './product.model'

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = environment.apiUrl + '/api/produtos'
  constructor(private http: HttpClient) {}
  listar(): Observable<ProdutoDTO[]> { return this.http.get<ProdutoDTO[]>(this.base) }
  adicionar(dto: ProdutoDTO): Observable<ProdutoDTO> { return this.http.post<ProdutoDTO>(this.base, dto) }
  editar(id: number, dto: ProdutoDTO): Observable<ProdutoDTO> { return this.http.put<ProdutoDTO>(`${this.base}/${id}`, dto) }
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`) }
  reajustar(percentual: number): Observable<void> { return this.http.post<void>(`${this.base}/reajuste/${percentual}`, {}) }
}