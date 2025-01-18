# Extensão TJMA-PJE - Firefox

Extensão para consultas avançadas de processos, que tem como finalidade identificar o número do processo exclusivamente no site de Processo Judicial Eletrônico (PJE) e buscar informações adicionais sobre inconsistências cadastrais, problemas, avisos e certidões de óbito referentes ao processo identificado. Caso nenhuma informação seja encontrada, apenas é exibido a mensagem "Nada a informar".

## Configuração de Ambiente

Edite o arquivo manifest.json para adicionar/editar informações sobre a extensão e todos os endereços necessários para acioná-la.

Edite o arquivo assets/js/constants.js para configurar o endereço da api e página da web a ser exibida na extensão após autenticação realizada via SSO.

## Servidor para desenvolvimento

Utilizando o navegador Firefox, clique no menu "Abrir menu do aplicativo", em seguida em Extensões e temas -> Ferramentas para todas as extensões -> Depurar extensões, após isso, basta subir a extensão clicando em "Carregar extensão temporária".

## Dependências utilizadas

jQuery: v3.2.0

## Deploy

Para realizar o deploy da extensão, é necessário compactar os arquivos como zip e em seguida carrega-los na Firefox Addons.

## Ajuda

Para obter mais ajuda sobre o Extensões no Firefox, confira a página [Sua primeira extensão - Mozilla](https://developer.mozilla.org/pt-BR/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension).
