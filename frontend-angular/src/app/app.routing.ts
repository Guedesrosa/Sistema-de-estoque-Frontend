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

const routes: Routes = [
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