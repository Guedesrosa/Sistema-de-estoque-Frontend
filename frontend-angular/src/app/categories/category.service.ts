/**
 * Servico de gerenciamento de categorias
 * Responsavel por todas as operacoes de comunicacao com a API relacionadas a categorias
 * Implementa CRUD completo e conversao entre formatos de dados do backend e frontend
 */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../shared/environment'
import { Observable } from 'rxjs'
import { CategoriaUI, CategoriaCreateDTO } from './category.model'

@Injectable({ providedIn: 'root' })
export class CategoryService {
  // URL base da API de categorias
  private base = environment.apiUrl + '/api/categorias'
  
  constructor(private http: HttpClient) {}

  /**
   * Lista todas as categorias cadastradas
   * Converte os dados do backend para o formato CategoriaUI
   * @returns Observable com array de categorias
   */
  listar(): Observable<CategoriaUI[]> {
    return new Observable(sub => {
      this.http.get<any[]>(this.base).subscribe(items => {
        const mapped = items.map(it => this.parseBackendCategoria(it))
        sub.next(mapped)
        sub.complete()
      }, e => sub.error(e))
    })
  }

  /**
   * Cria uma nova categoria
   * Converte CategoriaUI para CategoriaCreateDTO antes de enviar ao backend
   * @param ui Objeto CategoriaUI com os dados da categoria
   * @returns Observable com a resposta do servidor
   */
  criar(ui: CategoriaUI): Observable<any> {
    const dto: CategoriaCreateDTO = { nome: ui.nome, descricao: `Tamanho=${ui.tamanho};Embalagem=${ui.embalagem}` }
    return this.http.post<any>(this.base, dto)
  }

  /**
   * Atualiza uma categoria existente
   * @param id ID da categoria a ser atualizada
   * @param ui Objeto CategoriaUI com os novos dados
   * @returns Observable com a resposta do servidor
   */
  atualizar(id: number, ui: CategoriaUI): Observable<any> {
    const dto: CategoriaCreateDTO = { nome: ui.nome, descricao: `Tamanho=${ui.tamanho};Embalagem=${ui.embalagem}` }
    return this.http.put<any>(`${this.base}/${id}`, dto)
  }

  /**
   * Exclui uma categoria
   * @param id ID da categoria a ser excluida
   * @returns Observable vazio
   */
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`) }

  /**
   * Converte dados do backend para CategoriaUI
   * Extrai tamanho e embalagem da descricao que vem do backend
   * @param it Objeto retornado pela API
   * @returns Objeto CategoriaUI convertido
   */
  private parseBackendCategoria(it: any): CategoriaUI {
    const d = (it.descricao || '') as string
    const tamanho = this.extractValue(d, 'Tamanho') as any || 'Médio'
    const embalagem = this.extractValue(d, 'Embalagem') as any || 'Plástico'
    return { id: it.id, nome: it.nome, tamanho, embalagem }
  }

  /**
   * Extrai um valor de uma string no formato "chave=valor;chave2=valor2"
   * @param s String com os valores
   * @param key Chave a ser buscada
   * @returns Valor encontrado ou undefined
   */
  private extractValue(s: string, key: string): string | undefined {
    const m = s.split(';').map(p => p.trim()).find(p => p.startsWith(key+'='))
    return m ? m.split('=')[1] : undefined
  }
}