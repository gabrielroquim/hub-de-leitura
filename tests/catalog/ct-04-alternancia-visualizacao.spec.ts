// spec: specs/catalog-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catálogo - Carregamento e Exibição', () => {
  test('CT-04 - Alternância entre visualização em grade e lista', async ({ page }) => {
    // 1. Acessar http://localhost:3000/catalog.html
    await page.goto('http://localhost:3000/catalog.html');

    // expect: A página deve carregar com visualização em grade (padrão)
    await expect(page.getByTitle('Visualização em grade')).toHaveClass(/active/);
    await expect(page.getByText('Exibindo 12 de 23 livros')).toBeVisible();

    // 2. Clicar no botão de visualização em lista (ícone de lista)
    await page.getByTitle('Visualização em lista').click();

    // expect: Os livros devem ser reorganizados em formato de lista horizontal
    await expect(page.getByText('Exibindo 20 de 23 livros')).toBeVisible();

    // expect: O botão de visualização em lista deve indicar estar ativo
    await expect(page.getByTitle('Visualização em lista')).toHaveClass(/active/);
    await expect(page.getByTitle('Visualização em grade')).not.toHaveClass(/active/);

    // 3. Clicar no botão de visualização em grade (ícone de grade)
    await page.getByTitle('Visualização em grade').click();

    // expect: Os livros devem voltar ao formato de grade
    await expect(page.getByText('Exibindo 12 de 23 livros')).toBeVisible();

    // expect: O botão de visualização em grade deve indicar estar ativo
    await expect(page.getByTitle('Visualização em grade')).toHaveClass(/active/);
    await expect(page.getByTitle('Visualização em lista')).not.toHaveClass(/active/);
  });
});
