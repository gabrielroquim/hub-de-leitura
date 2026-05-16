# Cenário de Teste: Cadastro de Novo Usuário no Hub de Leitura

## Papel do Agente

Você é um **especialista em automação de testes Playwright**. Sua tarefa é criar um teste de ponta a ponta para o processo de registro de novos usuários no sistema "Hub de Leitura".

## Contexto e Objetivo

O objetivo principal é **validar o fluxo completo de cadastro de um novo usuário**, desde o preenchimento do formulário até a confirmação de que o usuário foi logado com sucesso após o registro. O teste deve ser robusto, independente e usar dados dinâmicos.

## Diretrizes de Geração de Teste

1.  **Não gere código de teste apenas com base no cenário.** Interaja ativamente com a aplicação.
2.  **Execute os passos um a um** usando as ferramentas de interação do Playwright.
3.  **Após todas as interações**, emita um teste Playwright TypeScript (`@playwright/test`) completo, baseado no histórico de ações.
4.  **Salve o teste gerado** no diretório de tests.
5.  **Execute e itere** no teste até que ele passe sem falhas.
6.  **Utilize o navegador Chrome** (não headless) para a execução e geração.
7.  **Mantenha o teste idempotente**, evitando dependência de estado pré-existente.
8.  **Priorize seletores robustos**: use `getByRole`, `getByLabelText` ou `getByPlaceholder` sempre que possível, evitando seletores frágeis (classes, IDs genéricos).

## Pré-condições

*   A aplicação "Hub de Leitura" deve estar rodando localmente em `http://localhost:3000`.
*   A página de cadastro deve ser acessível em `http://localhost:3000/register.html`.

## Geração de Dados (usando @faker-js/faker)

Para garantir a independência do teste, todos os dados do formulário devem ser gerados dinamicamente usando a biblioteca **`@faker-js/faker`**.

*   **Nome Completo**: Gere um nome completo válido (ex: `faker.person.fullName()`).
*   **Email**: Gere um email único para cada execução do teste (ex: `faker.internet.email()`).
*   **Telefone**: Gere um número de telefone. Preferir uma abordagem tip-safe no TypeScript — `faker.phone.number()` pode não aceitar strings de formato conforme a assinatura de tipos.
	Exemplo recomendado (gera dígitos e formata no padrão `(##) #####-####`):

	```ts
	// gera 11 dígitos, ex: "11987654321"
	const raw = faker.string.numeric(11);
	const phone = raw.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
	```

	Alternativa: usar a API de opções do `faker` se você não precisa de um formato exato:

	```ts
	const phone = faker.phone.number({ style: 'national' });
	```
*   **Senha**: Gere uma senha forte que atenda aos critérios comuns (mínimo 6 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais).
*   **Confirmar Senha**: Deve ser exatamente igual à senha gerada.

## Interações Essenciais

O agente deve realizar as seguintes interações na página de registro:

1.  Navegar para a URL: `http://localhost:3000/register.html`.
2.  Preencher o campo "Nome Completo \*" com o dado gerado.
3.  Preencher o campo "Email \*" com o dado gerado.
4.  Preencher o campo "Telefone" com o dado gerado.
5.  Preencher o campo "Senha \*" com a senha gerada.
6.  Preencher o campo "Confirmar Senha \*" com a senha gerada.
7.  Marcar o checkbox "Li e concordo com os termos de uso da biblioteca".
8.  Clicar no botão "Criar Conta".

## Critérios de Sucesso (Validações)

Após clicar em "Criar Conta", o teste gerado deve validar que:

1.  O usuário foi **redirecionado com sucesso para a área logada** do sistema. Isso pode ser verificado pela mudança da URL ou pela presença de elementos específicos da interface de usuário logado (ex: "Bem-vindo, [Nome do Usuário]", menu de perfil, botão "Sair").
2.  **Nenhuma mensagem de erro** de validação ou de servidor (ex: "Email já cadastrado", "Senha fraca") é exibida na tela.

## Formato do Teste Gerado

O teste deve ser um arquivo `.spec.ts` que utiliza a estrutura `@playwright/test`. Ele deve ser claro, legível e seguir as melhores práticas de Playwright.