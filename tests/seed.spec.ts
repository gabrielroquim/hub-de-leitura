// spec: specs/catalog-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Test criar usuario', () => {
  test('seed - registro de usuário', async ({ page }) => {
    // 1. Abrir a página de registro
    await page.goto('http://localhost:3000/register.html');

    // Dados do usuário (email único por timestamp)
    const timestamp = Date.now();
    const email = `teste+${timestamp}@example.com`;

    // 2. Preencher nome
    await page.fill('#name', 'gabs qa');

    // 3. Preencher email
    await page.fill('#email', email);

    // 4. Preencher telefone (opcional)
    await page.fill('#phone', '(11) 99999-9999');

    // 5. Preencher senha
    await page.fill('#password', 'Senha123!');

    // 6. Confirmar senha
    await page.fill('#confirm-password', 'Senha123!');

    // 7. Marcar termos
    await page.check('#terms-agreement');

    // 8. Clicar em Criar Conta e aguardar redirecionamento para dashboard
    await Promise.all([
      page.waitForURL('**/dashboard.html'),
      page.click('#register-btn')
    ]);

    // Verificar que está no dashboard
    await expect(page).toHaveURL(/dashboard.html/);

    // Verificar que o token de autenticação foi salvo no localStorage
    const token = await page.evaluate(() => localStorage.getItem('authToken'));
    expect(token).not.toBeNull();
  });
});
