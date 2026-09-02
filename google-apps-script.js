// ============================================================
// Google Apps Script — Backend do Formulário de Cadastro de Médicos
// ============================================================
//
// CABEÇALHOS DA PLANILHA GOOGLE SHEETS:
// A1: Nome
// B1: UF
// C1: CRM
// D1: Contato
// E1: Tipo de Contato
// F1: Consentimento LGPD
// G1: Data/Hora
//
// INSTRUÇÕES DE ATUALIZAÇÃO:
//
// 1. Na sua planilha, adicione a coluna "Nome" na Coluna A.
//
// 2. Vá no menu: Extensões > Apps Script
//
// 3. Apague tudo o que está lá e cole TODO este código abaixo.
//
// 4. Clique no ícone de Salvar 💾 (Ctrl+S).
//
// 5. IMPLANTAR NOVA VERSÃO:
//    - Clique em "Implantar" > "Gerenciar implantações"
//    - Clique no ícone de lápis ✏️ (Editar)
//    - Em "Versão", selecione "Nova versão"
//    - Clique em "Implantar" e depois em "Concluído"
//    (A URL continuará a mesma!)
// ============================================================

/**
 * Trata requisições POST vindas do formulário.
 */
function doPost(e) {
  try {
    var data = {};

    // 1. Tenta ler os dados via form-urlencoded / hidden form
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    }

    // 2. Se não veio em parameter, tenta ler do corpo em JSON
    if ((!data.uf && !data.crm && !data.contato) && e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (errJson) {}
    }

    // Abre a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Data/hora atual se não informada
    var dataHoraFormatada = data.dataHora || Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    // Adiciona uma nova linha com os dados (Nome na Coluna A)
    sheet.appendRow([
      data.nome || '',                               // Coluna A: Nome
      data.uf || '',                                 // Coluna B: UF
      data.crm || '',                                // Coluna C: CRM
      data.contato || '',                            // Coluna D: Contato
      data.contatoTipo || '',                        // Coluna E: Tipo (email ou celular)
      data.lgpdConsentimento || 'Sim',               // Coluna F: Consentimento LGPD
      dataHoraFormatada                              // Coluna G: Data/Hora
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
 * Trata requisições GET (para testes no navegador).
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'O backend do formulário está funcionando!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Função de teste rápido dentro do editor do Apps Script.
 */
function testarInsercaoNaPlanilha() {
  var e = {
    parameter: {
      nome: "Dr. João Silva",
      uf: "SP",
      crm: "123456",
      contato: "teste@gmail.com",
      contatoTipo: "email",
      lgpdConsentimento: "Sim",
      dataHora: Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss")
    }
  };
  var resultado = doPost(e);
  Logger.log(resultado.getContent());
}
