Você vai verificar e instalar as ferramentas obrigatórias de desenvolvimento na máquina do usuário: **Git**, **Docker** e **NVM (Node.js)**. Siga cada etapa com atenção e comunique tudo em linguagem simples — o usuário não é técnico.

---

## Etapa 1 — Detectar o sistema operacional

Execute o seguinte e identifique o sistema:

```bash
uname -s 2>/dev/null || echo "windows"
```

- Se retornar `Darwin` → é **Mac**
- Se retornar `Linux` → é **Linux**
- Se retornar `windows` ou der erro → é **Windows**

Informe ao usuário:
> "Identifiquei que você está usando [Mac / Windows / Linux]. Vou verificar o que já está instalado na sua máquina."

---

## Etapa 2 — Verificar o que já está instalado

Execute cada verificação abaixo e anote o resultado:

```bash
git --version 2>/dev/null && echo "GIT_OK" || echo "GIT_MISSING"
docker --version 2>/dev/null && echo "DOCKER_OK" || echo "DOCKER_MISSING"
nvm --version 2>/dev/null && echo "NVM_OK" || echo "NVM_MISSING"
node --version 2>/dev/null && echo "NODE_OK" || echo "NODE_MISSING"
```

Monte um relatório simples para o usuário:

> "Aqui está o que encontrei na sua máquina:
> - Git: ✅ instalado / ❌ não encontrado
> - Docker: ✅ instalado / ❌ não encontrado  
> - NVM (gerenciador do Node.js): ✅ instalado / ❌ não encontrado
> - Node.js: ✅ instalado / ❌ não encontrado"

Se tudo estiver instalado, diga:
> "Sua máquina já tem tudo que precisa! Está pronta para desenvolvimento." e encerre.

---

## Etapa 3 — Instalar o que estiver faltando

Siga as instruções do sistema operacional identificado.

---

### 🍎 MAC

#### Git (Mac)
O Mac geralmente já tem o Git. Se não tiver, instale via Xcode Command Line Tools:
```bash
xcode-select --install
```
Explique ao usuário:
> "Vai abrir uma janela pedindo para instalar as ferramentas de desenvolvimento da Apple. Clique em 'Instalar' e aguarde — pode demorar alguns minutos."

#### Docker (Mac)
O Docker no Mac precisa ser instalado manualmente. Diga ao usuário:
> "Vou precisar da sua ajuda nessa parte. O Docker precisa ser baixado e instalado manualmente:
> 1. Acesse o site oficial do Docker (docker.com/products/docker-desktop)
> 2. Clique em 'Download for Mac'
> 3. Escolha a versão correta: **Apple Silicon** (se seu Mac for de 2020 ou mais novo) ou **Intel** (se for mais antigo)
> 4. Abra o arquivo baixado e arraste o Docker para a pasta Aplicativos
> 5. Abra o Docker e siga as instruções na tela
> 6. Quando aparecer a baleia 🐳 na barra de menu do Mac, está funcionando
>
> Me avise quando terminar para eu continuar."

Aguarde confirmação antes de seguir.

#### NVM + Node.js (Mac)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
Depois de instalar, recarregue o terminal:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
```
Explique:
> "Instalei o NVM, que é um gerenciador de versões do Node.js. Agora instalei também a versão mais estável do Node.js. Isso permite criar aplicações web e executar scripts."

---

### 🪟 WINDOWS

Explique ao usuário antes de começar:
> "No Windows vou usar o **winget**, que é o gerenciador de programas nativo do Windows 10 e 11. Algumas etapas vão abrir janelas pedindo permissão de administrador — clique em 'Sim' quando isso acontecer."

Verifique se o winget está disponível:
```bash
winget --version 2>/dev/null && echo "WINGET_OK" || echo "WINGET_MISSING"
```

Se o winget não estiver disponível:
> "Seu Windows não tem o winget disponível. Vamos precisar fazer as instalações manualmente. Me avise e eu te guio passo a passo por cada uma."

#### Git (Windows)
```bash
winget install --id Git.Git -e --source winget
```
Explique:
> "Instalando o Git, que é a ferramenta que salva e organiza o histórico do seu código. Quando aparecer uma janela de instalação, pode clicar em 'Next' em tudo — as opções padrão funcionam bem."

#### Docker (Windows)
O Docker no Windows requer instalação manual. Diga:
> "O Docker no Windows precisa ser instalado manualmente:
> 1. Acesse docker.com/products/docker-desktop
> 2. Clique em 'Download for Windows'
> 3. Execute o arquivo baixado
> 4. Durante a instalação, deixe marcada a opção **'Use WSL 2 instead of Hyper-V'** (se aparecer)
> 5. Reinicie o computador quando solicitado
> 6. Após reiniciar, abra o Docker Desktop
> 7. Quando aparecer a baleia 🐳 na barra de tarefas, está funcionando
>
> Me avise quando terminar para eu continuar."

Aguarde confirmação antes de seguir.

#### NVM + Node.js (Windows)
No Windows o NVM é um programa diferente chamado **nvm-windows**:
```bash
winget install --id CoreyButler.NVMforWindows -e --source winget
```
Após instalar, feche e reabra o terminal, depois execute:
```bash
nvm install lts
nvm use lts
```
Explique:
> "Instalei o NVM para Windows e a versão mais estável do Node.js. Feche este terminal e abra um novo para as mudanças terem efeito."

---

### 🐧 LINUX

Detecte a distribuição:
```bash
cat /etc/os-release | grep ^ID=
```

#### Git (Linux)
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y git

# Fedora/RHEL
sudo dnf install -y git
```

#### Docker (Linux)
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```
Explique:
> "Instalei o Docker. Para ele funcionar sem precisar de permissão de administrador toda hora, você precisa **fechar e abrir o terminal** (ou reiniciar o computador)."

#### NVM + Node.js (Linux)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

---

## Etapa 4 — Verificação final

Após instalar tudo, execute a verificação completa novamente:

```bash
git --version
docker --version
nvm --version
node --version
npm --version
```

Monte o relatório final:
> "Tudo instalado! Aqui está o resumo do que está na sua máquina agora:
> - Git [versão]: ✅ pronto
> - Docker [versão]: ✅ pronto
> - NVM [versão]: ✅ pronto
> - Node.js [versão]: ✅ pronto
> - NPM [versão]: ✅ pronto (vem junto com o Node.js)"

---

## Etapa 5 — Teste rápido de sanidade

Faça um teste simples para confirmar que cada ferramenta está funcionando de verdade:

```bash
# Testa Git
git config --global user.name 2>/dev/null || echo "Git precisa de configuração"

# Testa Docker
docker run --rm hello-world 2>/dev/null && echo "DOCKER_WORKING" || echo "DOCKER_NOT_RUNNING"

# Testa Node
node -e "console.log('Node ok, versão: ' + process.version)"
```

Se o Docker não estiver rodando:
> "O Docker está instalado mas não está aberto. Abra o **Docker Desktop** no seu computador (procure pelo ícone da baleia 🐳) e aguarde ele iniciar completamente. Depois me avise."

Se o Git precisar de configuração:
```bash
git config --global user.name "[nome do usuário]"
git config --global user.email "[email do usuário]"
```
Pergunte ao usuário o nome e e-mail antes de executar.

---

## Etapa 6 — Finalizar

Ao concluir com sucesso:
> "Sua máquina está configurada e pronta para desenvolvimento! 🎉
>
> Resumo do que foi instalado:
> - **Git** — salva e organiza o histórico do seu código
> - **Docker** — permite rodar o projeto de forma isolada, sem bagunçar seu computador
> - **Node.js** — permite criar e rodar aplicações web
>
> Recomendo abrir um chat novo para começar o projeto. Quando quiser, me conta o que vamos construir."

$ARGUMENTS
