import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app.routing'
import { AppComponent } from './app.component'
import { ProductsPageComponent } from './products/products-page.component'
import { CategoriesPageComponent } from './categories/categories-page.component'
import { MovementsPageComponent } from './movements/movements-page.component'
import { PriceListPageComponent } from './reports/price-list-page.component'
import { BalancePageComponent } from './reports/balance-page.component'
import { BelowMinimumPageComponent } from './reports/below-minimum-page.component'
import { ByCategoryPageComponent } from './reports/by-category-page.component'
import { TopMovementsPageComponent } from './reports/top-movements-page.component'
import { ToastsComponent } from './shared/toasts/toasts.component'
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    ToastsComponent,
    ConfirmModalComponent,
    ProductsPageComponent,
    CategoriesPageComponent,
    MovementsPageComponent,
    PriceListPageComponent,
    BalancePageComponent,
    BelowMinimumPageComponent,
    ByCategoryPageComponent,
    TopMovementsPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}