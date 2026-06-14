Você vai gerar e salvar um documento de planejamento detalhado para este projeto. Siga os passos abaixo com atenção.

## Passo 1 — Coletar contexto

Antes de escrever qualquer coisa:

1. Verifique se existe uma pasta `plans/` na raiz do projeto. Se não existir, crie-a.
2. Liste todos os arquivos dentro de `plans/` ordenados por data (nome do arquivo).
3. Se existir algum plano anterior, leia o mais recente para entender o que foi planejado antes.
4. Pergunte ao usuário:
   - "Qual é o seu nome? (Para registrar quem participou desta conversa)"
   - "Este plano vem de uma conversa de entrevista que fizemos, ou você quer descrever o que planejamos aqui?"

## Passo 2 — Montar o documento

Crie um arquivo em `plans/` com o nome no formato:
`YYYY-MM-DD_NNN_titulo-curto.md`

Onde:
- `YYYY-MM-DD` = data de hoje
- `NNN` = número sequencial do plano (001, 002, 003...)
- `titulo-curto` = 2 a 4 palavras descrevendo o assunto (ex: `tela-de-login`, `sistema-de-pagamento`)

---

## Estrutura do documento

```
# Plano NNN — [Título]

**Data:** DD/MM/YYYY  
**Participantes:** [Nome do usuário] + Claude  
**Versão/Release associada:** [ex: release/v1.0 — ou "ainda não definida"]  
**Status:** Rascunho | Em andamento | Aprovado | Cancelado

---

## 1. Contexto

[Descreva em linguagem simples qual é o projeto ou funcionalidade sendo planejada.
Inclua o problema que está sendo resolvido e para quem.]

---

## 2. O que será construído

[Liste de forma clara e detalhada tudo que faz parte deste plano.
Separe em sub-itens se necessário. Seja específico — evite frases vagas como "melhorar o sistema".]

### Funcionalidades previstas
- [ ] [Funcionalidade 1 — descrição detalhada do comportamento esperado]
- [ ] [Funcionalidade 2]
- [ ] ...

### O que está fora do escopo (não será feito agora)
- [Item que foi discutido mas decidido deixar para depois — e por quê]

---

## 3. Decisões técnicas

[Registre aqui as decisões de tecnologia tomadas, com a justificativa em linguagem simples.
Mesmo que o usuário não seja técnico, ele deve conseguir entender o porquê de cada escolha.]

| Decisão | Escolha | Motivo |
|---|---|---|
| Banco de dados | [ex: PostgreSQL] | [ex: Precisa guardar relações entre usuários e pedidos] |
| Onde vai rodar | [ex: Vercel] | [ex: Gratuito para começar, fácil de publicar] |
| Login de usuário | [ex: Google / e-mail e senha] | [ex: Usuário pediu login simples sem burocracia] |
| [Outra decisão] | | |

---

## 4. Riscos e pontos de atenção

[Liste tudo que pode dar errado, ser mais difícil do que parece, ou exigir atenção especial.
Inclua riscos técnicos, legais, de custo ou de prazo.]

| Risco | Probabilidade | Impacto | O que fazer |
|---|---|---|---|
| [ex: Custo do Google Maps pode crescer] | Média | Alto | Definir limite de uso antes de lançar |
| [ex: App Store pode rejeitar por política X] | Baixa | Alto | Revisar políticas antes de submeter |
| [Outro risco] | | | |

---

## 5. Perguntas em aberto

[Coisas que ainda não foram decididas e precisam de resposta antes ou durante o desenvolvimento.]

- [ ] [Pergunta 1 — ex: "O usuário pode deletar a própria conta? O que acontece com os dados dele?"]
- [ ] [Pergunta 2]
- [ ] ...

---

## 6. Mudanças em relação ao plano anterior

[Esta seção só existe a partir do Plano 002. Se for o primeiro plano, escreva "Primeiro plano do projeto — sem histórico anterior."]

### O que mudou
[Liste cada mudança em relação ao plano anterior, como uma lista de alterações.]

| # | Tipo | O que mudou | Motivo da mudança |
|---|---|---|---|
| 1 | Adição | [ex: Incluída funcionalidade de notificação por e-mail] | [ex: Usuário percebeu que era essencial durante a entrevista] |
| 2 | Remoção | [ex: Removido mapa interativo da versão 1] | [ex: Custo elevado, decidido deixar para v2] |
| 3 | Alteração | [ex: Mudado banco de dados de MySQL para PostgreSQL] | [ex: Necessidade de dados relacionais mais complexos] |
| 4 | Correção | [ex: Escopo da tela de perfil estava mal definido] | [ex: Revisão durante a entrevista revelou requisitos adicionais] |

### Impacto das mudanças
[Descreva em linguagem simples o que essas mudanças significam para o projeto.
Ex: "A remoção do mapa reduz o custo inicial mas vai exigir uma versão 2 mais cedo do que esperado."]

---

## 7. Próximos passos

[O que deve acontecer depois que este plano for aprovado. Liste em ordem.]

- [ ] [Passo 1 — ex: Criar o projeto no repositório]
- [ ] [Passo 2 — ex: Construir a tela de login]
- [ ] [Passo 3]
- [ ] ...

---

## 8. Histórico de status

| Data | Status | Quem | Observação |
|---|---|---|---|
| DD/MM/YYYY | Rascunho | [Nome] + Claude | Criação do plano |

```

---

## Passo 3 — Salvar e confirmar

Após gerar o documento:

1. Salve o arquivo em `plans/` com o nome correto.
2. Mostre ao usuário um resumo do que foi registrado:
   > "Salvei o plano **[nome do arquivo]** em `plans/`. Aqui está o que registrei: [liste os pontos principais em 5-8 linhas simples]."
3. Pergunte:
   > "Tem algo que ficou errado ou que você quer ajustar antes de eu finalizar?"
4. Se o usuário pedir ajustes, aplique e salve novamente.
5. Ao confirmar, diga:
   > "Plano salvo! Quando você fizer o commit, esse arquivo vai junto para o histórico do projeto. Recomendo abrir um chat novo agora para começar a construir o que planejamos."

$ARGUMENTS
