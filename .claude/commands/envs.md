Você vai configurar o gerenciamento seguro de variáveis de ambiente do projeto usando o **dotenvx** — uma ferramenta que permite guardar as configurações do projeto no repositório de forma criptografada (embaralhada), sem expor dados sensíveis.

---

## O que você vai fazer

1. Instalar o dotenvx no projeto
2. Criar ou usar o arquivo `.env` existente
3. Criptografar o arquivo e gerar uma chave secreta
4. Explicar ao usuário o que a chave é e o que fazer com ela
5. Ajustar o `.gitignore` corretamente
6. Commitar o arquivo criptografado com segurança

---

## Etapa 1 — Verificar se já existe um .env

```bash
ls -la .env* 2>/dev/null || echo "NENHUM_ENV"
```

- Se existir `.env`: use ele como base
- Se não existir: pergunte ao usuário quais variáveis o projeto precisa antes de criar

Se precisar criar do zero, pergunte:
> "Seu projeto precisa de alguma configuração especial para rodar? Por exemplo: chave de API, endereço do banco de dados, senha de serviço? Me lista o que você tem e eu monto o arquivo."

---

## Etapa 2 — Instalar o dotenvx

```bash
npm install @dotenvx/dotenvx --save-dev
```

Se o projeto não tiver `package.json` ainda:
```bash
npm init -y && npm install @dotenvx/dotenvx --save-dev
```

Confirme a instalação:
```bash
npx dotenvx --version
```

---

## Etapa 3 — Criptografar o .env

Execute o comando de criptografia:

```bash
npx dotenvx encrypt
```

Esse comando vai:
- Criptografar o conteúdo do `.env`
- Gerar um arquivo `.env.keys` com a chave secreta
- Transformar o `.env` em `.env` com valores embaralhados (seguro para o git)

Capture a saída e identifique a chave gerada — ela aparece no arquivo `.env.keys` com o formato:
```
DOTENV_KEY_DEVELOPMENT="dotenv://:key_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@dotenvx.com/vault/.env.vault?environment=development"
```

---

## Etapa 4 — Exibir aviso sobre a chave

Este é o passo mais importante. Mostre ao usuário a chave gerada e explique com clareza:

---

> ## 🔑 ATENÇÃO — CHAVE SECRETA GERADA
>
> Uma chave secreta foi criada para proteger as configurações do seu projeto. Ela está no arquivo `.env.keys` e se parece com isso:
> ```
> DOTENV_KEY_DEVELOPMENT="dotenv://:key_xxxx..."
> ```
>
> **Essa chave é como a senha do seu projeto.** Sem ela, ninguém consegue usar as configurações — nem você em outro computador.
>
> ### O que você PRECISA fazer agora:
>
> 1. **Guarde essa chave em um lugar seguro** — pode ser no seu gerenciador de senhas, num documento privado, ou no próprio painel do serviço onde vai rodar o projeto (Vercel, Railway, etc.)
>
> 2. **Compartilhe essa chave com qualquer pessoa que for trabalhar neste projeto** — sem ela, a outra pessoa não consegue rodar o projeto na máquina dela. Mande por mensagem privada, nunca por e-mail ou chat público.
>
> 3. **NUNCA suba o arquivo `.env.keys` para o git** — ele vai ser bloqueado automaticamente, mas fique de olho. Se esse arquivo vazar, qualquer pessoa pode descriptografar suas configurações.
>
> 4. **Em produção (Vercel, Railway, etc.)**: você vai precisar adicionar essa chave como variável de ambiente no painel do serviço. Quando chegar nessa etapa, me avise e eu te guio.
>
> ---
> Cola aqui a chave que apareceu no seu `.env.keys` para eu confirmar que está tudo certo antes de continuar.

---

Aguarde o usuário colar a chave antes de prosseguir.

---

## Etapa 5 — Ajustar o .gitignore

Garanta que o `.gitignore` está correto — o `.env` original NÃO vai para o git, mas o `.env` criptografado SIM:

```bash
# Verifique o .gitignore atual
cat .gitignore 2>/dev/null || echo "GITIGNORE_AUSENTE"
```

O `.gitignore` deve conter:
```
# Variáveis de ambiente — NUNCA subir para o git
.env.keys
.env.local
.env*.local

# O .env criptografado pelo dotenvx PODE subir (é seguro)
# .env   ← NÃO bloqueie esta linha
```

Se o `.gitignore` não existir ou estiver incompleto, crie ou atualize:

```bash
cat >> .gitignore << 'EOF'

# Chave de criptografia do dotenvx — NUNCA subir para o git
.env.keys
.env.local
.env*.local
EOF
```

---

## Etapa 6 — Verificar o que vai para o git

```bash
git status
git diff .env 2>/dev/null | head -30
```

Confirme visualmente com o usuário:
> "Veja o que vai ser salvo no repositório. O arquivo `.env` agora tem os valores criptografados — parece um monte de letras e números embaralhados. Isso é correto e seguro. O arquivo `.env.keys` (que tem a chave real) **não aparece na lista** — ele está bloqueado e não vai subir."

---

## Etapa 7 — Commitar o .env criptografado

```bash
git add .env .gitignore
git commit -m "chore: adiciona variaveis de ambiente criptografadas com dotenvx"
```

---

## Etapa 8 — Instruir sobre como usar no dia a dia

Explique ao usuário como rodar o projeto com as variáveis descriptografadas:

> "Para rodar o projeto agora, você vai usar o dotenvx no lugar do node/comando normal. Em vez de:
> ```
> node app.js
> ```
> Use:
> ```
> npx dotenvx run -- node app.js
> ```
> Ou, se tiver um script no `package.json`:
> ```
> npx dotenvx run -- npm run dev
> ```
> O dotenvx descriptografa as variáveis automaticamente usando a chave que está no `.env.keys`."

Se o projeto usar Next.js, adicione ao `package.json`:
```json
"scripts": {
  "dev": "dotenvx run -- next dev",
  "build": "dotenvx run -- next build",
  "start": "dotenvx run -- next start"
}
```

---

## Etapa 9 — Instruir sobre compartilhar com outra pessoa

Finalize com:

> "Se outra pessoa for clonar este repositório e rodar o projeto, ela precisa seguir estes passos:
>
> 1. Clonar o repositório normalmente
> 2. Rodar `npm install`
> 3. Criar um arquivo `.env.keys` na raiz do projeto
> 4. Colar dentro dele a chave que você vai compartilhar com ela
> 5. Rodar o projeto normalmente com `npx dotenvx run -- npm run dev`
>
> Sem a chave, o projeto vai dar erro de configuração — isso é esperado e significa que a proteção está funcionando.
>
> **Lembra de compartilhar a chave por mensagem privada, nunca em e-mail ou grupo público.**"

$ARGUMENTS
