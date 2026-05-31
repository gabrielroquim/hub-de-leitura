import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

// URL de uma página de teste de câmera/microfone confiável
const testPageUrl = 'https://webrtc.github.io/samples/src/content/getusermedia/gum/';

test.describe('Controle de Permissões de Câmera e Microfone', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // Configuração para os testes de permissão concedida
  test.beforeAll(async () => {
    // Lança o navegador com flags para usar câmera/microfone falsos
    // Isso garante que a permissão será concedida automaticamente e um stream falso será usado
    browser = await chromium.launch({
      args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    });
  });

  // Fecha o navegador após todos os testes
  test.afterAll(async () => {
    await browser.close();
  });

  // Fecha o contexto após cada teste para garantir isolamento
  test.afterEach(async () => {
    if (context) {
      await context.close();
    }
  });

  test('Deve permitir e depois negar acesso à câmera', async () => {
    // --- Parte 1: Câmera Habilitada ---
    console.log('--- Teste: Câmera Habilitada ---');

    // 1. Criar um novo contexto de navegador (com permissões já garantidas pelas flags do browser)
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(testPageUrl);

    // 2. Verificar se a câmera foi acessada (o vídeo deve estar visível)
    await expect(page.locator('video#gum-local')).toBeVisible({ timeout: 15000 });
    console.log('Verificação 1: Câmera foi acessada com sucesso (vídeo visível).');

    // --- Parte 2: Câmera Desabilitada ---
    console.log('\n--- Teste: Câmera Desabilitada ---');

    await context.close(); // Fecha o contexto com permissão concedida

    // Lançar um NOVO BROWSER para a parte de negação, SEM as flags de mídia falsas
    const deniedBrowser = await chromium.launch();
    const deniedContext = await deniedBrowser.newContext();

    // Adiciona um script de inicialização para "mockar" getUserMedia
    // Isso garante que qualquer chamada a getUserMedia falhará com um erro de permissão negada
    await deniedContext.addInitScript(() => {
      // @ts-ignore
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        throw new DOMException('Permission denied by Playwright mock', 'NotAllowedError');
      };
    });

    const deniedPage = await deniedContext.newPage();
    await deniedPage.goto(testPageUrl);

    // Verificar se a câmera foi negada (o vídeo NÃO deve estar visível)
    await expect(deniedPage.locator('video#gum-local')).not.toBeVisible({ timeout: 15000 });
    console.log('Verificação 2: Acesso à câmera foi negado, como esperado (vídeo não visível).');

    await deniedContext.close();
    await deniedBrowser.close();
  });

  test('Deve permitir e depois negar acesso ao microfone', async () => {
    // --- Parte 1: Microfone Habilitado ---
    console.log('--- Teste: Microfone Habilitado ---');

    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(testPageUrl);

    // Verificar se o microfone foi acessado com sucesso
    const hasAudioStream = await page.evaluate(() => {
      return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            stream.getTracks().forEach(track => track.stop());
            resolve(true);
          })
          .catch(error => {
            console.error('Erro ao acessar microfone no evaluate:', error);
            resolve(false);
          });
      });
    });
    expect(hasAudioStream).toBe(true);
    console.log('Verificação 1: Microfone foi acessado com sucesso.');

    // --- Parte 2: Microfone Desabilitado ---
    console.log('\n--- Teste: Microfone Desabilitado ---');

    await context.close(); // Fecha o contexto com permissão concedida

    // Lançar um NOVO BROWSER para a parte de negação, SEM as flags de mídia falsas
    const deniedBrowser = await chromium.launch();
    const deniedContext = await deniedBrowser.newContext();

    // Adiciona um script de inicialização para "mockar" getUserMedia
    // Isso garante que qualquer chamada a getUserMedia falhará com um erro de permissão negada
    await deniedContext.addInitScript(() => {
      // @ts-ignore
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        throw new DOMException('Permission denied by Playwright mock', 'NotAllowedError');
      };
    });

    const deniedPage = await deniedContext.newPage();
    await deniedPage.goto(testPageUrl);

    // Verificar se o acesso ao microfone foi negado
    const hasAudioStreamDenied = await deniedPage.evaluate(() => {
      return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            stream.getTracks().forEach(track => track.stop());
            resolve(true);
          })
          .catch(error => {
            console.error('Erro ao acessar microfone no evaluate (negado):', error);
            resolve(false);
          });
      });
    });
    expect(hasAudioStreamDenied).toBe(false);
    console.log('Verificação 2: Acesso ao microfone foi negado, como esperado.');

    await deniedContext.close();
    await deniedBrowser.close();
  });
});