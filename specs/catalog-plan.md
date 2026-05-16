# Hub de Leitura - Plano de Testes do Catálogo

## Application Overview

Aplicação web de gerenciamento de biblioteca educacional (Hub de Leitura) acessível em http://localhost:3000. O módulo do catálogo permite explorar o acervo de livros, realizar buscas e filtragens, visualizar detalhes de cada livro, adicionar itens à cesta de reservas e finalizar reservas. A navegação inclui: página do catálogo (catalog.html), detalhes do livro (book-details.html), cesta (basket.html) e checkout (checkout.html). A aplicação exige autenticação para finalizar reservas.

## Test Scenarios

### 1. Catálogo - Carregamento e Exibição

**Seed:** `tests/seed.spec.ts`

#### 1.1. CT-01 - Carregamento bem-sucedido do catálogo

**File:** `tests/catalog/ct-01-carregamento-catalogo.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: A página deve carregar com o título 'Hub de Leitura - Catálogo'
    - expect: O cabeçalho deve exibir 'Hub de Leitura' e 'Seu Portal do Conhecimento'
    - expect: O menu de navegação deve conter os links HOME, CESTA DE LIVROS e ENTRAR
  2. Verificar a seção principal do catálogo
    - expect: O título 'Conheça Nosso Acervo' deve estar visível
    - expect: O subtítulo 'Explore, aprenda e transforme sua vida através da leitura.' deve estar visível
  3. Verificar os elementos de filtro e busca
    - expect: O campo de busca com placeholder 'Buscar por título, autor ou ISBN…' deve estar visível
    - expect: O dropdown 'Todas as Categorias' deve estar visível
    - expect: O dropdown 'Todas as Editoras' deve estar visível
    - expect: O dropdown 'Todos os livros' deve estar visível
  4. Verificar a exibição dos livros
    - expect: O contador deve exibir 'Exibindo 12 de 23 livros'
    - expect: Os botões de alternância de visualização (grade e lista) devem estar visíveis
    - expect: Pelo menos 12 cards de livros devem ser exibidos na grade

#### 1.2. CT-02 - Exibição completa dos cards de livros

**File:** `tests/catalog/ct-02-exibicao-cards.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: A página do catálogo deve carregar com sucesso
  2. Inspecionar os dados de um card de livro (ex: '1984')
    - expect: A imagem do livro deve ser exibida
    - expect: O badge com número de exemplares disponíveis deve ser exibido
    - expect: O título do livro ('1984') deve ser visível e clicável
    - expect: O nome do autor ('George Orwell') deve ser exibido
    - expect: A categoria ('Ficção') deve ser exibida
    - expect: O resumo/descrição do livro deve ser exibido
    - expect: O botão 'Adicionar à Cesta' deve estar presente e habilitado
    - expect: O botão 'Ver Detalhes' deve estar presente e habilitado

#### 1.3. CT-03 - Paginação do catálogo

**File:** `tests/catalog/ct-03-paginacao.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve exibir 'Exibindo 12 de 23 livros' na primeira página
  2. Verificar os controles de paginação
    - expect: Os links de página '1', '2' e 'Próximo' devem estar visíveis na navegação de paginação
  3. Clicar no link de página '2'
    - expect: A segunda página deve carregar
    - expect: O contador deve exibir 'Exibindo 23 de 23 livros'
    - expect: Os livros restantes (11 livros) devem ser exibidos na segunda página
  4. Clicar no link de página '1'
    - expect: A primeira página deve ser exibida novamente com 12 livros

#### 1.4. CT-04 - Alternância entre visualização em grade e lista

**File:** `tests/catalog/ct-04-alternancia-visualizacao.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: A página deve carregar com visualização em grade (padrão)
  2. Clicar no botão de visualização em lista (ícone de lista)
    - expect: Os livros devem ser reorganizados em formato de lista horizontal
    - expect: O botão de visualização em lista deve indicar estar ativo
  3. Clicar no botão de visualização em grade (ícone de grade)
    - expect: Os livros devem voltar ao formato de grade
    - expect: O botão de visualização em grade deve indicar estar ativo

### 2. Catálogo - Busca

**Seed:** `tests/seed.spec.ts`

#### 2.1. CT-05 - Busca por título de livro

**File:** `tests/catalog/ct-05-busca-titulo.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve exibir 23 livros no total
  2. Digitar 'Harry Potter' no campo de busca
    - expect: O contador deve atualizar para 'Exibindo 1 de 1 livros'
    - expect: Apenas o livro 'Harry Potter e a Pedra Filosofal' deve ser exibido
    - expect: A tag de filtro ativo deve aparecer com o texto 'Busca: "Harry Potter"'
    - expect: O botão 'Remover todos' deve aparecer ao lado da tag de filtro

#### 2.2. CT-06 - Busca por nome do autor

**File:** `tests/catalog/ct-06-busca-autor.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Digitar 'George Orwell' no campo de busca
    - expect: O contador deve exibir apenas os livros do autor George Orwell ('1984' e 'A Revolução dos Bichos')
    - expect: Apenas os livros de George Orwell devem ser exibidos na listagem

#### 2.3. CT-07 - Busca por ISBN

**File:** `tests/catalog/ct-07-busca-isbn.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Digitar '978-0-452-28423-4' (ISBN do livro 1984) no campo de busca
    - expect: Apenas o livro '1984' deve ser exibido
    - expect: O contador deve exibir 'Exibindo 1 de 1 livros'

#### 2.4. CT-08 - Limpar todos os filtros ativos

**File:** `tests/catalog/ct-08-limpar-filtros.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html e digitar 'Harry Potter' no campo de busca
    - expect: O filtro ativo deve aparecer com o texto 'Busca: "Harry Potter"'
    - expect: Apenas 1 livro deve ser exibido
  2. Clicar no botão 'Remover todos'
    - expect: O campo de busca deve ser limpo
    - expect: A tag de filtro ativo deve desaparecer
    - expect: O catálogo deve voltar a exibir todos os 23 livros
    - expect: O contador deve exibir 'Exibindo 12 de 23 livros'

#### 2.5. CT-09 - Busca por termo inexistente (resultado vazio)

**File:** `tests/catalog/ct-09-busca-inexistente.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Digitar 'xyzabc123livro_inexistente' no campo de busca
    - expect: O contador deve exibir 'Nenhum livro encontrado'
    - expect: Nenhum card de livro deve ser exibido
    - expect: Uma mensagem de estado vazio deve ser apresentada ao usuário

### 3. Catálogo - Filtros

**Seed:** `tests/seed.spec.ts`

#### 3.1. CT-10 - Filtrar por categoria

**File:** `tests/catalog/ct-10-filtro-categoria.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Selecionar 'Fantasia (5)' no dropdown de categorias
    - expect: O contador deve exibir 'Exibindo 5 de 5 livros'
    - expect: Apenas livros da categoria Fantasia devem ser listados
    - expect: Todos os cards exibidos devem mostrar 'Fantasia' como categoria
  3. Selecionar 'Todas as Categorias' no dropdown de categorias
    - expect: O catálogo deve voltar a exibir todos os 23 livros

#### 3.2. CT-11 - Filtrar por editora

**File:** `tests/catalog/ct-11-filtro-editora.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Selecionar 'Companhia das Letras' no dropdown de editoras
    - expect: O contador deve exibir apenas os livros da editora Companhia das Letras
    - expect: Todos os livros listados devem pertencer à editora selecionada
  3. Selecionar 'Todas as Editoras' no dropdown de editoras
    - expect: O catálogo deve voltar a exibir todos os 23 livros

#### 3.3. CT-12 - Filtrar por disponibilidade (apenas disponíveis)

**File:** `tests/catalog/ct-12-filtro-disponibilidade.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Selecionar 'Apenas disponíveis' no dropdown de disponibilidade
    - expect: Apenas livros com exemplares disponíveis devem ser listados
    - expect: O número de livros exibidos deve ser menor ou igual ao total (23)
  3. Selecionar 'Indisponíveis' no dropdown de disponibilidade
    - expect: Apenas livros sem exemplares disponíveis devem ser listados
  4. Selecionar 'Todos os livros' no dropdown de disponibilidade
    - expect: O catálogo deve voltar a exibir todos os 23 livros

#### 3.4. CT-13 - Combinação de filtros: categoria + disponibilidade

**File:** `tests/catalog/ct-13-filtros-combinados.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com todos os livros
  2. Selecionar 'Fantasia (5)' no dropdown de categorias
    - expect: Exibindo 5 de 5 livros da categoria Fantasia
  3. Selecionar 'Apenas disponíveis' no dropdown de disponibilidade
    - expect: O contador deve exibir apenas livros da categoria Fantasia que estão disponíveis
    - expect: Todos os livros exibidos devem ser da categoria Fantasia e ter exemplares disponíveis

### 4. Detalhes do Livro

**Seed:** `tests/seed.spec.ts`

#### 4.1. CT-14 - Visualizar detalhes de um livro a partir do catálogo

**File:** `tests/catalog/ct-14-detalhes-livro.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com sucesso
  2. Clicar no botão 'Ver Detalhes' do livro '1984'
    - expect: A URL deve mudar para /book-details.html?id=2
    - expect: O título da página deve ser '1984 - Hub de Leitura'
  3. Verificar as informações exibidas na página de detalhes
    - expect: O breadcrumb deve exibir 'Home / Catálogo / 1984'
    - expect: A imagem do livro deve ser exibida
    - expect: O status 'Disponível para reserva' deve estar visível
    - expect: O título '1984', o autor 'George Orwell', o ISBN, a editora, a categoria e o idioma devem ser exibidos
    - expect: O ano, número de páginas, formato e quantidade de exemplares disponíveis devem ser exibidos
    - expect: A descrição completa do livro deve estar visível
    - expect: Os botões 'Adicionar à Cesta', 'Ver Cesta' e 'Voltar ao catálogo' devem estar presentes

#### 4.2. CT-15 - Navegar para detalhes via título do livro

**File:** `tests/catalog/ct-15-navegar-titulo.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar com sucesso
  2. Clicar no link com o título 'Harry Potter e a Pedra Filosofal'
    - expect: A URL deve mudar para /book-details.html?id=10
    - expect: A página de detalhes do livro 'Harry Potter e a Pedra Filosofal' deve ser exibida

#### 4.3. CT-16 - Adicionar livro à cesta a partir da página de detalhes

**File:** `tests/catalog/ct-16-adicionar-cesta-detalhes.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/book-details.html?id=6 ('A Arte da Guerra')
    - expect: A página de detalhes do livro deve carregar com sucesso
  2. Clicar no botão 'Adicionar à Cesta'
    - expect: O livro 'A Arte da Guerra' deve ser adicionado à cesta
    - expect: O contador de cesta no cabeçalho deve incrementar em 1
  3. Clicar no botão 'Ver Cesta'
    - expect: A URL deve mudar para /basket.html
    - expect: O livro 'A Arte da Guerra' deve estar listado na cesta

#### 4.4. CT-17 - Retornar ao catálogo pela navegação breadcrumb

**File:** `tests/catalog/ct-17-breadcrumb.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/book-details.html?id=1
    - expect: A página de detalhes do livro 'Dom Casmurro' deve carregar
  2. Clicar no link 'Catálogo' do breadcrumb
    - expect: A URL deve mudar para /catalog.html
    - expect: A página do catálogo deve ser exibida

#### 4.5. CT-18 - ID de livro inválido (livro não encontrado)

**File:** `tests/catalog/ct-18-livro-nao-encontrado.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/book-details.html?id=9999
    - expect: A página deve carregar sem crash ou erro fatal
  2. Verificar o conteúdo da página
    - expect: O título 'Livro não encontrado' deve ser exibido
    - expect: A mensagem 'O livro que você está procurando não foi encontrado.' deve estar visível
    - expect: Um link 'Voltar ao Catálogo' deve estar disponível
  3. Clicar no link 'Voltar ao Catálogo'
    - expect: A URL deve mudar para /catalog.html
    - expect: O catálogo deve ser exibido normalmente

### 5. Cesta de Livros

**Seed:** `tests/seed.spec.ts`

#### 5.1. CT-19 - Adicionar livro à cesta a partir do catálogo

**File:** `tests/catalog/ct-19-adicionar-cesta-catalogo.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: O catálogo deve carregar; o contador da cesta deve exibir '0'
  2. Clicar no botão 'Adicionar à Cesta' do livro '1984'
    - expect: Uma confirmação deve ser exibida de que o livro foi adicionado
    - expect: O contador da cesta no cabeçalho deve mudar de '0' para '1'
  3. Clicar no link 'CESTA DE LIVROS' no menu de navegação
    - expect: A URL deve mudar para /basket.html
    - expect: O livro '1984' deve aparecer listado na cesta
    - expect: O resumo deve exibir 'Total de livros: 1'

#### 5.2. CT-20 - Visualizar resumo da reserva na cesta

**File:** `tests/catalog/ct-20-resumo-cesta.spec.ts`

**Steps:**
  1. Adicionar o livro '1984' à cesta a partir de http://localhost:3000/catalog.html e navegar para http://localhost:3000/basket.html
    - expect: A página da cesta deve exibir o livro '1984'
  2. Verificar o painel de Resumo da Reserva
    - expect: 'Total de livros: 1' deve ser exibido
    - expect: 'Prazo de retirada: 48 horas' deve ser exibido
    - expect: 'Período empréstimo: 15 dias' deve ser exibido
    - expect: 'Reservas a confirmar: 1' deve ser exibido
  3. Verificar a seção de Informações Importantes
    - expect: 'Prazo para retirada: 48 horas' deve estar listado
    - expect: 'Período de empréstimo: 15 dias' deve estar listado
    - expect: 'Renovações: Até 2 vezes' deve estar listado
    - expect: 'Local: Biblioteca Central' deve estar listado

#### 5.3. CT-21 - Adicionar observação a um livro na cesta

**File:** `tests/catalog/ct-21-observacao-livro.spec.ts`

**Steps:**
  1. Adicionar o livro '1984' à cesta e navegar para http://localhost:3000/basket.html
    - expect: O livro deve estar listado na cesta com um campo de observações
  2. Clicar no campo de observações do livro '1984' e digitar 'Preciso da edição mais recente'
    - expect: O texto 'Preciso da edição mais recente' deve aparecer no campo de observações do livro

#### 5.4. CT-22 - Remover livro da cesta

**File:** `tests/catalog/ct-22-remover-livro-cesta.spec.ts`

**Steps:**
  1. Adicionar o livro '1984' à cesta e navegar para http://localhost:3000/basket.html
    - expect: O livro deve estar listado na cesta com total de 1 livro
  2. Clicar no botão de remover (ícone de lixeira/X) ao lado do livro '1984'
    - expect: O livro '1984' deve ser removido da cesta
    - expect: O contador deve atualizar para 0
    - expect: O estado de cesta vazia deve ser exibido

#### 5.5. CT-23 - Limpar toda a cesta com o botão 'Limpar Cesta'

**File:** `tests/catalog/ct-23-limpar-cesta.spec.ts`

**Steps:**
  1. Adicionar pelo menos 2 livros à cesta e navegar para http://localhost:3000/basket.html
    - expect: Os livros adicionados devem aparecer na cesta
  2. Clicar no botão 'Limpar Cesta'
    - expect: Todos os livros devem ser removidos da cesta
    - expect: O contador da cesta no cabeçalho deve voltar para '0'
    - expect: O estado de cesta vazia deve ser exibido na página

#### 5.6. CT-24 - Finalizar reserva sem estar autenticado

**File:** `tests/catalog/ct-24-checkout-sem-login.spec.ts`

**Steps:**
  1. Adicionar o livro '1984' à cesta e navegar para http://localhost:3000/basket.html
    - expect: O livro deve estar na cesta e o botão 'Finalizar Reservas' deve ser exibido
  2. Clicar no botão 'Finalizar Reservas'
    - expect: A URL deve mudar para /checkout.html
    - expect: A mensagem 'Autenticação Necessária' deve ser exibida
    - expect: A mensagem 'Para finalizar suas reservas, você precisa estar autenticado em sua conta.' deve aparecer
    - expect: Os links 'Fazer Login' e 'Criar Conta' devem estar disponíveis
    - expect: O link 'Fazer Login' deve apontar para /login.html?redirect=/checkout.html
    - expect: O link 'Criar Conta' deve apontar para /register.html?redirect=/checkout.html
  3. Clicar no link 'Voltar à Cesta'
    - expect: A URL deve mudar para /basket.html
    - expect: O livro ainda deve estar na cesta

### 6. Catálogo - Navegação e Links

**Seed:** `tests/seed.spec.ts`

#### 6.1. CT-25 - Navegação pelo menu principal

**File:** `tests/catalog/ct-25-navegacao-menu.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html
    - expect: A página deve carregar com sucesso
  2. Clicar no link 'HOME' no menu de navegação
    - expect: A URL deve mudar para /index.html
    - expect: A página inicial deve ser exibida
  3. Retornar ao catálogo e clicar no link 'ENTRAR' no menu
    - expect: A URL deve mudar para /login.html
    - expect: A página de login deve ser exibida

#### 6.2. CT-26 - Links do rodapé do catálogo

**File:** `tests/catalog/ct-26-links-rodape.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html e rolar até o rodapé
    - expect: O rodapé deve ser visível com seções: Links Rápidos, Contato e Horários
  2. Clicar no link 'Catálogo' no rodapé
    - expect: A URL deve permanecer ou retornar para /catalog.html
  3. Clicar no link 'Minhas Reservas' no rodapé
    - expect: A URL deve mudar para /dashboard.html
  4. Clicar no link 'Minha Cesta' no rodapé
    - expect: A URL deve mudar para /basket.html

#### 6.3. CT-27 - Acesso ao catálogo sem parâmetros na URL

**File:** `tests/catalog/ct-27-acesso-sem-parametros.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html diretamente sem parâmetros
    - expect: A página deve carregar normalmente com todos os livros
    - expect: Nenhum filtro deve estar ativo ao carregar a página pela primeira vez

#### 6.4. CT-28 - Persistência do contador da cesta ao navegar

**File:** `tests/catalog/ct-28-persistencia-contador.spec.ts`

**Steps:**
  1. Acessar http://localhost:3000/catalog.html e adicionar '1984' à cesta
    - expect: O contador da cesta deve exibir '1'
  2. Navegar para http://localhost:3000/book-details.html?id=2 e voltar para o catálogo
    - expect: O contador da cesta ainda deve exibir '1' após navegar entre páginas (persistência via localStorage)
