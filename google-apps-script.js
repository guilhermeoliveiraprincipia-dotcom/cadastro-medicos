// ============================================================
// Google Apps Script — Backend do Formulário de Cadastro de Médicos
// ============================================================
//
// INSTRUÇÕES DE ATUALIZAÇÃO:
//
// 1. Acesse sua planilha no Google Sheets:
//    https://docs.google.com/spreadsheets/d/1e56Lh_JcaykkV_HmiRVWalZp8KlhTzPigFl4NaYoym4/edit
//
// 2. Vá no menu: Extensões > Apps Script
//
// 3. Apague tudo o que está lá e cole TODO este código abaixo.
//
// 4. Clique no ícone de Salvar 💾 (Ctrl+S).
//
// 5. TESTE RÁPIDO (Opcional):
//    Selecione a função "testarInsercaoNaPlanilha" na barra superior
//    e clique em "Executar". Veja se uma linha de teste aparece na sua planilha.
//
// 6. IMPLANTAR NOVA VERSÃO:
//    - Clique em "Implantar" > "Gerenciar implantações"
//    - Clique no ícone de lápis ✏️ (Editar)
//    - Em "Versão", mude para "Nova versão"
//    - Clique em "Implantar"
//    (A URL continua a mesma!)
// ============================================================

/**
 * Trata requisições POST vindas do formulário.
 * Suporta tanto envio por formulário padrão (e.parameter) quanto JSON (e.postData).
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
      } catch (errJson) {
        // Ignora se não for JSON válido
      }
    }

    // Abre a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Data/hora atual se não informada
    var dataHoraFormatada = data.dataHora || Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      data.uf || '',                                 // Coluna A: UF
      data.crm || '',                                // Coluna B: CRM
      data.contato || '',                            // Coluna C: Contato
      data.contatoTipo || '',                        // Coluna D: Tipo (email ou celular)
      data.lgpdConsentimento || 'Sim',               // Coluna E: Consentimento LGPD
      dataHoraFormatada                              // Coluna F: Data/Hora
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
 * Função de teste para executar diretamente no editor do Apps Script.
 * Clique em "Executar" para validar se a planilha recebe os dados.
 */
function testarInsercaoNaPlanilha() {
  var e = {
    parameter: {
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
