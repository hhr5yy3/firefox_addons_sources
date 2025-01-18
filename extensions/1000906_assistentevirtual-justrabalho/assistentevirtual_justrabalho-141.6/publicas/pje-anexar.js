async function pjeAnexarDocumentoPreencherCertidao(){
	let certificar = obterParametroDeUrl('certificar')
	let tipo = await esperar('[aria-label="Tipo de Documento"]',true)
	clicar(tipo)
	if(!certificar){
		if(!CONFIGURACAO?.pjeAssistentesDocumentosNotificacoes?.selecionarCertidao) return
		await pjeSelecionarOpcao('Certidão')
		return
	}
	window.onfocus = () => {
		clicar('[aria-label="Tipo de Documento"]')
	}
	let certidao = JSON.parse(decodeURIComponent(certificar))
	await pjeSelecionarOpcao(certidao.tipo)
	let descricao = await esperar('[aria-label="Descrição"]',true)
	if(certidao.descricao) preencher(descricao,certidao.descricao)
	let corpo = await pjeEditorFocarAoCarregar()
	if(certidao?.texto){
		corpo.innerText = certidao.texto
		if(certidao?.colar) setTimeout(colar,500)
	}
	if(certidao.sigiloso) clicar('input[name="sigiloso"]')
	if(certidao.pdf){
		let pdf = await esperar('mat-slide-toggle .mat-slide-toggle-label',true)
		clicar(pdf)
		let anexar = await esperar('#upload-anexo-0',true)
		clicar(anexar)
		return
	}
	if(certidao.assinar) clicar('[aria-label="Assinar documento e juntar ao processo"]')
}

function pjeCertificar(
	descricao = '',
	tipo = 'Certidão',
	texto = '',
	pdf = false,
	sigiloso = false,
	assinar = false,
	colar = false
){
	let certidao = {}
	certidao.tipo = tipo
	certidao.descricao = descricao
	certidao.texto = texto
	certidao.pdf = pdf
	certidao.sigiloso = sigiloso
	certidao.assinar = assinar
	certidao.colar = colar
	return certidao
}

function pjeCertificarEmailEnviado(){
	let tipo = 'Correspondência ou Mensagem Eletrônica/E-mail'
	let descricao = 'Enviado ao Destinatário'
	let certidao = pjeCertificar(descricao,tipo)
	pjeAbrirAnexar(certidao)
}

function pjeCertificarCitacaoPorEmail(){
	let tipo = 'Correspondência ou Mensagem Eletrônica/E-mail'
	let descricao = 'Citação Para Apresentar Contestação'
	let certidao = pjeCertificar(descricao,tipo)
	pjeAbrirAnexar(certidao)
}

function pjeCertificarNotificacaoDeAudienciaPorEmail(){
	let tipo = 'Correspondência ou Mensagem Eletrônica/E-mail'
	let descricao = 'Audiência Designada'
	let certidao = pjeCertificar(descricao,tipo)
	pjeAbrirAnexar(certidao)
}

function pjeCertificarNotificacaoInicialPorEmail(){
	let tipo = 'Correspondência ou Mensagem Eletrônica/E-mail'
	let descricao = 'Notificação Inicial'
	let certidao = pjeCertificar(descricao,tipo)
	pjeAbrirAnexar(certidao)
}

function pjeCertificarNotificacaoSentencaPorEmail(){
	let tipo = 'Correspondência ou Mensagem Eletrônica/E-mail'
	let descricao = 'Sentença'
	let certidao = pjeCertificar(descricao,tipo)
	pjeAbrirAnexar(certidao)
}