// spec: .github/prompts/prompt-agent.md
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Cadastro de Novo Usuário', () => {
  test('Cadastro de novo usuário - fluxo completo', async ({ page }) => {
    // Geração de dados dinâmicos
    const fullName = faker.person.fullName();
    const timestamp = Date.now();
    const email = `${fullName.replace(/\s+/g, '.').toLowerCase()}.${timestamp}@example.com`;
    // gera 11 dígitos, ex: "11987654321"
    const raw = faker.string.numeric(11);
    const phone = raw.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    const password = `Aa1!${faker.string.numeric(6)}`; // garante maiúscula, minúscula, número e símbolo

    // 1. Navegar para a URL de registro
    await page.goto('http://localhost:3000/register.html');

    // 2. Preencher o campo Nome Completo
    await page.getByPlaceholder('Seu nome completo').fill(fullName);

    // 3. Preencher o campo Email
    await page.getByPlaceholder('seu@email.com').fill(email);

    // 4. Preencher o campo Telefone
    await page.getByPlaceholder('(11) 99999-9999').fill(phone);

    // 5. Preencher o campo Senha
    await page.getByPlaceholder('Crie uma senha segura').fill(password);

    // 6. Preencher o campo Confirmar Senha
    await page.getByPlaceholder('Confirme sua senha').fill(password);

    // 7. Marcar o checkbox de termos
    await page.locator('#terms-agreement').check();

    // 8. Clicar no botão "Criar Conta" e aguardar redirecionamento para o dashboard
    await Promise.all([
      page.waitForURL('**/dashboard.html', { timeout: 10000 }),
      page.getByRole('button', { name: /Criar Conta/i }).click(),
    ]);

    // Validações
    // - URL contém /dashboard.html
    await expect(page).toHaveURL(/dashboard.html/);

    // - O nome do usuário é exibido no dashboard (verifica que houve login automático)
    const firstName = fullName.split(' ')[0];
    await expect(page.locator('#user-name')).toContainText(firstName, { timeout: 5000 });

    // - Nenhuma mensagem de erro visível
    await expect(page.locator('#alert-container')).not.toContainText(/erro|email ja|senha fraca|email já cadastrado/i);
  });
});
