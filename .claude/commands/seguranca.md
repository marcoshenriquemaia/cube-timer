Faça uma varredura completa de segurança no código deste projeto. Analise os seguintes pontos:

## 1. Segredos Expostos
- Procure por API keys, tokens, senhas, connection strings diretamente no código (não em .env)
- Verifique se `.env`, `.env.local`, `*.key`, `*.pem`, `credentials.json` estão no `.gitignore`
- Verifique o histórico recente de commits (`git log --oneline -20`) em busca de arquivos sensíveis que possam ter sido commitados e removidos depois

## 2. Vulnerabilidades de Código
- Busque por concatenação de strings em queries SQL (risco de SQL Injection)
- Verifique uso de `eval()`, `exec()`, `subprocess` com dados do usuário
- No frontend: procure por `innerHTML`, `document.write` com dados externos
- Verifique se inputs do usuário são validados antes do uso

## 3. Configurações Inseguras
- Verifique se há endpoints expostos sem autenticação que deveriam ter
- Procure por `DEBUG=True` ou equivalente que não deveria estar em produção
- Verifique permissões de arquivos sensíveis se aplicável

## Formato do Relatório
Para cada problema encontrado, informe:
- **Severidade**: 🔴 Alta / 🟡 Média / 🟢 Baixa
- **Arquivo e linha** onde o problema foi encontrado
- **O que é o problema** em linguagem simples
- **Como corrigir** com exemplo de código quando possível

Se nenhum problema for encontrado em uma categoria, diga explicitamente "Nenhum problema encontrado".

Seja honesto: se não tiver certeza sobre algo, diga que recomenda uma revisão humana especializada.

$ARGUMENTS
