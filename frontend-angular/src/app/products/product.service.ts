/**
 * Servico de gerenciamento de produtos
 * Responsavel por todas as operacoes de comunicacao com a API relacionadas a produtos
 * Implementa CRUD completo e funcionalidade de reajuste de precos
 */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../shared/environment'
import { Observable } from 'rxjs'
import { ProdutoDTO } from './product.model'

@Injectable({ providedIn: 'root' })
export class ProductService {
  // URL base da API de produtos
  private base = environment.apiUrl + '/api/produtos'
  
  constructor(private http: HttpClient) {}
  
  /**
   * Lista todos os produtos cadastrados
   * @returns Observable com array de produtos
   */
  listar(): Observable<ProdutoDTO[]> { return this.http.get<ProdutoDTO[]>(this.base) }
  
  /**
   * Adiciona um novo produto
   * @param dto Objeto ProdutoDTO com os dados do produto
   * @returns Observable com o produto criado
   */
  adicionar(dto: ProdutoDTO): Observable<ProdutoDTO> { return this.http.post<ProdutoDTO>(this.base, dto) }
  
  /**
   * Edita um produto existente
   * @param id ID do produto a ser editado
   * @param dto Objeto ProdutoDTO com os novos dados
   * @returns Observable com o produto atualizado
   */
  editar(id: number, dto: ProdutoDTO): Observable<ProdutoDTO> { return this.http.put<ProdutoDTO>(`${this.base}/${id}`, dto) }
  
  /**
   * Exclui um produto
   * @param id ID do produto a ser excluido
   * @returns Observable vazio
   */
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`) }
  
  /**
   * Reajusta o preco de todos os produtos por um percentual
   * @param percentual Percentual de reajuste (ex: 10 para aumentar 10%)
   * @returns Observable vazio
   */
  reajustar(percentual: number): Observable<void> { return this.http.post<void>(`${this.base}/reajuste/${percentual}`, {}) }
}