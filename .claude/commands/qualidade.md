Faça uma revisão de qualidade do código modificado recentemente neste projeto. Use `git diff HEAD~1` ou `git diff --staged` para ver as mudanças, ou analise os arquivos mencionados em: $ARGUMENTS

## O que avaliar

### Legibilidade
- O código é fácil de entender para alguém que não o escreveu?
- Os nomes de variáveis e funções descrevem bem o que fazem?
- Há lógica complexa que poderia ser simplificada?

### Estrutura
- Funções/métodos fazem mais de uma coisa? (se sim, sugerir separação)
- Há código duplicado que poderia ser reutilizado?
- O arquivo ficou grande demais? (mais de 200-300 linhas é um sinal de alerta)

### Manutenibilidade
- Se essa funcionalidade precisar ser alterada em 6 meses, será fácil encontrar e mudar?
- Há "números mágicos" ou strings literais que deveriam ser constantes nomeadas?
- Há tratamento de erros onde poderia falhar?

### Boas Práticas
- Há logs de debug esquecidos?
- Há TODOs ou FIXMEs que foram esquecidos?
- O código segue o padrão já existente no projeto?

## Formato do Relatório

Para cada ponto de melhoria:
- **Arquivo e linha**
- **O que pode melhorar** — explicação simples, sem jargão
- **Sugestão** — mostre como ficaria o código melhorado

Separe em:
- 🔴 **Deve corrigir** — vai causar problemas reais
- 🟡 **Recomendo corrigir** — vai dificultar manutenção futura  
- 🟢 **Sugestão** — melhoria opcional

Se o código estiver bem, diga isso claramente e explique o que está bom.
