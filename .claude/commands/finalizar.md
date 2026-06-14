O usuário está indicando que terminou o que estava fazendo neste chat. Siga este roteiro:

## 1. Faça um resumo do que foi feito
Liste em linguagem simples (sem termos técnicos) o que foi criado ou alterado nesta conversa. Exemplo:
> "Neste chat nós: criamos a tela de login, adicionamos validação de senha e corrigimos o botão que não funcionava."

## 2. Pergunte se quer incorporar à versão
Pergunte de forma clara e simples se o usuário quer "salvar" esse trabalho na versão atual do projeto:

> "Quer que eu junte essas mudanças à versão [nome da release atual, ou pergunte qual é]? É como dar um 'ok final' para que esse trabalho faça parte da entrega. Posso mostrar um resumo do que vai ser incorporado antes de confirmar."

- Se **sim**: execute o merge para a release usando `git merge` da branch atual na release correspondente. Confirme o que foi feito com uma mensagem simples.
- Se **não agora**: diga que tudo fica salvo e pode ser incorporado depois, sem problema.

## 3. Sugira começar um chat novo
Independente da resposta acima, finalize com:

> "Recomendo abrir um chat novo para o próximo assunto. Misturar temas diferentes no mesmo chat deixa o histórico confuso e pode fazer o Claude perder o fio da meada. Cada assunto no seu próprio chat = trabalho mais organizado e resultados melhores."

Se o usuário tiver mencionado o próximo assunto no chat, inclua:
> "Para o próximo assunto ([repita o que ele mencionou]), abra um chat novo e comece explicando o que quer fazer."

$ARGUMENTS
