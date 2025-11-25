/**
 * Configuracao de ambiente da aplicacao
 * Armazena variaveis de configuracao que podem variar entre ambientes
 * 
 * Propriedades:
 * - apiUrl: URL base da API backend (vazio significa usar proxy configurado)
 */
export const environment = {
  apiUrl: '' // URL base da API - vazio usa o proxy configurado no angular.json
}