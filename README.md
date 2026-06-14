# claude-guardrail

Template de guardrails para projetos com Claude Code. Garante qualidade e segurança para times iniciantes.

## Como usar

### 1. Copie os arquivos de guardrail para o seu projeto

```bash
# Clone este repositório
git clone <url-deste-repo> claude-guardrail

# Copie os arquivos para o seu projeto
cp claude-guardrail/CLAUDE.md seu-projeto/
cp -r claude-guardrail/.claude seu-projeto/
```

### 2. Verifique que o Node.js está instalado

Os hooks de proteção usam Node.js. Confirme com:

```bash
node --version
```

Se não estiver instalado, baixe em [nodejs.org](https://nodejs.org).

### 3. Pronto — abra seu projeto no Claude Code

As proteções são ativadas automaticamente quando você abre o projeto.

---

## O que está incluído

### Regras automáticas (`CLAUDE.md`)
O Claude segue estas regras em toda conversa dentro do projeto:
- Nunca escreve segredos/credenciais no código
- Pede confirmação antes de ações destrutivas
- Aplica práticas de segurança (SQL injection, XSS, etc.)

### Hook de proteção (`.claude/hooks/check-dangerous.js`)
Bloqueia automaticamente comandos perigosos antes de executar:
- `rm -rf` / `rmdir /s` / `del /f /s`
- `git push --force` / `git reset --hard`
- `DROP TABLE` / `DELETE FROM` sem WHERE / `TRUNCATE`

### Comandos slash (`.claude/commands/`)

| Comando | O que faz |
|---|---|
| `/seguranca` | Varre o projeto em busca de segredos expostos e vulnerabilidades |
| `/pre-deploy` | Checklist completo antes de fazer deploy |
| `/qualidade` | Revisão de qualidade do código recente |

---

## Personalização

### Adaptar o `CLAUDE.md`
Edite o arquivo `CLAUDE.md` para adicionar regras específicas do seu projeto (stack, padrões de código, endpoints proibidos, etc.).

### Adicionar novos comandos
Crie arquivos `.md` em `.claude/commands/` com o prompt do comando. Use `$ARGUMENTS` para receber parâmetros:

```markdown
# .claude/commands/meu-comando.md
Analise o arquivo $ARGUMENTS e ...
```

Uso: `/meu-comando src/app.js`

### Adicionar novos padrões perigosos ao hook
Edite `.claude/hooks/check-dangerous.js` e adicione entradas no array `dangerous`:

```js
{ pattern: /seu-padrao/i, msg: 'Mensagem de alerta.' },
```
