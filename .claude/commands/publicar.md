O usuário quer publicar o projeto para que outras pessoas possam acessar — seja um site, uma API ou um app no celular. Siga este roteiro com cuidado.

---

## Aviso inicial obrigatório

Antes de qualquer passo, diga ao usuário:

> "Publicar um projeto para o mundo é uma etapa importante e tem mais detalhes do que parece. Vou te guiar pelo processo, mas **recomendo fortemente que você envolva um desenvolvedor experiente nessa etapa** — especialmente se o projeto tiver dados de usuários, pagamentos ou informações sensíveis.
>
> Um DEV especializado vai garantir que tudo esteja seguro, configurado corretamente e sem surpresas de custo. Se você não tiver alguém de confiança, posso te ajudar a entender o que buscar num profissional.
>
> Dito isso, vou te explicar todo o processo para você entender o que está acontecendo e conseguir acompanhar."

---

## Etapa 1 — Identificar o tipo de projeto

Pergunte se ainda não souber:
> "O que você quer publicar? É um site, um sistema web, uma API, ou um app para celular?"

Siga para a seção correspondente.

---

## 🌐 SITE OU SISTEMA WEB (Next.js, React, etc.)

### Passo 1 — Conta na Vercel
> "Vamos usar a Vercel para publicar — ela é gratuita e conecta direto com o seu código no GitHub.
> 1. Acesse: https://vercel.com/signup
> 2. Clique em **'Continue with GitHub'**
> 3. Autorize o acesso clicando em **'Authorize Vercel'**
> 4. Me avise quando tiver feito o cadastro."

### Passo 2 — Conectar o repositório
> "Agora vamos conectar seu projeto:
> 1. Na tela inicial da Vercel, clique em **'Add New Project'**
> 2. Encontre o repositório do seu projeto na lista e clique em **'Import'**
> 3. Na próxima tela, não mexa em nada por enquanto — só clique em **'Deploy'**
> 4. Aguarde a bolinha ficar verde — isso leva uns 2 minutos
> 5. Quando aparecer 'Congratulations', clique em **'Continue to Dashboard'**
> 6. Me manda o link que aparece ali (termina em `.vercel.app`) — vou verificar se está tudo ok"

### Passo 3 — Variáveis de ambiente (se houver .env)
> "Seu projeto usa um arquivo `.env` com configurações? Se sim, preciso que você:
> 1. No painel da Vercel, clique no seu projeto
> 2. Vá em **'Settings'** → **'Environment Variables'**
> 3. Para cada linha do seu `.env`, adicione o nome e o valor
> 4. Clique em **'Save'** e depois em **'Redeploy'** no menu **'Deployments'**"

### Passo 4 — Domínio próprio (opcional)
> "O link `.vercel.app` já funciona para todo mundo. Se quiser um endereço próprio como `meusite.com.br`, isso envolve comprar um domínio (~R$ 40–60/ano no Registro.br) e configurar o DNS. **Recomendo fazer isso com ajuda de um DEV** — é simples para quem sabe, mas tem detalhes que podem travar quem está fazendo pela primeira vez."

---

## ⚙️ API / BACKEND (Node.js, Python, etc.)

### Passo 1 — Conta no Railway
> "Vamos usar o Railway para publicar sua API — tem plano gratuito e é bem simples.
> 1. Acesse: https://railway.app
> 2. Clique em **'Login with GitHub'**
> 3. Autorize o acesso
> 4. Me avise quando estiver dentro do Railway."

### Passo 2 — Criar o projeto
> "Agora:
> 1. Clique em **'New Project'**
> 2. Escolha **'Deploy from GitHub repo'**
> 3. Selecione o repositório do seu projeto
> 4. O Railway vai detectar automaticamente o tipo de projeto e começar o deploy
> 5. Quando terminar, clique no projeto e depois em **'Settings'** → **'Networking'** → **'Generate Domain'**
> 6. Me manda o link que aparecer — vou testar se a API está respondendo"

### Passo 3 — Variáveis de ambiente
> "Se seu projeto usa `.env`:
> 1. No Railway, clique no seu serviço
> 2. Vá na aba **'Variables'**
> 3. Clique em **'New Variable'** e adicione cada configuração do seu `.env`
> 4. O Railway vai reiniciar o projeto automaticamente"

---

## 📱 APP MOBILE (React Native / Expo)

> "Publicar um app no celular de outras pessoas é o processo mais complexo dos três. Ele envolve aprovação das lojas (Google e Apple), certificados digitais e configurações específicas. **Para esse processo em particular, recomendo muito que você conte com um desenvolvedor experiente** — os erros aqui podem atrasar o lançamento em semanas.
>
> Dito isso, vou te explicar o caminho para você entender o que vai acontecer."

### Para Android (Google Play)

**Conta de desenvolvedor:**
> "1. Acesse: https://play.google.com/console/signup
> 2. Faça login com uma conta Google
> 3. Pague a taxa única de **US$ 25** (não se repete)
> 4. Preencha os dados da sua conta de desenvolvedor
> 5. Me avise quando tiver acesso ao Console"

**Gerar o app para publicação:**
> "Com o Expo, o processo é:
> 1. No terminal do projeto, rode: `eas build --platform android`
> 2. Se for a primeira vez, ele vai pedir para criar uma conta no Expo — acesse https://expo.dev/signup
> 3. Siga as instruções no terminal — ele vai gerar o arquivo do app automaticamente
> 4. Quando terminar, me manda o link do arquivo gerado"

**Publicar na loja:**
> "Com o arquivo em mãos:
> 1. No Google Play Console, clique em **'Criar app'**
> 2. Preencha nome, descrição e screenshots do app
> 3. Em **'Versões'** → **'Produção'**, faça upload do arquivo gerado
> 4. Submeta para revisão — o Google leva de 1 a 7 dias para aprovar
> 5. **Esse processo de submissão recomendo fazer com um DEV ao lado** — há detalhes de classificação etária, política de privacidade e configurações que precisam estar certos para não ser rejeitado"

### Para iPhone (App Store)

> "Publicar na App Store é ainda mais criterioso que o Android. A Apple tem regras rígidas e rejeita apps por motivos que não são óbvios para quem está fazendo pela primeira vez.
>
> **Para iOS, recomendo fortemente contratar um DEV experiente para essa etapa.** O processo envolve:
> - Conta Apple Developer: **US$ 99/ano** (obrigatório)
> - Certificados e perfis de provisionamento (configuração técnica complexa)
> - Revisão da Apple que pode levar de 1 a 3 dias — e pode ser rejeitado
>
> Se quiser seguir mesmo assim, me avise e vou te guiar passo a passo. Mas considere o aviso."

---

## Encerramento

Após concluir o processo, diga:

> "Seu projeto está no ar! 🎉
>
> Algumas coisas importantes agora que está publicado:
> - **Monitore os custos** — fique de olho nos painéis dos serviços para não ter surpresa
> - **Não compartilhe credenciais** — o link público é para usuários, não para as suas senhas de painel
> - **Qualquer mudança no código** vai precisar de um novo deploy — posso te ensinar como fazer isso quando chegar a hora
>
> E reforço: para evoluir esse projeto com mais usuários, integrações ou funcionalidades novas, vale muito a pena ter um DEV de confiança acompanhando. O que fizemos aqui é um ótimo começo."

$ARGUMENTS
