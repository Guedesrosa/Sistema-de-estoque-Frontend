/**
 * Componente de pagina de registro de movimentacoes de estoque
 * Permite registrar entradas e saidas de produtos com validacao de limites
 * Exibe alertas quando estoque ficara abaixo do minimo ou acima do maximo
 */
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MovementService } from './movement.service'
import { ProductService } from '../products/product.service'
import { ToastService } from '../shared/toasts/toast.service'

@Component({
  selector: 'app-movements-page',
  templateUrl: './movements-page.component.html',
  styleUrls: ['./movements-page.component.css']
})
export class MovementsPageComponent {
  items: any[] = []
  produtos: {id:number,nome:string,quantidadeEstoque:number,quantidadeMinima:number,quantidadeMaxima:number}[] = []
  filtered: any[] = []
  page = 1
  pageSize = 10
  search = ''
  Math = Math
  form: any

  constructor(private fb: FormBuilder, private api: MovementService, private products: ProductService, private toast: ToastService) {
    this.form = this.fb.group({
      produtoId: [null, Validators.required],
      data: [new Date().toISOString().slice(0,10), Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      tipo: ['ENTRADA', Validators.required]
    })
    this.load()
    this.products.listar().subscribe(p => this.produtos = p.map(x => ({ id: x.id!, nome: x.nome, quantidadeEstoque: x.quantidadeEstoque, quantidadeMinima: x.quantidadeMinima, quantidadeMaxima: x.quantidadeMaxima })))
  }

  load() { this.api.listar().subscribe(d => { this.items = d; this.applyFilter() }) }
  applyFilter() {
    const q = this.search.toLowerCase()
    const base = this.items.filter(i => (i.produto?.nome || '').toLowerCase().includes(q))
    const start = (this.page - 1) * this.pageSize
    this.filtered = base.slice(start, start + this.pageSize)
  }

  getProdutoSelecionado() {
    const produtoId = this.form.value.produtoId
    return produtoId ? this.produtos.find(p => p.id === produtoId) : null
  }

  getEstoqueAposMovimentacao(): number {
    const produto = this.getProdutoSelecionado()
    const quantidade = this.form.value.quantidade || 0
    const tipo = this.form.value.tipo
    
    if (!produto) return 0
    
    if (tipo === 'ENTRADA') {
      return produto.quantidadeEstoque + quantidade
    } else {
      return produto.quantidadeEstoque - quantidade
    }
  }

  isAbaixoMinimo(): boolean {
    const produto = this.getProdutoSelecionado()
    if (!produto) return false
    return this.getEstoqueAposMovimentacao() < produto.quantidadeMinima
  }

  isAcimaMaximo(): boolean {
    const produto = this.getProdutoSelecionado()
    if (!produto) return false
    return this.getEstoqueAposMovimentacao() > produto.quantidadeMaxima
  }

  getTotalPages(): number {
    return Math.ceil((this.items.length || 0) / this.pageSize)
  }

  salvar() {
    const v = this.form.value
    const pid = v.produtoId as unknown as number
    const tipo = v.tipo as 'ENTRADA' | 'SAIDA'
    this.api.criar({ produtoId: pid, data: v.data!, quantidade: v.quantidade!, tipo }).subscribe(() => {
      this.toast.success('Movimentação registrada com sucesso!')
      const p = this.produtos.find(x => x.id === pid)
      if (p) {
        const novo = tipo === 'ENTRADA' ? p.quantidadeEstoque + v.quantidade! : p.quantidadeEstoque - v.quantidade!
        if (novo < p.quantidadeMinima) this.toast.warning('⚠️ Atenção: Estoque abaixo da quantidade mínima!')
        if (novo > p.quantidadeMaxima) this.toast.warning('⚠️ Atenção: Estoque acima da quantidade máxima!')
        p.quantidadeEstoque = novo
      }
      this.load()
    }, e => this.toast.error('Erro ao registrar'))
  }
}