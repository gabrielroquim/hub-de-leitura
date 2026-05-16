// spec: specs/catalog-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catálogo - Carregamento e Exibição', () => {
  test('CT-01 - Carregamento bem-sucedido do catálogo', async ({ page }) => {
    // 1. Acessar http://localhost:3000/catalog.html
    await page.goto('http://localhost:3000/catalog.html');

    // expect: A página deve carregar com o título 'Hub de Leitura - Catálogo'
    await expect(page).toHaveTitle('Hub de Leitura - Catálogo');

    // expect: O cabeçalho deve exibir 'Hub de Leitura' e 'Seu Portal do Conhecimento'
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Seu Portal do Conhecimento')).toBeVisible();

    // expect: O menu de navegação deve conter os links HOME, CESTA DE LIVROS e ENTRAR
    await expect(page.getByRole('link', { name: 'HOME' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CESTA DE LIVROS' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' ENTRAR' })).toBeVisible();

    // 2. Verificar a seção principal do catálogo
    // expect: O título 'Conheça Nosso Acervo' deve estar visível
    await expect(page.getByRole('heading', { name: 'Conheça Nosso Acervo' })).toBeVisible();

    // expect: O subtítulo 'Explore, aprenda e transforme sua vida através da leitura.' deve estar visível
    await expect(page.getByText('Explore, aprenda e transforme sua vida através da leitura.')).toBeVisible();

    // 3. Verificar os elementos de filtro e busca
    // expect: O campo de busca com placeholder 'Buscar por título, autor ou ISBN…' deve estar visível
    await expect(page.getByPlaceholder('Buscar por título, autor ou ISBN…')).toBeVisible();

    // expect: O dropdown 'Todas as Categorias' deve estar visível
    await expect(page.locator('#category-filter')).toBeVisible();

    // expect: O dropdown 'Todas as Editoras' deve estar visível
    await expect(page.locator('#editor-filter')).toBeVisible();

    // expect: O dropdown 'Todos os livros' deve estar visível
    await expect(page.locator('#availability-filter')).toBeVisible();

    // 4. Verificar a exibição dos livros
    // expect: O contador deve exibir 'Exibindo 12 de 23 livros'
    await expect(page.getByText('Exibindo 12 de 23 livros')).toBeVisible();

    // expect: Os botões de alternância de visualização (grade e lista) devem estar visíveis
    await expect(page.getByRole('group', { name: 'Visualização' })).toBeVisible();
    await expect(page.getByTitle('Visualização em grade')).toBeVisible();
    await expect(page.getByTitle('Visualização em lista')).toBeVisible();

    // expect: Pelo menos 12 cards de livros devem ser exibidos na grade
    await expect(page.locator('#book-list > div')).toHaveCount(12);
  });
});
