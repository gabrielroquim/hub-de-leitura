// spec: specs/catalog-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catálogo - Carregamento e Exibição', () => {
  test('CT-03 - Paginação do catálogo', async ({ page }) => {
    // 1. Acessar http://localhost:3000/catalog.html
    await page.goto('http://localhost:3000/catalog.html');

    // expect: O catálogo deve exibir 'Exibindo 12 de 23 livros' na primeira página
    await expect(page.getByText('Exibindo 12 de 23 livros')).toBeVisible();

    // 2. Verificar os controles de paginação
    const pagination = page.locator('nav[aria-label="Page navigation"]');

    // expect: Os links de página '1', '2' e 'Próximo' devem estar visíveis na navegação de paginação
    await expect(pagination.getByRole('link', { name: '1' })).toBeVisible();
    await expect(pagination.getByRole('link', { name: '2' })).toBeVisible();
    await expect(pagination.getByRole('link', { name: 'Próximo ' })).toBeVisible();

    // 3. Clicar no link de página '2'
    await pagination.getByRole('link', { name: '2' }).click();

    // expect: A segunda página deve carregar
    // expect: O contador deve exibir 'Exibindo 23 de 23 livros'
    await expect(page.getByText('Exibindo 23 de 23 livros')).toBeVisible();

    // expect: Os livros restantes (11 livros) devem ser exibidos na segunda página
    await expect(page.locator('#book-list > div')).toHaveCount(11);

    // 4. Clicar no link de página '1'
    await page.locator('#pagination').getByRole('link', { name: '1' }).click();

    // expect: A primeira página deve ser exibida novamente com 12 livros
    await expect(page.getByText('Exibindo 12 de 23 livros')).toBeVisible();
    await expect(page.locator('#book-list > div')).toHaveCount(12);
  });
});
