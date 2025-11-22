import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { CategoryService } from './category.service'
import { ToastService } from '../shared/toasts/toast.service'
import { CategoriaUI, Tamanho, Embalagem } from './category.model'

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent {
  items: CategoriaUI[] = []
  filtered: CategoriaUI[] = []
  page = 1
  pageSize = 10
  search = ''
  confirmOpen = false
  toDelete?: CategoriaUI
  Math = Math

  tamanhos: Tamanho[] = ['Pequeno','Médio','Grande']
  embalagens: Embalagem[] = ['Lata','Vidro','Plástico']

  form: any

  constructor(private fb: FormBuilder, private api: CategoryService, private toast: ToastService) {
    this.form = this.fb.group({
      id: [null as number | null],
      nome: ['', Validators.required],
      tamanho: ['Médio', Validators.required],
      embalagem: ['Plástico', Validators.required]
    })
    this.load()
  }

  load() { this.api.listar().subscribe(d => { this.items = d; this.applyFilter() }) }
  applyFilter() {
    const q = this.search.toLowerCase()
    const base = this.items.filter(i => i.nome.toLowerCase().includes(q))
    const start = (this.page - 1) * this.pageSize
    this.filtered = base.slice(start, start + this.pageSize)
  }
  salvar() {
    const v = this.form.value as CategoriaUI
    if (!v.id) {
      this.api.criar(v).subscribe(() => { this.toast.success('Categoria criada'); this.form.reset(); this.load() }, e => this.toast.error('Erro ao criar'))
    } else {
      this.api.atualizar(v.id!, v).subscribe(() => { this.toast.success('Categoria atualizada'); this.form.reset(); this.load() }, e => this.toast.error('Erro ao atualizar'))
    }
  }
  editar(item: CategoriaUI) { this.form.setValue({ id: item.id ?? null, nome: item.nome, tamanho: item.tamanho, embalagem: item.embalagem }) }
  pedirExclusao(item: CategoriaUI) { this.toDelete = item; this.confirmOpen = true }
  confirmarExclusao() { if (this.toDelete?.id) { this.api.excluir(this.toDelete.id).subscribe(() => { this.toast.success('Categoria excluída'); this.load() }, e => this.toast.error('Erro ao excluir')); this.confirmOpen = false } }
  cancelarExclusao() { this.confirmOpen = false }
  getTotalPages(): number {
    return Math.ceil((this.items.length || 0) / this.pageSize)
  }
}