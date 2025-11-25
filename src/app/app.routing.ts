/**
 * Configuracao de rotas da aplicacao
 * Define todas as rotas disponiveis e mapeia URLs para componentes
 * 
 * Rotas disponiveis:
 * - /produtos: Pagina de gerenciamento de produtos
 * - /categorias: Pagina de gerenciamento de categorias
 * - /movimentacoes: Pagina de registro de movimentacoes de estoque
 * - /relatorios/*: Diferentes tipos de relatorios do sistema
 */
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductsPageComponent } from './products/products-page.component'
import { CategoriesPageComponent } from './categories/categories-page.component'
import { MovementsPageComponent } from './movements/movements-page.component'
import { PriceListPageComponent } from './reports/price-list-page.component'
import { BalancePageComponent } from './reports/balance-page.component'
import { BelowMinimumPageComponent } from './reports/below-minimum-page.component'
import { ByCategoryPageComponent } from './reports/by-category-page.component'
import { TopMovementsPageComponent } from './reports/top-movements-page.component'

// Definicao de todas as rotas da aplicacao
const routes: Routes = [
  // Rota raiz redireciona para a pagina de produtos
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProductsPageComponent },
  { path: 'categorias', component: CategoriesPageComponent },
  { path: 'movimentacoes', component: MovementsPageComponent },
  { path: 'relatorios/lista-precos', component: PriceListPageComponent },
  { path: 'relatorios/balanco', component: BalancePageComponent },
  { path: 'relatorios/abaixo-minimo', component: BelowMinimumPageComponent },
  { path: 'relatorios/por-categoria', component: ByCategoryPageComponent },
  { path: 'relatorios/top-movimentacoes', component: TopMovementsPageComponent }
]

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}