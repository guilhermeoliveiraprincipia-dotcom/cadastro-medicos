// ============================================================
// Google Apps Script — Backend do Formulário de Cadastro de Médicos
// ============================================================
//
// INSTRUÇÕES DE CONFIGURAÇÃO:
//
// 1. Acesse https://sheets.google.com e crie uma nova planilha
//
// 2. Na primeira linha (cabeçalho), adicione as colunas:
//    A1: UF
//    B1: CRM
//    C1: Contato
//    D1: Tipo de Contato
//    E1: Consentimento LGPD
//    F1: Data/Hora
//
// 3. No menu da planilha, clique em: Extensões > Apps Script
//
// 4. Apague o conteúdo padrão e cole TODO o código abaixo
//
// 5. Clique em "Implantar" > "Nova implantação"
//    - Tipo: "App da Web"
//    - Executar como: "Eu" (sua conta)
//    - Quem pode acessar: "Qualquer pessoa"
//    - Clique em "Implantar"
//
// 6. Copie a URL gerada e cole no arquivo index.html,
//    na variável APPS_SCRIPT_URL
//
// 7. IMPORTANTE: Sempre que alterar este código, faça uma
//    NOVA implantação (não "editar implantação existente")
//
// ============================================================

/**
 * Trata requisições POST vindas do formulário.
 * Insere os dados recebidos como uma nova linha na planilha.
 */
function doPost(e) {
  try {
    // Lê os dados enviados pelo formulário
    var data = JSON.parse(e.postData.contents);

    // Abre a planilha ativa (a mesma onde o script está vinculado)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      data.uf,                 // Coluna A: UF
      data.crm,                // Coluna B: CRM
      data.contato,            // Coluna C: Contato
      data.contatoTipo,        // Coluna D: Tipo (email ou phone)
      data.lgpdConsentimento,  // Coluna E: Consentimento LGPD
      data.dataHora            // Coluna F: Data/Hora do envio
    ]);

    // Retorna resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Dados salvos com sucesso' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Retorna resposta de erro
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Trata requisições GET (para testes).
 * Acesse a URL do deploy no navegador para verificar se está funcionando.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'O backend do formulário está funcionando!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
