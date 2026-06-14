Execute o checklist de pré-deploy abaixo antes de qualquer push para produção. Para cada item, verifique ativamente no projeto e marque ✅ (ok), ❌ (problema encontrado) ou ⚠️ (não verificável, requer ação manual).

## Checklist de Pré-Deploy

### Segredos e Credenciais
- [ ] Nenhum segredo (API key, senha, token) está hardcoded no código
- [ ] O arquivo `.env` está listado no `.gitignore`
- [ ] As variáveis de ambiente necessárias estão documentadas (ex: `.env.example`)

### Código
- [ ] Não há `console.log`, `print()`, `debugger` ou logs de debug esquecidos
- [ ] Não há código comentado que deveria ter sido removido
- [ ] As mudanças foram testadas localmente e funcionam conforme esperado

### Git
- [ ] O branch atual está atualizado com o branch principal (`git pull`)
- [ ] Não há arquivos sensíveis no staging (`git status`)
- [ ] A mensagem de commit descreve claramente o que foi alterado

### Banco de Dados (se aplicável)
- [ ] Migrações foram testadas em ambiente local ou de staging antes
- [ ] Não há queries `DELETE` ou `DROP` sem confirmação de que são intencionais

### Revisão
- [ ] Pelo menos uma pessoa revisou as mudanças antes do deploy

---

Após verificar cada item:
1. Liste os itens com ❌ e explique o que precisa ser corrigido antes do deploy
2. Liste os itens com ⚠️ e instrua o usuário sobre o que verificar manualmente
3. Se tudo estiver ✅, confirme que o projeto está pronto para deploy

**Não autorize o deploy se houver qualquer item ❌.**

$ARGUMENTS
