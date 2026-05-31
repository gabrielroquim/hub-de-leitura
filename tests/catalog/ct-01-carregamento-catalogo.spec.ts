import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { attachment, step } from 'allure-js-commons'; // Importação corrigida para evitar 'deprecated'

test.describe('Catálogo - Carregamento e Exibição com foco em Acessibilidade', () => {
  test('CT-01 - Carregamento bem-sucedido do catálogo', async ({ page }) => {
    // 1. Acessar http://localhost:3000/catalog.html
    await page.goto('http://localhost:3000/catalog.html');

    // expect: A página deve carregar com o título 'Hub de Leitura - Catálogo'
    await expect(page).toHaveTitle('Hub de Leitura - Catálogo');

    // expect: O cabeçalho deve exibir 'Hub de Leitura' e 'Seu Portal do Conhecimento'
    await expect(page.getByRole('heading', { level: 1, name: 'Hub de Leitura' })).toBeVisible();
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

    // *** IMPORTANTE: SUBSTITUA OS IDs ABAIXO PELOS IDs REAIS DOS SEUS ELEMENTOS <select> NO catalog.html ***
    // Se você corrigiu o HTML adicionando aria-label, pode usar:
    // await expect(page.getByRole('combobox', { name: 'Todas as Categorias' })).toBeVisible();
    // await expect(page.getByRole('combobox', { name: 'Todas as Editoras' })).toBeVisible();
    // await expect(page.getByRole('combobox', { name: 'Todos os livros' })).toBeVisible();
    // Caso contrário, use os locators com ID (substitua os placeholders):
    await expect(page.locator('#category-filter')).toBeVisible(); // <--- SUBSTITUA ESTE ID!
    await expect(page.locator('#editor-filter')).toBeVisible();   // <--- SUBSTITUA ESTE ID!
    await expect(page.locator('#availability-filter')).toBeVisible();     // <--- SUBSTITUA ESTE ID!

    // 4. Verificar a exibição dos livros
    // expect: O contador deve exibir 'Exibindo 12 de 23 livros'
    await expect(page.getByText('Exibindo 12 de 23 livros')).toBeVisible();


    // expect: Os botões de alternância de visualização (grade e lista) devem estar visíveis
    await expect(page.getByRole('group', { name: 'Visualização' })).toBeVisible();
    await expect(page.getByTitle('Visualização em grade')).toBeVisible();
    await expect(page.getByTitle('Visualização em lista')).toBeVisible();

    // expect: Pelo menos 12 cards de livros devem ser exibidos na grade
    await expect(page.locator('#book-list > div')).toHaveCount(12);

    // --- Integração com Allure para Verificação de Acessibilidade (WCAG) ---
    await step('Verificação de Acessibilidade (WCAG)', async () => { // <--- Passo principal para acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        // Anexar o JSON completo das violações ao relatório Allure.
        await attachment(
          'accessibility-violations.json',
          JSON.stringify(accessibilityScanResults.violations, null, 2),
          'application/json'
        );

        // Criar um passo aninhado para cada violação principal
        for (const violation of accessibilityScanResults.violations) {
          await step(`Violação [${violation.impact || 'N/A'}]: ${violation.id} - ${violation.description}`, async () => {
            // Detalhes da violação, incluindo tags WCAG e elementos afetados
            const details = `Impacto: ${violation.impact || 'N/A'}\n` +
                            `Ajuda: ${violation.helpUrl}\n` +
                            `Tags WCAG: ${violation.tags.filter(tag => tag.startsWith('wcag')).join(', ')}\n` +
                            `Elementos afetados:\n${violation.nodes.map(node => `  - ${node.html}`).join('\n')}`;
            await attachment('Detalhes da Violação', details, 'text/plain');
          });
        }

        // Anexar um sumário geral das violações
        const violationSummary = accessibilityScanResults.violations.map(v => `${v.id}: ${v.description}`).join('\n');
        await attachment('Sumário das Violações', violationSummary, 'text/plain');

        // expect: Não deve haver violações de acessibilidade (esta linha fará o teste falhar se houver violações)
        expect(accessibilityScanResults.violations).toEqual([]);
      } else {
        // Se não houver violações, adicionar um passo indicando sucesso
        await step('Nenhuma violação de acessibilidade WCAG encontrada.', async () => {});
      }
    }); // Fim do passo principal de acessibilidade
    // --- Fim da Integração com Allure ---

  });
});