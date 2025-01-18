async function sif(){
	if(!JANELA.includes('jus.br/sif')) return
	PROCESSO = await pjeObterDadosDoProcessoPorNumeroSemSeparadores()
	PROCESSO.partes = await pjeApiObterProcessoPartes(PROCESSO.id)
	let DEPOSITO = {}
	criarBotaoMagistradoConfiguracoes()
	let intervalo = setInterval(() => {
		let dadosDaConta = selecionar('pje-dado-conta')
		if(dadosDaConta){
			clearInterval(intervalo)
			deposito = obterDadosDoDeposito()
			console.info('Dados do Depósito',deposito)
			esperar('[placeholder="Confeccionar Alvará"]',true,true).then(selecionarTransferenciaAoBeneficiario)
			esperar('pje-selecionar-magistrado mat-expansion-panel-header',true,true).then(selecionarMagistradoPorFinadlDoProcesso)
			preencherDadosDoBeneficiario()
			let conta = window.location.href.replace(/^.*\d{20}./,'')
			pjeApiSifObterContaDados(PROCESSO.numeros,conta).then(dados => {
				let data = new Date(dados.dtDeposito)
				dados.data = data?.toLocaleDateString() || ''
				dados.valor = dados.vlDeposito?.toLocaleString('pt-BR',{minimumFractionDigits:2}) || ''
				DEPOSITO = dados
				console.info('Depósito:',DEPOSITO)
				preencherValorOriginario()
				preencherValorDisponivel()
				preencherDataDaCorrecaoBancariaComDataOriginaria()
				preencherDataDaCorrecaoBancariaComDataHoje()
			})
		}
	},1000)

	async function selecionarTransferenciaAoBeneficiario(){
		if(!CONFIGURACAO?.sif?.selecionarTransferencia) return
		clicar('[placeholder="Confeccionar Alvará"]')
		await esperar('[aria-label="Selecione o Tipo de Alvará"] mat-option',true,true)
		pjeSelecionarOpcaoPorTexto('Transferência ao Beneficiário')
	}

	async function selecionarMagistradoPorFinadlDoProcesso(){
		if(!CONFIGURACAO?.sif?.selecionarMagistrado) return
		let magistrado = CONFIGURACAO?.pjeMagistrados[PROCESSO.digitoFinal] || ''
		clicar('pje-selecionar-magistrado mat-expansion-panel-header')
		await esperar('mat-list.lista-magistrados mat-list-item button',true,true)
		setTimeout(() => selecionarMagistrado(magistrado),200)
	}

	async function selecionarMagistrado(magistrado=''){
		if(!magistrado) return ''
		await esperar('mat-list-item',true,true)
		let opcao = [...document.querySelectorAll('mat-list-item')].filter(opcao => opcao.innerText == magistrado)[0] || ''
		clicar(opcao)
	}

	async function preencherValorOriginario(){
		if(!CONFIGURACAO?.sif?.preencherValorOriginario) return
		let campo = await esperar('[formcontrolname="valor"]',true,true)
		setTimeout(() => preencher(campo,DEPOSITO.valor,false,true,'cut'),500)
	}

	async function preencherValorDisponivel(){
		if(!CONFIGURACAO?.sif?.preencherValorDisponivel) return
		let valor = selecionar('.saldoDisponivel')
		if(!valor) return
		let saldo = obterValorMonetario(valor.innerText)
		let campo = await esperar('[formcontrolname="valor"]',true,true)
		setTimeout(() => preencher(campo,saldo,false,true,'cut'),550)
	}

	async function preencherDataDaCorrecaoBancariaComDataOriginaria(){
		if(!CONFIGURACAO?.sif?.preencherDataOriginaria) return
		let campo = await esperar('[formcontrolname="dataAtualizacao"]',true,true)
		setTimeout(() => preencher(campo,DEPOSITO.data),600)
	}

	async function preencherDataDaCorrecaoBancariaComDataHoje(){
		if(!CONFIGURACAO?.sif?.preencherDataHoje) return
		let campo = await esperar('[formcontrolname="dataAtualizacao"]',true,true)
		setTimeout(() => preencher(campo,DATA.hoje.curta),650)
	}

	async function obterDadosDoDeposito(){
		let conta = JANELA.replace(/^.*\d{20}./,'')
		let dados = await pjeApiSifObterContaDados(PROCESSO.numeros,conta)
		let data = new Date(dados.dtDeposito)
		dados.data = data?.toLocaleDateString() || ''
		dados.valor = dados.vlDeposito?.toLocaleString('pt-BR',{minimumFractionDigits:2}) || ''
		return dados
	}

	async function preencherDadosDoBeneficiario(){
		let campo = await esperar('[formcontrolname="beneficiario"]',true,true)
		let observador = new MutationObserver(() => {
			let beneficiario = obterDadosDoBeneficiario(campo.innerText)
			preencherNomeDoTitular(beneficiario.nome)
		})
		observador.observe(campo,{
			childList:true,
			subtree:true,
			attributes:true,
			characterData:false
		})

		function preencherNomeDoTitular(nome){
			if(!CONFIGURACAO?.sif?.preencherNomeTitular) return
			preencher('[formcontrolname="titular"]',nome)
			setTimeout(clicarEmRepresentacaoProcessual,500)
			function clicarEmRepresentacaoProcessual(){
				let titular = selecionar('[label*="Reclama"],[label*="Advogad"],[label*="Terceir"]')
				if(!titular) selecionarRepresentacaoProcessual()
			}
		}

		function selecionarRepresentacaoProcessual(){
			if(!CONFIGURACAO?.sif?.selecionarRepresentacao) return
			clicar('[aria-label="Selecione o Representante Processual"]')
		}

		function obterDadosDoBeneficiario(texto){
			let beneficiario = {}
			beneficiario.nome = texto.trim().replace(/\s[(].*?[)]$/,'') || ''
			beneficiario.tipo = obterTipo(texto) || ''
			return beneficiario

			function obterTipo(texto){
				let tipo = texto.trim().match(/[(].*?[)]$/) || ''
				if(!tipo) return ''
				return tipo[0].replace(/[()]/g,'') || ''
			}
		}
	}

	function criarBotaoMagistradoConfiguracoes(){
		let destino = selecionar('.conteudo')
		let configuracoes = criarBotao(
			'conclusao-ao-magistrado-configuracoes',
			'configuracoes informacoes',
			destino,
			'',
			'Configuracões de Seleção Automática de Magistrad(a)os',
			abrirPaginaConfiguracoesMagistrado
		)
		estilizar(configuracoes,
			`#conclusao-ao-magistrado-configuracoes{
				position:fixed !important;
			}`
		)
	}
}