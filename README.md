# Formulário de Cadastro de Médicos

Formulário web simples acessado por QR code, onde médicos podem registrar interesse em receber visitas de representantes médicos. Os dados são salvos automaticamente em uma planilha Google Sheets.

## 📁 Estrutura do Projeto

```
├── index.html              ← Formulário principal (página que os médicos acessam)
├── google-apps-script.js   ← Código do backend (colar no Google Apps Script)
├── qrcode.html             ← Página utilitária para gerar o QR code
└── README.md               ← Este arquivo
```

## 🚀 Configuração Passo a Passo

### 1. Criar a Planilha Google

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha
2. Renomeie para **"Cadastro de Médicos"** (ou o nome que preferir)
3. Na primeira linha, adicione os cabeçalhos:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| UF | CRM | Contato | Tipo de Contato | Consentimento LGPD | Data/Hora |

### 2. Configurar o Google Apps Script

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague o conteúdo padrão do editor
3. Copie e cole TODO o conteúdo do arquivo `google-apps-script.js`
4. Clique em **💾 Salvar** (ou Ctrl+S)

### 3. Fazer o Deploy do Apps Script

1. Clique em **Implantar → Nova implantação**
2. Clique no ícone de engrenagem ⚙️ e selecione **App da Web**
3. Configure:
   - **Descrição**: Formulário Cadastro Médicos
   - **Executar como**: Eu (seu e-mail)
   - **Quem pode acessar**: Qualquer pessoa
4. Clique em **Implantar**
5. Na primeira vez, o Google pedirá permissão — clique em **Autorizar acesso**
6. **Copie a URL** gerada (algo como `https://script.google.com/macros/s/XXXX/exec`)

### 4. Conectar o Formulário ao Apps Script

1. Abra o arquivo `index.html`
2. Encontre a linha:
   ```javascript
   const APPS_SCRIPT_URL = 'COLE_SUA_URL_AQUI';
   ```
3. Substitua `'COLE_SUA_URL_AQUI'` pela URL copiada no passo anterior:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXX/exec';
   ```
4. Salve o arquivo

### 5. Hospedar o Formulário

Você precisa colocar o `index.html` em um servidor web. Algumas opções gratuitas:

#### Opção A: GitHub Pages (Recomendado)
1. Crie um repositório no GitHub
2. Suba o `index.html` para o repositório
3. Vá em **Settings → Pages → Source: Deploy from a branch (main)**
4. Sua URL será: `https://seu-usuario.github.io/nome-do-repo/`

#### Opção B: Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para a área de deploy
3. Pronto — você receberá uma URL automática

#### Opção C: Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Conecte com GitHub e importe o repositório
3. Deploy automático

### 6. Gerar o QR Code

1. Abra o arquivo `qrcode.html` no navegador
2. Cole a URL do formulário hospedado (do passo 5)
3. Clique em **Gerar**
4. Clique em **Baixar PNG** para salvar a imagem

## 📋 Campos do Formulário

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| Estado (UF) | Lista suspensa | ✅ | 26 estados + DF |
| CRM | Texto | ✅ | Somente números |
| Contato | Texto | ✅ | E-mail ou celular com DDD |
| LGPD | Checkbox | ✅ | Deve ser marcado |

## 🔐 LGPD

O formulário inclui um checkbox obrigatório de consentimento com o texto:

> *"Consinto com o uso dos meus dados para receber contato de representantes médicos, conforme a LGPD (Lei 13.709/2018)."*

O envio só é possível se o checkbox estiver marcado.

## 🧪 Modo de Teste

Se a variável `APPS_SCRIPT_URL` não estiver configurada (valor padrão `'COLE_SUA_URL_AQUI'`), o formulário funciona em **modo de teste**:
- Simula o envio com um delay de 1 segundo
- Exibe os dados no console do navegador (F12 → Console)
- A tela de sucesso é exibida normalmente

Isso permite testar o formulário localmente antes de configurar o Google Sheets.

## ⚠️ Atualizando o Apps Script

Se precisar alterar o código do `google-apps-script.js`:

1. Faça as alterações no Apps Script
2. Vá em **Implantar → Gerenciar implantações**
3. Clique em **✏️ Editar** na implantação existente
4. Em **Versão**, selecione **Nova versão**
5. Clique em **Implantar**

> **IMPORTANTE**: A URL permanece a mesma, não precisa atualizar o `index.html`.
