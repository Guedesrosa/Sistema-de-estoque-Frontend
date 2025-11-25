/**
 * Componente de pagina de gerenciamento de categorias
 * Permite criar, editar, excluir e listar categorias com paginacao e busca
 */
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
  items: CategoriaUI[] = [] // Lista completa de categorias
  filtered: CategoriaUI[] = [] // Lista filtrada e paginada para exibicao
  page = 1 // Pagina atual
  pageSize = 10 // Itens por pagina
  search = '' // Termo de busca
  confirmOpen = false // Controla exibicao do modal de confirmacao
  toDelete?: CategoriaUI // Categoria selecionada para exclusao
  Math = Math // Disponibiliza Math no template

  // Opcoes disponiveis para os campos
  tamanhos: Tamanho[] = ['Pequeno','Médio','Grande']
  embalagens: Embalagem[] = ['Lata','Vidro','Plástico']

  form: any // Formulario reativo para cadastro/edicao

  constructor(private fb: FormBuilder, private api: CategoryService, private toast: ToastService) {
    // Inicializa o formulario com validacoes
    this.form = this.fb.group({
      id: [null as number | null],
      nome: ['', Validators.required],
      tamanho: ['Médio', Validators.required],
      embalagem: ['Plástico', Validators.required]
    })
    this.load()
  }

  /** Carrega a lista de categorias do servidor */
  load() { this.api.listar().subscribe(d => { this.items = d; this.applyFilter() }) }
  
  /** Aplica filtro de busca e paginacao na lista */
  applyFilter() {
    const q = this.search.toLowerCase()
    const base = this.items.filter(i => i.nome.toLowerCase().includes(q))
    const start = (this.page - 1) * this.pageSize
    this.filtered = base.slice(start, start + this.pageSize)
  }
  
  /** Salva ou atualiza uma categoria conforme o formulario tenha ID */
  salvar() {
    const v = this.form.value as CategoriaUI
    if (!v.id) {
      this.api.criar(v).subscribe(() => { this.toast.success('Categoria criada'); this.form.reset(); this.load() }, e => this.toast.error('Erro ao criar'))
    } else {
      this.api.atualizar(v.id!, v).subscribe(() => { this.toast.success('Categoria atualizada'); this.form.reset(); this.load() }, e => this.toast.error('Erro ao atualizar'))
    }
  }
  
  /** Preenche o formulario com os dados de uma categoria para edicao */
  editar(item: CategoriaUI) { this.form.setValue({ id: item.id ?? null, nome: item.nome, tamanho: item.tamanho, embalagem: item.embalagem }) }
  
  /** Abre o modal de confirmacao para exclusao */
  pedirExclusao(item: CategoriaUI) { this.toDelete = item; this.confirmOpen = true }
  
  /** Confirma e executa a exclusao da categoria */
  confirmarExclusao() { if (this.toDelete?.id) { this.api.excluir(this.toDelete.id).subscribe(() => { this.toast.success('Categoria excluída'); this.load() }, e => this.toast.error('Erro ao excluir')); this.confirmOpen = false } }
  
  /** Cancela a exclusao e fecha o modal */
  cancelarExclusao() { this.confirmOpen = false }
  
  /** Calcula o total de paginas baseado no numero de itens e tamanho da pagina */
  getTotalPages(): number {
    return Math.ceil((this.items.length || 0) / this.pageSize)
  }
}