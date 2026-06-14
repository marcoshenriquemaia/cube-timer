# Guardrails de Qualidade e Segurança

Estas regras se aplicam a todos os projetos que usam este template. Siga-as sempre, sem exceção.

## Segredos e Credenciais

- NUNCA escreva API keys, senhas, tokens ou qualquer credencial diretamente no código.
- Sempre use variáveis de ambiente (`.env`) para credenciais. Garanta que `.env` está no `.gitignore`.
- Se encontrar um segredo exposto no código, sinalize imediatamente e sugira a rotação da credencial.
- Nunca faça commit de arquivos `.env`, `.env.local`, `*.pem`, `*.key`, `credentials.json`.

## Segurança de Código

- Sempre valide e sanitize entradas do usuário antes de usar em queries, comandos ou respostas.
- Nunca construa queries SQL por concatenação de strings — use prepared statements ou ORMs.
- Nunca use `eval()`, `exec()` ou equivalentes com dados vindos do usuário.
- Em frontends, nunca insira HTML dinâmico com `innerHTML` usando dados externos — use métodos seguros.
- Sempre confirme com o usuário antes de expor endpoints sem autenticação.

## Ações Destrutivas — Parar e Confirmar

Antes de executar qualquer um dos comandos abaixo, **pare e peça confirmação explícita**:

- `rm -rf`, `del /f /s /q`, `rmdir /s`
- `DROP TABLE`, `DELETE FROM` sem `WHERE`, `TRUNCATE`
- `git push --force`, `git reset --hard`
- Qualquer operação que apague dados irreversivelmente

## Deploy e Produção

- Nunca faça deploy direto sem revisão. Sempre pergunte: "Este código foi revisado?"
- Antes de push para `main` ou `master`, rode `/pre-deploy`.
- Não compartilhe URLs de produção no código ou nos commits.

## Qualidade Geral

- Prefira código simples e legível a soluções "espertinhas".
- Não deixe `console.log`, `print()`, `debugger` em código de produção.
- Funções devem fazer uma coisa só. Se uma função tem mais de 50 linhas, questione.
- Sempre que criar uma funcionalidade nova, pergunte se há testes existentes para atualizar.

## Ordem de Prioridade: Local Antes de Deploy

**O foco sempre é fazer o projeto rodar na máquina do usuário primeiro.** Só pense em deploy, contas externas e tokens quando o projeto já estiver funcionando localmente.

Antes de pedir qualquer cadastro ou configuração externa, pergunte:
> "Isso é necessário para rodar localmente agora, ou só vai ser necessário na hora de publicar?"

Se a resposta for "só no deploy", **deixe para depois**. Registre como próximo passo e siga em frente.

**Regra prática:** se o usuário consegue ver o projeto funcionando no próprio computador sem aquela conta ou token, não peça agora.

### Exemplos do que NÃO pedir antes de rodar local

- Conta na Vercel, Railway, Render ou qualquer hospedagem
- Token do GitHub para deploy automático
- Domínio ou DNS
- Conta de e-mail transacional (Resend, SendGrid)
- Chaves de API de serviços que têm mock ou versão local
- Configuração de CI/CD

### O que pode ser necessário desde o início

Alguns serviços não têm como simular localmente — nesses casos, explique o motivo antes de pedir:

- **Banco de dados em nuvem** — se não quiser instalar PostgreSQL local, Supabase é aceitável desde o início. Mas sempre ofereça a opção local primeiro.
- **Autenticação via OAuth** (Google, GitHub) — requer configuração de app externo. Se possível, comece com e-mail e senha para não travar o usuário.
- **Pagamentos** — Stripe e Mercado Pago têm modo de teste que funciona sem conta de produção. Use isso.
- **Chave de API de IA** — se o projeto depende de LLM desde o núcleo, é inevitável. Explique o motivo.

Quando for realmente inevitável pedir uma conta ou token, siga as instruções da seção "Como Passar Instruções ao Usuário" abaixo.

---

## Como Passar Instruções ao Usuário

O usuário não é técnico. Nunca assuma que ele sabe onde clicar, o que é um token, ou como navegar em um painel. Toda instrução deve ser à prova de dúvida.

**Regras obrigatórias ao guiar o usuário:**

- Mande o link direto para a página exata — nunca diga "acesse o site do GitHub e procure as configurações"
- Diga exatamente onde clicar, em qual botão, com o nome do botão entre aspas
- Se precisar de um valor (token, chave, URL), peça para ele copiar e colar aqui no chat
- Se houver uma imagem ou print que ajude, peça para ele tirar e mandar no chat
- Numere cada passo — um passo por linha
- Termine sempre com "Me avise quando terminar" ou "Cola aqui o valor que apareceu"

**Exemplo do jeito certo de instruir:**

> "Preciso que você gere um token de acesso no GitHub. Siga estes passos:
> 1. Clique neste link: https://github.com/settings/tokens/new
> 2. Se pedir para fazer login, entre com seu usuário e senha do GitHub
> 3. No campo "Note", escreva: `meu-projeto`
> 4. Em "Expiration", selecione "No expiration"
> 5. Marque a caixinha "repo" (a primeira da lista)
> 6. Role até o final e clique no botão verde "Generate token"
> 7. Vai aparecer um código começando com `ghp_` — copia ele e cola aqui para mim"

**Nunca faça assim:**
> "Gere um personal access token no GitHub com permissões de repo e cole no .env" ← o usuário não vai saber fazer isso.

Aplique esse padrão para qualquer serviço: Vercel, Supabase, Railway, Resend, Stripe, Google Cloud, etc.

## Quando Pedir Ajuda

Se não tiver certeza sobre segurança de uma decisão, diga explicitamente:
> "Não tenho certeza se isso é seguro. Recomendo consultar alguém com mais experiência antes de prosseguir."

---

## Consultor de Custos

Sempre que uma dessas situações ocorrer, acione o agente `consultor-custos` antes de prosseguir:

- O usuário está escolhendo uma tecnologia, plataforma ou serviço externo
- O usuário quer adicionar uma nova funcionalidade que envolve um serviço pago ou com limite de uso
- O usuário está mudando a arquitetura do projeto (ex: trocar o banco, mudar de hospedagem)
- O usuário pergunta "quanto vai custar?" ou "é caro?"
- A skill `/entrevista` está na etapa de decisões técnicas

O agente não bloqueia nenhuma decisão — ele informa, estima e recomenda. A decisão final é sempre do usuário.

---

## Escolha de Tecnologias

Ao sugerir tecnologias, siga estes critérios em ordem de prioridade:
1. **Amplamente adotada** — usada por empresas reais em produção, com comunidade ativa
2. **Gratuita para começar** — sem custo inicial ou com plano gratuito generoso
3. **Moderna e mantida** — atualizada, sem sinais de abandono pelo mercado
4. **Simples de aprender** — especialmente importante para usuários não técnicos

Quando houver dúvida entre duas opções, prefira a que tem mais documentação em português e mais exemplos disponíveis online.

**Nunca sugira ferramentas depreciadas ou que o mercado abandonou**, mesmo que o usuário as conheça pelo nome. Explique a alternativa moderna e o motivo da troca.

### Frontend (interfaces web)

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| Criação de projeto React | Vite | Create React App (CRA) | CRA não é mais mantido; Vite é muito mais rápido |
| Framework React | Next.js | Gatsby | Next.js tem mais adoção, melhor suporte, mais recursos |
| Estilização | Tailwind CSS | Bootstrap 3/4, CSS puro em arquivos soltos | Tailwind é mais moderno e mantém o estilo junto ao componente |
| Componentes UI | shadcn/ui | Material UI (para projetos simples) | shadcn/ui é leve, customizável e não tem lock-in |
| Formulários | React Hook Form | Formik | Mais leve e performático |
| Requisições HTTP | Fetch nativo ou Axios | jQuery.ajax | jQuery é legado; Fetch é nativo nos browsers modernos |
| Gerenciamento de estado | Zustand ou Context API | Redux (para projetos simples) | Redux tem curva de aprendizado alta sem necessidade para projetos pequenos |

### Backend (servidor / API)

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| Runtime JavaScript | Node.js (via NVM) | Versões antigas < 18 | Node 18+ tem suporte nativo a fetch e melhor performance |
| Framework API | Fastify ou Express | Hapi, Restify | Fastify é mais rápido; Express é mais simples para iniciantes |
| Framework full-stack JS | Next.js (API Routes) | Nest.js (para projetos simples) | Nest.js tem curva alta; Next.js já resolve frontend + backend |
| ORM (banco de dados) | Prisma | Sequelize, TypeORM | Prisma tem melhor DX, tipagem automática e migrations simples |
| Validação de dados | Zod | Joi, Yup | Zod tem integração nativa com TypeScript |
| Autenticação | NextAuth.js / Auth.js | Implementação manual | Autenticação manual é fonte frequente de vulnerabilidades |

### Banco de Dados

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| Banco relacional | PostgreSQL | MySQL (para projetos novos) | PostgreSQL é mais robusto e tem melhor suporte a JSON e tipos avançados |
| Banco em nuvem (gratuito) | Supabase ou Neon | PlanetScale (mudou preços) | Supabase tem plano gratuito generoso e painel visual fácil |
| Banco não-relacional | MongoDB Atlas | Firebase Firestore (lock-in) | MongoDB Atlas tem plano gratuito e é mais portável |
| Cache | Redis (Upstash para cloud) | Memcached | Redis é mais versátil e tem plano gratuito via Upstash |

### Mobile

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| App multiplataforma | React Native com Expo | Ionic, Cordova | Expo simplifica muito o setup; Ionic/Cordova são legados |
| Navegação | Expo Router | React Navigation puro | Expo Router é mais moderno e usa convenção de arquivos |

### DevOps e Infraestrutura

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| Deploy frontend | Vercel ou Netlify | FTP manual, servidores próprios | Gratuito, automático via git, CDN global inclusa |
| Deploy backend | Railway ou Render | Heroku (plano gratuito removido) | Railway e Render têm planos gratuitos para começar |
| Containers | Docker + Docker Compose | Configuração manual de servidor | Garante que funciona igual em qualquer máquina |
| Variáveis de ambiente em produção | Painel da plataforma (Vercel/Railway) | Arquivos `.env` no servidor | Mais seguro e auditável |
| CI/CD | GitHub Actions | Jenkins, CircleCI (para projetos simples) | GitHub Actions é gratuito para repositórios públicos e integrado |

### Ferramentas de Desenvolvimento

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| Linguagem | TypeScript | JavaScript puro (para projetos que vão crescer) | TypeScript previne erros em tempo de desenvolvimento |
| Linter | ESLint + Prettier | JSHint, TSLint | ESLint é o padrão atual; TSLint foi descontinuado |
| Testes | Vitest (unit) + Playwright (e2e) | Jest + Cypress (para projetos novos) | Vitest é integrado ao Vite; Playwright é mais moderno que Cypress |
| Gerenciador de pacotes | npm ou pnpm | Yarn (para projetos novos) | npm vem com Node; pnpm é mais eficiente em disco |
| Versionamento | Git + GitHub | GitLab (para projetos simples) | GitHub tem melhor ecossistema gratuito para iniciantes |

### Serviços Externos (APIs e SaaS)

| Categoria | Use | Evite | Motivo |
|---|---|---|---|
| Pagamentos (Brasil) | Mercado Pago ou Stripe | PagSeguro (API mais complexa) | Mercado Pago tem melhor integração BR; Stripe é o padrão global |
| E-mail transacional | Resend ou SendGrid | Envio direto via SMTP próprio | Evita cair em spam; planos gratuitos generosos |
| Armazenamento de arquivos | Cloudflare R2 ou Supabase Storage | AWS S3 (para começar) | R2 é gratuito até 10GB; mais simples de configurar |
| Mapas | Mapbox ou Leaflet.js | Google Maps | Google Maps cobra a partir de certo volume; Mapbox tem plano gratuito |
| Imagens em nuvem | Cloudinary | Armazenar imagens no próprio servidor | Cloudinary otimiza, redimensiona e entrega via CDN automaticamente |
| IA / LLM | API da Anthropic (Claude) | Implementações locais de LLM para produção | Mais confiável, escalável e com suporte garantido |

## Imagens, Ícones e Referências Visuais

Quando o trabalho envolver imagens, ícones, logos ou qualquer referência visual, **explique ao usuário como compartilhar**:

> "Para eu usar essa imagem no desenvolvimento, arrasta o arquivo direto aqui no chat (ou copia e cola). Pode ser ícone, logo, print de tela, foto — qualquer coisa visual que queira usar como referência."

Deixe claro também o que acontece depois:
> "Vou conseguir ver a imagem aqui no chat, mas você vai precisar salvar o arquivo na pasta do projeto. Eu te digo exatamente onde colocar e com qual nome."

Use a imagem recebida para: gerar código que a referencia, sugerir onde salvar no projeto, identificar cores e estilos, ou entender um layout/erro visual.

---

## Fluxo de Trabalho — Organização por Assunto

### Detectar mudança de assunto
Se o usuário começar a falar de um tema diferente do que está sendo trabalhado na conversa atual (nova funcionalidade, ajuste diferente, problema não relacionado), **interrompa gentilmente** antes de continuar e diga algo como:

> "Percebi que isso é um assunto diferente do que estávamos trabalhando. Recomendo começarmos um chat novo para isso — assim cada coisa fica organizada no seu lugar e fica mais fácil de acompanhar o que foi feito. Posso continuar aqui mesmo se preferir, mas fica mais confuso."

Só continue no mesmo chat se o usuário confirmar que quer assim.

### Organização de versões (releases e funcionalidades)
O projeto usa a seguinte organização:

- **Versão (release)**: representa um conjunto de mudanças que serão entregues juntas. Ex: `release/v1.0`, `release/v1.1`
- **Funcionalidade ou ajuste**: cada coisa nova ou correção é feita separadamente e depois juntada à versão. Ex: `feature/login`, `fix/botao-quebrado`

Ao iniciar qualquer trabalho novo, pergunte:
1. "Isso faz parte de qual versão?" (se ainda não houver uma versão ativa, ajude a criar)
2. Crie ou use a área de trabalho correta para aquele assunto

### Ao concluir uma funcionalidade ou ajuste
Quando o trabalho do chat chegar a um ponto de conclusão (funcionalidade pronta, ajuste feito, problema resolvido), siga esta sequência:

**Passo 1 — Pergunte sobre incorporar o trabalho à versão**, usando linguagem simples:

> "O que fizemos aqui está funcionando bem. Quer que eu incorpore essas mudanças à versão [nome da release]? É como 'confirmar' que esse trabalho faz parte da entrega. Você pode revisar tudo antes de eu fazer isso."

Só incorpore se o usuário confirmar explicitamente.

**Passo 2 — Após incorporar (ou se o usuário decidir não incorporar agora), sugira encerrar o chat:**

> "Tudo certo! Agora recomendo começar um chat novo para o próximo assunto. Isso mantém cada mudança organizada e o histórico limpo. Você pode abrir um novo chat quando quiser continuar."

Sempre termine com essa sugestão. Nunca deixe o usuário acumulando vários assuntos no mesmo chat sem alertar.
