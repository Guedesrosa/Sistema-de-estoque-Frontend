/**
 * Componente raiz da aplicacao Angular
 * Estrutura principal que envolve toda a aplicacao
 * Define o seletor 'app-root' que e usado no index.html
 */
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}