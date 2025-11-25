/**
 * Componente de pagina de gerenciamento de produtos
 * Permite criar, editar, excluir produtos, realizar reajuste de precos em lote
 * Inclui paginacao, busca e indicadores visuais de status de estoque
 */
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ProductService } from './product.service'
import { ToastService } from '../shared/toasts/toast.service'
import { ProdutoDTO } from './product.model'
import { CategoryService } from '../categories/category.service'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  items: ProdutoDTO[] = []
  filtered: ProdutoDTO[] = []
  categorias: string[] = []
  page = 1
  pageSize = 10
  search = ''
  confirmOpen = false
  toDelete?: ProdutoDTO
  Math = Math
  form: any

  constructor(private fb: FormBuilder, private api: ProductService, private toast: ToastService, private cats: CategoryService) {
    this.form = this.fb.group({
      id: [null as number | null],
      nome: ['', Validators.required],
      precoUnitario: [0, [Validators.required, Validators.min(0.01)]],
      unidade: ['', Validators.required],
      quantidadeEstoque: [0, [Validators.required, Validators.min(0)]],
      quantidadeMinima: [0, [Validators.required, Validators.min(0)]],
      quantidadeMaxima: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    })
    this.load()
    this.cats.listar().subscribe(c => this.categorias = c.map(x => x.nome))
  }

  load() { this.api.listar().subscribe(d => { this.items = d; this.applyFilter() }) }
  applyFilter() {
    const q = this.search.toLowerCase()
    const base = this.items.filter(i => i.nome.toLowerCase().includes(q) || i.categoria.toLowerCase().includes(q))
    const start = (this.page - 1) * this.pageSize
    this.filtered = base.slice(start, start + this.pageSize)
  }
  salvar() {
    const v = this.form.value as ProdutoDTO
    if (!v.id) {
      this.api.adicionar(v).subscribe(() => { this.toast.success('Produto criado'); this.form.reset(); this.load() }, e => this.toast.error('Erro ao criar'))
    } else {
      this.api.editar(v.id, v).subscribe(() => { this.toast.success('Produto atualizado'); this.form.reset(); this.load() }, e => this.toast.error('Erro ao atualizar'))
    }
  }
  editar(item: ProdutoDTO) { this.form.setValue({
    id: item.id ?? null,
    nome: item.nome,
    precoUnitario: item.precoUnitario,
    unidade: item.unidade,
    quantidadeEstoque: item.quantidadeEstoque,
    quantidadeMinima: item.quantidadeMinima,
    quantidadeMaxima: item.quantidadeMaxima,
    categoria: item.categoria
  }) }
  pedirExclusao(item: ProdutoDTO) { this.toDelete = item; this.confirmOpen = true }
  confirmarExclusao() { if (this.toDelete?.id) { this.api.excluir(this.toDelete.id).subscribe(() => { this.toast.success('Produto excluído'); this.load() }, e => this.toast.error('Erro ao excluir')); this.confirmOpen = false } }
  cancelarExclusao() { this.confirmOpen = false }
  reajustar(percentual: number) { this.api.reajustar(percentual).subscribe(() => { this.toast.success('Reajuste aplicado'); this.load() }, e => this.toast.error('Erro no reajuste')) }
  getTotalPages(): number {
    return Math.ceil((this.items.length || 0) / this.pageSize)
  }
}