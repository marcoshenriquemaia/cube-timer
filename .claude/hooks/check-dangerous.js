#!/usr/bin/env node
// Guardrail: bloqueia comandos destrutivos e exige confirmação explícita

const chunks = [];
process.stdin.on('data', d => chunks.push(d));
process.stdin.on('end', () => {
  let tool;
  try {
    tool = JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    process.exit(0);
  }

  const cmd = (tool.tool_input && tool.tool_input.command) || '';

  const dangerous = [
    { pattern: /rm\s+-rf/i,                        msg: 'rm -rf pode apagar arquivos irreversivelmente.' },
    { pattern: /git\s+push\s+--force/i,             msg: 'force push pode sobrescrever o histórico remoto.' },
    { pattern: /git\s+reset\s+--hard/i,             msg: 'git reset --hard descarta mudanças não commitadas.' },
    { pattern: /DROP\s+TABLE/i,                     msg: 'DROP TABLE apaga uma tabela inteira do banco.' },
    { pattern: /DELETE\s+FROM\s+\w+\s*;/i,          msg: 'DELETE sem WHERE apaga TODOS os registros da tabela.' },
    { pattern: /TRUNCATE/i,                         msg: 'TRUNCATE apaga todos os dados da tabela.' },
    { pattern: /del\s+\/f\s+\/s/i,                  msg: 'del /f /s apaga arquivos recursivamente.' },
    { pattern: /rmdir\s+\/s/i,                      msg: 'rmdir /s remove diretórios recursivamente.' },
  ];

  for (const { pattern, msg } of dangerous) {
    if (pattern.test(cmd)) {
      console.error(`\n[GUARDRAIL] ATENÇÃO: ${msg}`);
      console.error(`Comando detectado: ${cmd.trim()}`);
      console.error('Confirme explicitamente com o usuário antes de prosseguir.\n');
      process.exit(2);
    }
  }

  process.exit(0);
});
