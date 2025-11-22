import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../shared/environment'
import { Observable } from 'rxjs'
import { CategoriaUI, CategoriaCreateDTO } from './category.model'

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private base = environment.apiUrl + '/api/categorias'
  constructor(private http: HttpClient) {}

  listar(): Observable<CategoriaUI[]> {
    return new Observable(sub => {
      this.http.get<any[]>(this.base).subscribe(items => {
        const mapped = items.map(it => this.parseBackendCategoria(it))
        sub.next(mapped)
        sub.complete()
      }, e => sub.error(e))
    })
  }

  criar(ui: CategoriaUI): Observable<any> {
    const dto: CategoriaCreateDTO = { nome: ui.nome, descricao: `Tamanho=${ui.tamanho};Embalagem=${ui.embalagem}` }
    return this.http.post<any>(this.base, dto)
  }

  atualizar(id: number, ui: CategoriaUI): Observable<any> {
    const dto: CategoriaCreateDTO = { nome: ui.nome, descricao: `Tamanho=${ui.tamanho};Embalagem=${ui.embalagem}` }
    return this.http.put<any>(`${this.base}/${id}`, dto)
  }

  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`) }

  private parseBackendCategoria(it: any): CategoriaUI {
    const d = (it.descricao || '') as string
    const tamanho = this.extractValue(d, 'Tamanho') as any || 'Médio'
    const embalagem = this.extractValue(d, 'Embalagem') as any || 'Plástico'
    return { id: it.id, nome: it.nome, tamanho, embalagem }
  }

  private extractValue(s: string, key: string): string | undefined {
    const m = s.split(';').map(p => p.trim()).find(p => p.startsWith(key+'='))
    return m ? m.split('=')[1] : undefined
  }
}