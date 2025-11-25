# 📦 Sistema de Estoque – Front-End

## 🧑‍💻 Integrantes do Grupo

- Lucas da Costa  
- Carlos Henrique Lohn  
- João Víctor Muniz da Silva  
- Rennan Rosa Guedes  
- André Leonardo da Silva  

---

# 📖 Descrição do Projeto

O **Sistema de Estoque** é a aplicação Front-End desenvolvida para a A3 da unidade curricular **Sistemas Distribuídos e Mobile – UNISUL**, implementada em **Angular 17** com **TypeScript**, seguindo padrões de arquitetura em componentes e serviços.

O sistema fornece uma interface web moderna e responsiva que permite:

- Cadastro, edição, listagem e exclusão de produtos  
- Cadastro e gerenciamento de categorias  
- Registro de movimentações (entrada/saída)  
- Reajuste percentual de preços em lote  
- Visualização de relatórios administrativos  
- Indicadores visuais de status de estoque (abaixo do mínimo/acima do máximo)  
- Sistema de notificações toast para feedback ao usuário  
- Paginação e busca de produtos  

A aplicação opera como cliente remoto, consumindo uma API REST hospedada em outra máquina, caracterizando **arquitetura distribuída**.

---

# ⚙️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|---|---|
| Framework | Angular 17.3.0 |
| Linguagem | TypeScript 5.3.3 |
| Gerenciamento de Estado | RxJS 7.8.1 |
| Roteamento | Angular Router |
| Formulários | Angular Reactive Forms |
| HTTP Client | Angular HttpClient |
| Build Tool | Angular CLI 17.3.8 |
| IDE | Visual Studio Code / IntelliJ IDEA |

---

# 🧩 Padrões de Projeto Aplicados

- **Component-Based Architecture**  
  Aplicação estruturada em componentes reutilizáveis e modulares.

- **Service Layer Pattern**  
  Lógica de comunicação com a API centralizada em serviços (`ProductService`, `CategoryService`, `MovementService`).

- **DTO Pattern**  
  Objetos de transferência utilizados para comunicação com a API.

- **Dependency Injection**  
  Uso do sistema de injeção de dependências do Angular para gerenciar serviços.

- **Reactive Forms**  
  Formulários reativos com validação em tempo real.

- **Observable Pattern**  
  Uso de RxJS Observables para operações assíncronas e comunicação com a API.

---

# 🧱 Arquitetura da Aplicação

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Component   │ → │   Service   │ → │  HttpClient │ → │   Backend   │
│   (View)     │   │  (Business) │   │   (HTTP)    │   │     API     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
       │
       ▼
  [Models/DTOs]
```

---

# 📁 Estrutura do Projeto

```
src/
└── app/
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    ├── app.module.ts
    ├── app.routing.ts
    │
    ├── products/
    │   ├── products-page.component.ts
    │   ├── products-page.component.html
    │   ├── products-page.component.css
    │   ├── product.service.ts
    │   └── product.model.ts
    │
    ├── categories/
    │   ├── categories-page.component.ts
    │   ├── categories-page.component.html
    │   ├── categories-page.component.css
    │   ├── category.service.ts
    │   └── category.model.ts
    │
    ├── movements/
    │   ├── movements-page.component.ts
    │   ├── movements-page.component.html
    │   ├── movements-page.component.css
    │   ├── movement.service.ts
    │   └── movement.model.ts
    │
    ├── reports/
    │   ├── price-list-page.component.ts
    │   ├── balance-page.component.ts
    │   ├── below-minimum-page.component.ts
    │   ├── by-category-page.component.ts
    │   └── top-movements-page.component.ts
    │
    └── shared/
        ├── environment.ts
        ├── confirm-modal/
        │   ├── confirm-modal.component.ts
        │   ├── confirm-modal.component.html
        │   └── confirm-modal.component.css
        └── toasts/
            ├── toasts.component.ts
            ├── toasts.component.html
            ├── toasts.component.css
            └── toast.service.ts

angular.json
package.json
proxy.conf.json
tsconfig.json
```

---

# 📦 Dependências (package.json)

Principais bibliotecas utilizadas:

```json
"@angular/core": "17.3.0"
"@angular/common": "17.3.0"
"@angular/router": "17.3.0"
"@angular/forms": "17.3.0"
"rxjs": "7.8.1"
"zone.js": "0.14.4"
```

---

# 🚀 Execução do Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Guedesrosa/Sistema-de-estoque-Frontend.git
cd Sistema-de-estoque-Frontend
```

## 2️⃣ Instalar dependências

```bash
npm install
```

## 3️⃣ Configurar proxy (opcional)

O arquivo `proxy.conf.json` já está configurado para redirecionar requisições `/api` para `http://localhost:8080`. Se necessário, ajuste a URL do backend:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

## 4️⃣ Executar o servidor de desenvolvimento

```bash
npm start
```

ou

```bash
ng serve --proxy-config proxy.conf.json
```

## 🌐 Endereço da aplicação

http://localhost:4200

---

# 🔌 Rotas da Aplicação

## 📍 Páginas Principais

| Rota | Componente | Descrição |
|---|---|---|
| `/` | Redireciona para `/produtos` | Página inicial |
| `/produtos` | ProductsPageComponent | Gerenciamento de produtos |
| `/categorias` | CategoriesPageComponent | Gerenciamento de categorias |
| `/movimentacoes` | MovementsPageComponent | Registro de movimentações |

---

## 📊 Relatórios

| Rota | Componente | Descrição |
|---|---|---|
| `/relatorios/lista-precos` | PriceListPageComponent | Lista de preços por produto |
| `/relatorios/balanco` | BalancePageComponent | Balanço físico e financeiro |
| `/relatorios/abaixo-minimo` | BelowMinimumPageComponent | Produtos abaixo do mínimo |
| `/relatorios/por-categoria` | ByCategoryPageComponent | Quantidade por categoria |
| `/relatorios/top-movimentacoes` | TopMovementsPageComponent | Produtos mais movimentados |

---

# 🎨 Funcionalidades Implementadas

## 📦 Produtos

- ✅ Listagem paginada com busca por nome ou categoria
- ✅ Criação de novos produtos
- ✅ Edição de produtos existentes
- ✅ Exclusão com confirmação modal
- ✅ Reajuste percentual de preços em lote
- ✅ Indicadores visuais de status:
  - ⚠️ Estoque abaixo do mínimo
  - 🔴 Estoque acima do máximo
  - ✅ Estoque dentro dos limites

## 🏷️ Categorias

- ✅ Listagem de todas as categorias
- ✅ Criação de novas categorias
- ✅ Edição de categorias
- ✅ Exclusão com confirmação

## 📥 Movimentações

- ✅ Registro de entradas no estoque
- ✅ Registro de saídas do estoque
- ✅ Seleção de produto e tipo de movimentação
- ✅ Validação de quantidades

## 📊 Relatórios

- ✅ Lista de preços formatada
- ✅ Balanço físico e financeiro
- ✅ Produtos abaixo do estoque mínimo
- ✅ Quantidade de produtos por categoria
- ✅ Top produtos mais movimentados

## 🔔 Recursos Adicionais

- ✅ Sistema de notificações toast (sucesso/erro)
- ✅ Modal de confirmação para exclusões
- ✅ Validação de formulários em tempo real
- ✅ Interface responsiva e moderna
- ✅ Navegação intuitiva com menu superior

---

# 🔗 Comunicação com Back-End

A aplicação consome a API REST do backend através de requisições HTTP:

- **Base URL**: `http://localhost:8080/api`
- **Proxy**: Configurado para desenvolvimento (`proxy.conf.json`)
- **Métodos HTTP**: GET, POST, PUT, DELETE

### Exemplo de Serviço

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = '/api/produtos'
  
  listar(): Observable<ProdutoDTO[]> {
    return this.http.get<ProdutoDTO[]>(this.base)
  }
}
```

---

# 🧠 Regras de Negócio Implementadas

- Validação de campos obrigatórios nos formulários
- Validação de valores mínimos (preço > 0, quantidade >= 0)
- Confirmação antes de exclusões
- Feedback visual para operações bem-sucedidas ou com erro
- Indicadores de status de estoque em tempo real
- Paginação para melhor performance com grandes volumes de dados

---

# 🧭 Status do Projeto

| Funcionalidade | Status |
|---|---|
| CRUD de Produto | ✔ Concluído |
| CRUD de Categoria | ✔ Concluído |
| CRUD de Movimentação | ✔ Concluído |
| Reajuste de Preços | ✔ Implementado |
| Relatórios | ✔ Funcionando |
| Sistema de Notificações | ✔ Implementado |
| Modal de Confirmação | ✔ Implementado |
| Comunicação distribuída | ✔ Via REST |
| Interface Responsiva | ✔ Entregue |

---

# 🔗 Repositórios

| Parte | Link |
|---|---|
| Back-End | https://github.com/LucasdaCosta04/Sistema_de_estoque-Backend.git |
| Front-End | https://github.com/Guedesrosa/Sistema-de-estoque-Frontend.git |

---

# 📜 Licença

Projeto distribuído sob licença **MIT**, livre para estudo e evolução.

---

# 🏁 Conclusão

Este front-end atende a todos os requisitos da A3:

- Interface completa para CRUD de todas as entidades  
- Visualização de relatórios gerenciais  
- Comunicação distribuída com backend via REST  
- Projeto versionado colaborativamente  
- Arquitetura profissional em componentes e serviços  
- Experiência de usuário moderna e intuitiva  
