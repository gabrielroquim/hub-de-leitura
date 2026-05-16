// spec: specs/catalog-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catálogo - Carregamento e Exibição', () => {
  test('CT-02 - Exibição completa dos cards de livros', async ({ page }) => {
    // 1. Acessar http://localhost:3000/catalog.html
    await page.goto('http://localhost:3000/catalog.html');

    // expect: A página do catálogo deve carregar com sucesso
    await expect(page).toHaveTitle('Hub de Leitura - Catálogo');

    // 2. Inspecionar os dados de um card de livro (ex: '1984')
    const bookCard = page.locator('#book-list > div').first();

    // expect: A imagem do livro deve ser exibida
    await expect(page.getByRole('img', { name: '1984' })).toBeVisible();

    // expect: O badge com número de exemplares disponíveis deve ser exibido
    await expect(bookCard.locator('.badge')).toBeVisible();

    // expect: O título do livro ('1984') deve ser visível e clicável
    await expect(page.getByRole('link', { name: '1984' })).toBeVisible();

    // expect: O nome do autor ('George Orwell') deve ser exibido
    await expect(page.getByText('George Orwell').first()).toBeVisible();

    // expect: A categoria ('Ficção') deve ser exibida
    await expect(bookCard.getByText('Ficção')).toBeVisible();

    // expect: O resumo/descrição do livro deve ser exibido
    await expect(bookCard.getByText('1984 é um romance distópico')).toBeVisible();

    // expect: O botão 'Adicionar à Cesta' deve estar presente e habilitado
    await expect(page.getByRole('button', { name: ' Adicionar à Cesta' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: ' Adicionar à Cesta' }).first()).toBeEnabled();

    // expect: O botão 'Ver Detalhes' deve estar presente e habilitado
    await expect(page.getByRole('button', { name: ' Ver Detalhes' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: ' Ver Detalhes' }).first()).toBeEnabled();
  });
});
