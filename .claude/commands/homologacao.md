Você vai configurar um ambiente de homologação gratuito para uma página web usando **GitHub Pages + GitHub Actions**. A cada novo código enviado, o site é atualizado automaticamente.

---

## Etapa 1 — Verificar se o projeto é compatível

Antes de qualquer coisa, verifique se o projeto é uma página web estática:

```bash
cat package.json 2>/dev/null || echo "SEM_PACKAGE_JSON"
```

Analise o resultado e classifique:

**✅ Compatível com GitHub Pages:**
- HTML/CSS/JS puro (sem framework)
- React com Vite (`npm run build` gera pasta `dist/`)
- Next.js com `output: 'export'` no `next.config.js` (gera pasta `out/`)
- Vue.js com Vite
- Qualquer projeto que gere arquivos estáticos após o build

**❌ NÃO compatível — pare aqui e explique:**
- Projeto com backend Node.js, Python, etc.
- Next.js sem `output: 'export'` (usa servidor)
- Qualquer projeto que precise de banco de dados rodando

Se não for compatível, diga:
> "Este projeto tem partes que precisam de um servidor para funcionar, e o GitHub Pages só consegue hospedar páginas estáticas — ou seja, só o visual, sem o 'cérebro' do sistema. Para esse caso, o correto é usar Railway ou Render para homologação. Quer que eu configure isso no lugar?"

Se for compatível, continue.

---

## Etapa 2 — Identificar o framework e pasta de build

Determine qual pasta o projeto gera após o build:

```bash
cat package.json | grep -E '"build"|"scripts"' 2>/dev/null
ls dist/ 2>/dev/null && echo "PASTA_DIST" || echo "SEM_DIST"
ls out/ 2>/dev/null && echo "PASTA_OUT" || echo "SEM_OUT"
ls .next/ 2>/dev/null && echo "NEXT_PROJECT" || echo "NAO_E_NEXT"
```

Mapeie:
- Vite / React / Vue → pasta `dist`
- Next.js com export → pasta `out`
- HTML puro → pasta raiz `.` (sem build)

---

## Etapa 3 — Ajustar Next.js para export estático (se necessário)

Se for Next.js e ainda não tiver `output: 'export'`, atualize o `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

Explique ao usuário:
> "Ajustei uma configuração do Next.js para que ele gere arquivos estáticos que o GitHub Pages consegue hospedar. Isso significa que algumas funcionalidades que dependem do servidor não vão funcionar em homologação — mas para visualizar e testar o visual e fluxos, funciona perfeitamente."

---

## Etapa 4 — Criar a GitHub Action

Crie a pasta e o arquivo de configuração da pipe:

```bash
mkdir -p .github/workflows
```

**Para projetos Vite / React / Vue (pasta `dist`):**

Crie `.github/workflows/homologacao.yml`:

```yaml
name: Homologação — Deploy GitHub Pages

on:
  push:
    branches:
      - main
      - 'release/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Baixar o código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci

      - name: Gerar build de homologação
        run: npm run build
        env:
          NODE_ENV: production

      - name: Preparar para o GitHub Pages
        uses: actions/configure-pages@v4

      - name: Enviar arquivos gerados
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Publicar no GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Para projetos Next.js com export (pasta `out`):**

O mesmo arquivo acima, mas troque `path: dist` por `path: out` e o comando de build:
```yaml
      - name: Gerar build de homologação
        run: npm run build
```

**Para HTML puro (sem build):**

```yaml
name: Homologação — Deploy GitHub Pages

on:
  push:
    branches:
      - main
      - 'release/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Baixar o código
        uses: actions/checkout@v4

      - name: Preparar para o GitHub Pages
        uses: actions/configure-pages@v4

      - name: Enviar arquivos
        uses: actions/upload-pages-artifact@v3
        with:
          path: .

      - name: Publicar no GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Etapa 5 — Ativar o GitHub Pages no repositório

Instrua o usuário passo a passo:

> "Agora preciso que você ative o GitHub Pages no seu repositório. Siga estes passos:
>
> 1. Acesse o repositório no GitHub
> 2. Clique na aba **'Settings'** (última opção no menu superior)
> 3. No menu lateral esquerdo, clique em **'Pages'**
> 4. Em **'Source'**, selecione **'GitHub Actions'** no menu suspenso
> 5. Clique em **'Save'**
>
> Me avise quando tiver feito isso."

---

## Etapa 6 — Commitar e subir a pipe

```bash
git add .github/workflows/homologacao.yml
git commit -m "ci: configura pipeline de homologacao no GitHub Pages"
git push origin main
```

Explique:
> "Subi a configuração da pipe. A partir de agora, toda vez que você enviar código para o repositório, o site de homologação é atualizado automaticamente em alguns minutos."

---

## Etapa 7 — Acompanhar o primeiro deploy

Instrua o usuário a ver o deploy acontecendo:

> "Para ver o deploy em tempo real:
> 1. Acesse o repositório no GitHub
> 2. Clique na aba **'Actions'** (no menu superior)
> 3. Você vai ver uma execução com o nome **'Homologação — Deploy GitHub Pages'**
> 4. Clique nela para ver o progresso — cada etapa aparece com ✅ quando termina
> 5. Quando tudo estiver verde, o site já está no ar
>
> Me avise quando aparecer tudo verde ou se aparecer algum ❌ vermelho — se der erro, me manda um print que eu resolvo."

---

## Etapa 8 — Informar o endereço do site

Após o deploy concluído, o endereço segue o padrão:

```
https://[usuario-github].github.io/[nome-do-repositorio]/
```

Diga ao usuário:
> "Seu site de homologação está no ar! O endereço é:
> **https://[usuario].github.io/[repositorio]/**
>
> Esse link funciona para qualquer pessoa que você quiser mostrar o projeto — sem precisar instalar nada. Toda vez que você enviar código novo, o site atualiza sozinho em 1 a 3 minutos.
>
> ⚠️ Lembre-se: esse é o ambiente de **homologação** — para ver e testar. Quando o projeto estiver pronto para ir ao ar de verdade, usamos o `/publicar` para configurar o deploy de produção."

---

## Problemas comuns — resolva sem perguntar ao usuário

**Erro: `dist` not found**
→ O build não gerou a pasta esperada. Verifique o script de build no `package.json` e ajuste o `path` na Action.

**Erro: permissão negada no deploy**
→ O GitHub Pages não está ativado como "GitHub Actions" nas configurações. Volte à Etapa 5.

**Erro: 404 no site após deploy**
→ Para projetos com rotas (React Router, Next.js), adicione um arquivo `404.html` idêntico ao `index.html` na pasta de build. Adicione este passo na Action antes do upload:
```yaml
      - name: Corrigir rotas para SPA
        run: cp dist/index.html dist/404.html
```

**Site desatualizado após push**
→ Aguarde 2 a 3 minutos. Se persistir, verifique na aba Actions se houve erro.

$ARGUMENTS
