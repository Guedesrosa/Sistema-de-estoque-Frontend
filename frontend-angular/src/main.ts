/**
 * Arquivo principal de inicializacao da aplicacao Angular
 * Responsavel por inicializar o framework e carregar o modulo raiz da aplicacao
 */

// Importa o Zone.js necessario para o funcionamento do Angular
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'

// Inicializa a aplicacao Angular com o modulo raiz (AppModule)
// Captura e exibe erros caso ocorram durante a inicializacao
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))