/**
 * Created by mp on 6/7/17.
 *
 * É como um elemento input, só que permite usar o MFbind(), permite listas de nomes e nomes + códigos
 * O código do valor indicado fica em itemID
 * USAGE EXAMPLE:
 *
  TIPO BASICO ----------------------------------------------------------------------------------

  new InputLabel3(self.div, 300, 'EMPRESA CONTRATADA', '', {
        chaves:{empresa_contratada:undefined},
        border:'0px 0px 1px 0px solid #333',
        borderRadius:'none',
        oninput : function(){

        },
        onblur : function(){

        }
    });

  VARIACAO 01
  OU --------------------------------------------------------------------------------------------

     var at = new InputLabel3(self.div, 'calc(100% - 50px)', 'ATIVIDADE', '', {
            borderBottom : '1px solid #888',
            borderRadius : '0px',
            backgroundColor : '#f9f9f9'
        });
     at.divopcoesHeight = 260;
     at.database = [{id:5, nome:'Teste'}, {id:2, nome:'Nada'}];

  VARIACAO 02 --------------------------------------------------------------------------------------------

     var at = new InputLabel3(self.div, 'calc(100% - 50px)', 'ATIVIDADE', '', {
                borderBottom : '1px solid #888',
                borderRadius : '0px',
                backgroundColor : '#f9f9f9'
            });
     at.divopcoesHeight = 260;
     at.database = ['Bola', 'Casa', 'Terreno'];

 VARIACAO 03 ---------------------------------------------------------------------------------------------

     var at = new InputLabel3(self.div, 'calc(100% - 50px)', 'ATIVIDADE', '', {
                    borderBottom : '1px solid #888',
                    borderRadius : '0px',
                    backgroundColor : '#f9f9f9'
                });
     at.divopcoesHeight = 260;
     at.databaseSearch = function(textValue, callback){
        // vai buscar no servidor os valores que vao compor o database que serao retornados
        // sob a forma das Variacoes 02 ou 03
     };
 VARIACAO 04 ---------------------------------------------------------------------------------------------
 OBS1: Essa variacao obtera os dados com as opcoes apos uma operacao XMLHTTPRequest()
 Para isso, sera necessario indicar qual a funcao externa que fara a busca pelos dados
 Exemplo:
    var inpPesq2 = new InputLabel3(divPesq, 100, "Pesquisar ou NUP", "", {
        display : "inline-block"
        //borderBottom : "1px solid #999"
    });
    inpPesq2.onfocus = function(){
        if (!inpPesq2.inp.value) {
            divPesq.style.width = "400px";
            inpPesq2.box.style.width = "calc(100% - 40px)";
        }
    };
    inpPesq2.onblur = function(){
        if (!inpPesq2.inp.value) divPesq.style.width = divPesqDefaultWidth;
    };
    inpPesq2.oninput = function(){
        self.analisaPesquisa(inpPesq2.inp);
    };
    inpPesq2.onkeyup = function(e){
        if (e.keyCode === 13) {
            self.analisaPesquisa(inpPesq2.inp, true);
        }
    };
    inpPesq2.databaseSearch = self.buscaNupCompleto; // Funcao que busca os dados na NET

 OBS2: Os dados da rede deverao vir sob uma das seguintes formas:
 Forma 1: Array of Dictionaries with the keys "nome", "id" ["exibir", "final"]
 Forma 2: Array of Strings
 Na Forma 1, a chave "nome" sera exibida na caixa de opcoes quando nao estiver presente a chave "exibir". Ela sera inserida no elemento input quando na ausencia da chave "final".
 Na Forma 1, a chave "final", se presente, sera o texto colocado no element input quando um item for selecionado
 Na Forma 1, a chave "exibir", se presente, indicara o texto a ser exibido na caixa de opcoes, que sera diferente do valor colocado no element input apos selecionado
 Na Forma 1, a chave "id" deve ser sempre um numero e vai ser inserida em cada opcao como atributo do elemento div de cada uma das opcoes.
 Abaixo, um exemplo da funcao que busca os dados na NET e que formata os dados para inputLabel3
 Note, que essa funcao devera sempre retornar para InputLabel3, ainda que nao forme um banco de dados.
 TelaTarefas.prototype.buscaNupCompleto = function(texto, callback){
        var self = this;
        var limpa = function (numero) {
            // Retira os caracteres "." "/" "-", mas deixa o dígito verificador da string
            temp = "";
            for (i = 0; i < numero.length; i++) if ((numero[i] >= '0') && (numero[i] <= '9')) temp += numero[i];
            return temp;
        };
        texto = limpa(texto);
        if (texto.length > 6) { // Somente quando existem ao menos 7 numeros a pesquisa sera feita
            if (MFt.server().indexOf('chrome-extension:') === 0) {
                MFt.xml({
                    maximoTentativas : 1,
                    url : 'https://sapiens.agu.gov.br/route',
                    msg : new Payloads().NUPCompleto(texto),
                    justText : 1,
                    callback : function(d){
                        //console.log(d);
                        var dados;
                        if (d) {
                            try {
                                dados = JSON.parse(d);
                            }
                            catch (e) {
                                alert("Você parece não estar logado no Sapiens.");
                                location.reload();
                            }
                            if (dados && Object.prototype.toString.call(dados) === '[object Array]' && dados[0].result.success) {
                                if (dados && Object.prototype.toString.call(dados) === '[object Array]') {
                                    console.log(dados[0].result);
                                    if (dados[0].result.success) {
                                        var temp = [];
                                        dados[0].result.records.forEach(function (d) {
                                            temp.push(
                                                {
                                                    final : d.NUP,
                                                    nome : d.NUP,
                                                    exibir : "<span style='font-size: 12px;'><span style='color:blue;'>" +d.NUP + "</span>" + " " + (d.titulo ? d.titulo : "") + "</span>",
                                                    id : d.NUP
                                                }
                                            );
                                        });
                                        callback(temp);
                                    } else callback();
                                } else callback();
                            }
                            else {
                                alert("Você parece não estar logado no Sapiens.");
                                //location.reload();
                            }
                        }
                    },
                    errorCallback : function(d){
                        alert("Parece não haver conexão de internet!");
                        location.reload();
                    }
                });
            }
            else {
                alert("Ate o presente momento, apenas a versao do Chrome Extension foi desenvolvida");
            }
        }
        else {
            callback(undefined);
        }
 };

 -----------------------------------------------------------------------------------------------
 OBSERVACOES
 1. Para alterar a largura da caixa de texto, basta alterar o tamanho de "box"
 Exemplo: INSTANCIA.box.style.width = "calc(100% - 40px)";

 2. O conteudo do texto pode ser obtido com
 Exemplo: INSTANCIA.inp.value

 */
function InputLabel3(div, width, label, valor, props){
    // todo: Quando ocorre o "blur" e se faz o focus novamente, o input não permite a seleção de outro item. CORRIGIR!!!
    // {tipo = 'password'} define o campo como password
    var self = this;
    var database = undefined; // Lista com as palavras ou palavras e códigos de referência
    var divopcoes = undefined; // Faz parte da lista com as palavras
    var divopcoesHeight = undefined;
    var onkeyup, oninput, onchange, onfocus, onblur; // onchange é o mais apropriado para mudanças do itemID, quando há lista de opções
    var controleOn = false;
    var itemID; // Quando o database for composto por nome e id, vai representar a id selecionada
    var box = MFt.criaElem('div'); // Onde tudo vai ficar
    var divlabel = MFt.criaElem('div', null, box);
    var blurEvents = []; // Array de funções que serão chamadas no onblur
    var itemDataBase = undefined; // Vai apontar para o item do database correspondente à opção selecionada
    var databaseSearch = undefined; // Vai apontar para uma funcao que vai buscar os dados na internet
    var timerID; // Identificador do timer que ficara verificando alteracao no conteudo da input['text']
    var lastKeyPressed; // Hora da ultima vez em que uma tecla foi pressionada
    self.inp;
    // -----------------
    self.oldTextValue = ""; // Vai ser usado para comparar os valores de inp.value a fim de determinar se se deve proceder a pesquisa ou nao
    // -----------------
    self.colorInp = 'rgb(255, 0, 0)';
    self.width = width;
    self.label = label;
    if (props === undefined) throw ('props undefined');
    var tipo = 'text'; // text or password
    if (props && props.tipo) tipo = props.tipo;
    if (props && !props.chaves) props.chaves = undefined;
    Object.defineProperties(this, {
        inn : {get : function(){return 'innerHTML';}},
        timerID : {get : function(){return timerID;}, set : function(val){return timerID}},
        lastKeyPressed : { get : function(){return lastKeyPressed;}, set : function(val){lastKeyPressed = val;}},
        valor : {
            get : function(){
                return Object.prototype.toString.call(self.inp) === '[object HTMLInputElement]' ? self.inp.value : valor;
            },
            set : function(val){
                valor = val;
                if (self.inp && self.inp.value !== undefined) self.inp.value = val;
            }
        },
        value : {
            get : function(){
                return Object.prototype.toString.call(self.inp) === '[object HTMLInputElement]' ? self.inp.value : valor;
            },
            set : function(val){
                valor = val;
                if (self.inp && self.inp.value !== undefined) self.inp.value = val;
            }
        },
        disabled : {
            get : function(){return self.inp.disabled;},
            set : function(val){
                self.inp.disabled = val;
                self.inp.style.color = val ? '#333' : self.colorInp;
            }
        },
        chaves : {
            // APENAS SE FOR USAR O MFBIND.JS
            get : function(){
                return props.chaves;
            }
        },
        props : {
            get : function(){return props;}
        },
        tipo : {
            get : function(){return tipo;}
        },
        div : {get:function(){return div;}},
        onkeyup : {
            set : function(val){
                if (typeof val === 'function') {
                    onkeyup = val;
                }
                else throw 'InputLabel3: valor para onkeyup não é uma função';
            },
            get : function(){return onkeyup;}
        },
        oninput : {
            set : function(val){
                if (typeof val === 'function') {
                    oninput = val;
                    self.props.oninput = val;
                }
                else throw 'InputLabel3: valor para oninput não é uma função';
            },
            get : function(){return onkeyup;}
        },
        onchange : {
            // Vai ser disparado sempre que houver uma mudança de itemID, no caso da existência de itens, quando o database é preenchido
            set : function(val){
                if (typeof val === 'function') onchange = val;
                else throw new Error('Onchange precisa ser uma função');
            },
            get : function(){return onchange;}
        },
        onfocus : {
            get : function(){return onfocus;},
            set : function(val){
                if (typeof val === "function") onfocus = val;
                else throw new Error("Valor não corresponde a uma função - InputLabel3: onfocus");
            }
        },
        onblur : {
            get : function(){return onblur;},
            set : function(val){
                if (typeof val === "function") onblur = val;
                else throw new Error("Valor não corresponde a uma função - InputLabel3: onblur");
            }
        },
        controleOn : {
            get : function(){return controleOn;},
            set : function(val){
                controleOn = !(!val);
            }
        },
        box : { // Caixa que pega tudo
            get : function(){return box;}
        },
        divlabel : { // Caixinha que tem o Label
            get : function(){return divlabel;}
        },
        database : {
            get : function(){return database;},
            set : function(val){
                if (Object.prototype.toString.call(val) !== '[object Array]') throw new Error('Database precisa ser uma Array');
                database = val;
                self.divopcoes = val;
            }
        },
        itemID : {
            get : function(){return itemID;},
            set : function(val){
                if (val === undefined || val === null) {
                    itemID = undefined;
                    if (self.onchange) self.onchange(itemID);
                }
                else {
                    if (isNaN(val)) throw new Error('Impossível definir o ID como string');
                    if (!database) throw new Error('Impossível definir ID sem database carregado');
                    if (!database.length) throw new Error('Database não contém elementos');
                    switch (Object.prototype.toString.call(database[0])){
                        case '[object String]':
                            itemID = val;
                            if (self.onchange) self.onchange(itemID);
                            break;
                        case '[object Object]':
                            itemID = val;
                            for(let i = 0, maxi = self.database.length; i < maxi; i++) {
                                if (self.database[i]['id'] && self.database[i]['id'] === val) {
                                    if (self.database[i].nome) self.inp.value = self.database[i]['nome'];
                                    break;
                                }
                            }
                            if (self.onchange) self.onchange(itemID);
                            break;
                        default:
                            throw new Error('Database não contém dados válidos');
                    }
                }
            }
        },
        itemDataBase : { // Vai apontar para o item do database que for selecionado
            get : function(){return database[itemDataBase];},
            set : function(val){
                itemDataBase = val;
            }
        },
        divopcoes : {
            /*
                Vai ser sempre uma array como os modelos abaixo:
                ['word1', 'word2', 'word3',...]

                ou
                [
                {id:1, nome:'word1'},
                {id:2, nome:'word2'}
                {id:3, nome:'word3'}...
                ]
            */
            get : function(){return divopcoes;},
            set : function(val){ // Preenche o quadro de opções de texto para o input.text
                if (!database) database = val;
                var oldScreenX, oldScreenY; // Servem no onmouseout para melhorar a performance do Firefox
                if (divopcoes) {
                    var divs = divopcoes.getElementsByTagName('div');
                    if (divs.length) {
                        var params = divs[0].getBoundingClientRect();
                        MFt.clear(divopcoes);
                        var num = (database.length < 10 ? database.length : 10);
                        var tmp = parseInt(params.height) * parseInt(num);
                        divopcoes.style.height = tmp + 'px';
                    }
                }
                else {
                    divopcoes = MFt.criaElem('div', {
                        style : {
                            width :'calc(100% - 10px)',
                            height : self.divopcoesHeight,
                            backgroundColor : 'rgb(247, 247, 247)',
                            fontFamily : 'Arial, ArialMT',
                            position : 'absolute',
                            left : '0px',
                            // IMPORTANTE: se o InputLabel3 não é exibido na tela imediatamente após a criação self.box.offsetHeight será 0
                            // Nesses casos, sempre que o InputLabel3 for exibido na tela a mesma função deverá chamar InputLabel3.update() a fim de que as opções sejam corretamente exibidas
                            top : 'calc(' + (self.box.offsetHeight + 'px') + ' + 5px)',
                            paddingTop : '5px', // apenas para manter a separação visual e a continuidade física entre box e divopcoes
                            paddingLeft : '5px',
                            paddingRight : '5px',
                            overflow : 'scroll',
                            cursor : 'pointer',
                            webkitUserSelect : 'none',
                            mozUserSelect : 'none',
                            msUserSelect : 'none',
                            userSelect : 'none',
                            transition : 'opacity 0.5s ease',
                            opacity : 0,
                            borderBottom : '1px solid #aaa',
                            borderLeft : '1px solid #aaa',
                            borderRight : '1px solid #aaa',
                            boxShadow : '2px 2px 2px solid #999'
                        }
                    }, self.box, {
                        hidden : document.activeElement !== self.inp
                    });
                    divopcoes.style.zIndex = 1100;
                }
                if (self.databaseSearch) divopcoes.style.display = "block";
                // FOCUS
                // FOCUS
                // FOCUS
                // FOCUS
                // FOCUS
                self.inp.onfocus = function(){
                    // Esta função só toma controle de onfocus após aparecerem as opções no elemento divopcoes
                    // Antes dela, existe uma função anônima em self.init que cuida do evento.
                    divopcoes.hidden = false;
                    MFt.atribs(self.divlabel, {style:self.labelReduzido});
                    if (self.props && self.props.label2) self.divlabel[self.inn] = self.props.label2;
                    if (self.props && self.props.onfocus && typeof self.props.onfocus === 'function') self.prop.onfocus();
                    else if (self.onfocus) self.onfocus();
                    self.update();
                    requestAnimationFrame(function(){
                        requestAnimationFrame(function(){
                            divopcoes.style.opacity = 1;
                        });
                    });
                    if (self.onfocus) self.onfocus();
                };
                if (val.length) {
                    val.forEach(function (d) {
                        var exibir, nome, id, e1;
                        if (Object.prototype.toString.call(d) === '[object String]') nome = d;
                        else if (Object.prototype.toString.call(d) === '[object Object]' && d.nome && d.id !== undefined) {
                            final = d.final;
                            exibir = d.exibir;
                            nome = d.nome;
                            id = d.id;
                        }
                        e1 = MFt.criaElem('div', {
                                innerHTML: exibir || nome,
                                style: {
                                    width: '100%',
                                    overflow: 'hidden'
                                }
                            }, divopcoes,
                            (function (d) {
                                dicio = {};
                                dicio[self.inputLabel3OpcaoID] = ''; // Marcador para a funcao do clique detectar que uma opcao foi selecionada. Veja self.init()
                                if (d.id !== undefined) {
                                    dicio.identificador = d.id;
                                }
                                if (d.final !== undefined) dicio.final = d.final;
                                return dicio;
                            })(d)
                        );
                        e1.onmouseover = function () {
                            e1.style.backgroundColor = 'rgb(206, 217, 219)';
                        };
                        e1.onmouseout = function () {
                            //console.log("Mouse OUT " + new Date().getTime());
                            e1.style.backgroundColor = 'transparent';
                        };
                    });
                }
                else {
                    console.log('sem resultados');
                    self.divopcoes = ['Sem resultados'];
                }
            }
        },
        divopcoesHeight : {
            set : function(val){
                if (isNaN(val)) divopcoesHeight = val;
                else divopcoesHeight = val + 'px';
                if (divopcoes) {
                    divopcoes.style.height = divopcoesHeight;
                }
                else {
                    setTimeout(function(){
                        divopcoes.style.maxHeight = divopcoesHeight;
                    }, 1000);
                }
            },
            get : function(){return divopcoesHeight && parseInt(divopcoesHeight) >= 100 ? divopcoesHeight : '100px';}
        },
        blurEvents : {
            get : function(){return blurEvents;}
        },
        intervaloPesquisa : {
            // Tempo de espera apos o usuario parar de digitar para que se proceda a pesquisa (em ms)
            // Se a pesquisa eh para ser feita na NET, o tempo eh maior
            get : function(){return self.databaseSearch ? 1000 : 200;}
        },
        databaseSearch : {
            // Aponta para uma funcao que vai buscar os dados no servidor para alimentar self.database
            get : function(){return databaseSearch;},
            set : function(val){
                if (typeof val === "function") databaseSearch = val;
                else throw new Error("Valor especificado não corresponde a uma função.");
            }
        }
    });
    this.init();
}

InputLabel3.prototype.mainStyle = {
    marginTop: '0.5rem',
    marginRight: '0px',
    marginLeft: '5px',
    border: '0',
    borderBottom: '1px solid rgba(200, 200, 200, 1)',
    width: '100px',
    textDecoration: 'none',
    textAlign: 'left',
    fontWeight: 'normal',
    color: '#2b1ea3',
    outline: 'none', /* retira a borda ao redor do elemento no Chrome */
    background: 'rgba(255,255,255,0)'
};

InputLabel3.prototype.boxstyle = {
    borderRadius : '3px',
    border : 'none',
    paddingLeft : '10px',
    paddingRight : '3px',
    paddingTop : '3px',
    paddingBottom : '3px',
    position : 'relative',
    height : '2em',
    display : 'block'
};

InputLabel3.prototype.labelOriginal = {
    position : 'relative',
    top : '10px',
    left : '4px',
    width : 'calc(100% - 12px)',
    //color : 'rgba(5, 43, 255, 0.38)',
    color : 'rgba(0,0,0, 0.38)',
    fontFamily : 'Arial, Tahoma, Ubuntu, ArialMT',
    //fontWeight : 'bold',
    fontSize : '0.7em',
    transform : 'scale(1.5)',
    transitionDuration : '0.2s',
    transformOrigin : 'top left',
    textAlign : 'left'
};
InputLabel3.prototype.labelReduzido = {
    position : 'relative',
    transform : 'scale(1)',
    top : '-1px',
    left : '4px',
    color : 'rgba(0,0,0, 1)',
    //color : 'rgb(247, 5, 59)',
    fontFamily : 'Arial, Tahoma, Ubuntu, ArialMT',
    //fontWeight : 'bold',
    fontSize : '0.8em',
    transitionDuration : '0.2s',
    transformOrigin : 'top left',
    textAlign : 'left'
};

InputLabel3.prototype.init = function(){
    var self = this;
    // o self.inputLabelID sera o identificador utilizado para encontrar a opcao selecionada apos os cliques do mouse
    // Servira tambem para diferenciar as diversas instancias dos elementos de inputLabel3 na pagina
    // Esse valor sera colocado como atributo dos elementos que vai ficar dentro de self.divopcoes
    self.IDENT = (new Date().getTime()).toString() + (Math.floor(Math.random() * 1000)).toString();
    self.inputLabel3OpcaoID = "inputlabel3_op_" + self.IDENT;
    self.inputLabel3inputID = "inputlabel3_in_" + self.IDENT;
    self.click = function(e){
        // o alvo é filho de self.divopcoes?
        // Precisei criar uma função que monitorasse todos os cliques.
        // Não deu pra usar o "onblur" porque sempre que esse evento ocorria
        // ...o self.divopcoes era "hidden" e não ocorria o evento "onclick" sobre
        // ...o elemento selecionado dentro de self.divopcoes.
        var pai = e.target;
        //console.group("CLICK______");
        //console.log(pai);
        //console.log(Object.prototype.toString.call(pai));
        var elementoInput = false;
        var elementoOpcao = false;
        while (pai && pai.parentNode) {
            //console.group("PAI_____");
            //console.log(pai);
            //console.groupEnd();
            if (pai.hasAttribute(self.inputLabel3OpcaoID) && pai.hasAttribute('identificador')) {
                //console.log('Encontrei o pai');
                //console.log('tem identificador');
                elementoOpcao = true;
                if (pai.getAttribute('final')) {
                    self.inp.value = pai.getAttribute('final');
                    self.inp.oninput.call(null, self); // chama o on input quando se seleciona um item do banco de dados
                }
                else {
                    self.inp.value = pai.innerText;
                    self.oldTextValue = pai.innerText; // evita que faca um novo XMLHttpRequest em self.timer()
                }
                self.itemID = (function(){
                    var identificador = parseInt(pai.getAttribute('identificador'));
                    for(var i = 0, maxi = self.database.length; i < maxi; i++) {
                        if (parseInt(self.database[i].id) === identificador) {
                            self.itemDataBase = i;
                            if (self.onselect && typeof self.onselect === 'function') self.onselect(self);
                            break;
                        }
                    }
                    return identificador;
                })();
                self.divopcoes.style.opacity = 0;
                break;
            }
            else if (pai.hasAttribute(self.inputLabel3inputID)) {
                elementoInput = true;
                break;
            }
            pai = pai.parentNode;
        }
        if (!elementoInput && !elementoOpcao) {
            //console.log("ESCONDENDO");
            if (self.divopcoes) self.divopcoes.hidden = 'true';
            //console.log(e);
            //self.onblur();
        }
        //console.groupEnd();
    };
    window.addEventListener('click', self.click);
    var divExtra;
    if (self.props.divExtra) {
        divExtra = MFt.criaElem('div',{
            style : {
                display : 'block'
            }
        }, self.div);
    }
    MFt.atribs(self.box, {
        style : self.boxstyle
    });
    MFt.appendElems(divExtra ? divExtra : self.div, self.box);
    if (self.props && self.props.display) self.box.style.display = self.props.display;
    self.box.style.width = self.width + 'px';
    self.divlabel[self.inn] = self.label;
    MFt.atribs(self.divlabel, {
        style : self.valor ? self.labelReduzido : self.labelOriginal
    });
    self.inp = MFt.criaElem('input', {
        type : self.tipo,
        value : self.valor ? self.valor : '',
        style : {
            fontFamily : 'Tahoma, Ubuntu, ArialMT', // ArialMT para iPhones
            fontSize : '0.9em',
            width : 'calc(100% - 12px)',
            position : 'absolute',
            bottom : MFt.smartphoneDetect() === 'iPhone' ? '-6px' : '0',
            left : '4px',
            paddingTop : '1em',
            marginTop : '1em',
            backgroundColor : 'rgba(255, 255, 255, 0)',
            border : 'none',
            borderRadius : '6px',
            paddingLeft : '5px',
            color : self.colorInp,
            outline : 'none'
        }
    }, self.box);
    self.inp.setAttribute(self.inputLabel3inputID, "");
    if (self.props.border) self.box.style.border = self.props.border;
    if (self.props.borderRadius) self.box.style.borderRadius = self.props.borderRadius;
    if (self.props.borderTop) self.box.style.borderTop = self.props.borderTop;
    if (self.props.borderBottom) self.box.style.borderBottom = self.props.borderBottom;
    if (self.props.borderLeft) self.box.style.borderLeft = self.props.borderLeft;
    if (self.props.borderRight) self.box.style.borderRight = self.props.borderRight;
    if (self.props.backgroundColor) self.box.style.backgroundColor = self.props.backgroundColor;
    if (self.props.fontSize) self.inp.style.fontSize = self.props.fontSize;
    if (self.props.margin) self.box.style.margin = self.props.margin;
    if (self.props.marginTop) self.box.style.marginTop = self.props.marginTop;
    if (self.props.marginBottom) self.box.style.marginBottom = self.props.marginBottom;
    if (self.props.marginLeft) self.box.style.marginLeft = self.props.marginLeft;
    if (self.props.marginRight) self.box.style.marginRight = self.props.marginRight;
    if (self.props.top) self.box.style.top = self.props.top;
    var onInput = function(e){
        self.lastKeyPressed = new Date();
        self.itemID = (function(){
            self.itemDataBase = undefined;
            return undefined;
        })();
        if (self.props && self.props.oninput && typeof self.props.oninput === "function") {
            self.props.oninput(e);
        }
        else if (self.props && self.props.func && typeof self.props.func === "function") {
            self.props.func(e);
        }
    };
    self.inp.onkeyup = function(e){
        if (typeof self.onkeyup === 'function') {
            self.onkeyup(e);
        }
    };
    // FOCUS
    // FOCUS
    // FOCUS
    (function(eInput){
        // Esta função apenas toma conta do evento enquanto não aparecerem as opções do elemento divopcoes
        // Depois disso, o evento onfocus é tratado em um get/set na inicialização da classe
        eInput.onfocus = function(){
            console.log('onfocus');
            MFt.atribs(self.divlabel, {style:self.labelReduzido});
            if (self.props && self.props.label2) self.divlabel[self.inn] = self.props.label2;
            if (self.props && self.props.onfocus && typeof self.props.onfocus === 'function') self.prop.onfocus();
            else if (self.onfocus) self.onfocus();
        };
    })(self.inp);

    // ON BLUR
    // ON BLUR
    // ON BLUR
    // ON BLUR
    // PRECISEI ATRASAR A RESPOSTA DO ONBLUR PORQUE QUANDO SE CLICA EM UMA DAS OPCOES
    // O EVENTO DO CLIQUE VEM DEPOIS DO ONBLUR, E O ONBLUR NAO PEGA O VALOR DO ELEMENTO INPUT ATUALIZADO
    (function(eInput, eLabel) {
        var onblur = function(e){
            var contador = 20; // 10 frames foi o tempo minimo de atraso da resposta do onblur em relacao aos cliques, por isso coloquei um valor maior
            var frame = function(){
                contador--;
                if (contador <= 0) {
                    if (self.divopcoes) {
                        self.divopcoes.setAttribute('hidden', true);
                        self.divopcoes.style.display = 'none';
                    }
                    if (eInput.value.length < 1) { // string vazia
                        MFt.atribs(eLabel, {style:self.labelOriginal});
                        self.divlabel[self.inn] = self.label;
                    }
                    else {
                        if (self.props && self.props.label2) self.divlabel[self.inn] = self.props.label2;
                        else self.divlabel[self.inn] = self.label;
                    }
                    if (self.props.onblur && typeof self.props.onblur === 'function'){
                        self.props.onblur.bind(self)(eInput);
                    }
                    else if (self.onblur) self.onblur(eInput);
                    else if (self.blurEvents.length === 0) console.log('NÂO existem blurEvents');
                    else self.blurEvents.forEach(function(d){setTimeout(function(){d();}, 1000)});
                }
                else {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        };

        try { // Se mfbind.js não tiver sido usado, vai dar erro, mas esse erro é capturado
            if (a && a.bind && self.chaves) {
                a.bind(eInput, self.chaves, onInput, '', onblur);
            }
            else {
                eInput.onblur = onblur;
                eInput.oninput = onInput.bind(self);
            }
        }
        catch(err){
            eInput.onblur = onblur;
            eInput.oninput = onInput;
        }

    })(self.inp, self.divlabel);
    self.timerID = setTimeout(function(){self.timer();}, 500);
    setInterval(function(){
        if (self.inp.value.length) {
            //console.log(self.inp.value.length);
            //self.divlabel.style = self.labelReduzido;
        }
        //else self.divlabel.style = self.labelOriginal;
    }, 1200);
};

InputLabel3.prototype.focus = function(){
    var self = this;
    self.inp.focus();
};

/**
 * METODO QUE APRESENTA AS OPCOES ABAIXO DO INPUT - CAMPO DE TEXTO
 *
 *
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
InputLabel3.prototype.timer = function(){
    var self = this;
    if (self.lastKeyPressed) {
        var lapso = new Date().getTime() - self.lastKeyPressed.getTime();
        if (lapso > self.intervaloPesquisa && self.inp.value.length > 2) {
            if (self.oldTextValue !== self.inp.value) {
                self.oldTextValue = self.inp.value;
                if (self.databaseSearch) { // Versao para buscar os dados na Internet
                    //console.log("DO IT " + new Date().getTime());
                    self.aguarde();
                    self.databaseSearch(self.inp.value, function (dados) {
                        //console.log(dados);
                        if (Object.prototype.toString.call(dados) === '[object Array]') {
                            self.database = dados;
                            //console.log(dados);
                            self.filldivopcoes.bind(self)(true);
                            self.update();
                        }
                        self.controleOn = false;
                    });
                }
                else { // Versao para os dados ja encaminhados na criacao do instancia
                    self.filldivopcoes.bind(self)();
                    self.controleOn = false;
                }
            }
        }
    }
    self.timerID = setTimeout(function(){self.timer();}, 500);
};


InputLabel3.prototype.filldivopcoes = function(fromInternet){
    var self = this;
    fromInternet = fromInternet ? fromInternet : false;
    if (fromInternet && self.database && self.database.length) {
        self.divopcoes = self.database;
    }
    else if (self.database && self.database.length) {
        var termos = self.inp.value.split(' ');
        var nome;
        //console.log(termos);
        var res = [];
        self.database.forEach(function(d){
            var positivo = true;
            for(var i = 0, max = termos.length; i < max; i++) {
                if (Object.prototype.toString.call(d) === '[object String]') nome = d;
                else if (Object.prototype.toString.call(d) === '[object Object]') nome = d.nome;
                else throw new Error('Database nem é array de strings nem array de objetos');
                if (nome.toLowerCase().indexOf(termos[i].toLowerCase()) < 0) {
                    positivo = false;
                    break;
                }
            }
            if (positivo) {
                res.push(d);
            }
        });
        //console.log(res);
        self.divopcoes = res;
        self.controleOn = false;
    }
    else {
        console.log('vazio');
    }
};

InputLabel3.prototype.update = function(){
    // IMPORTANTE: se o InputLabel3 não é exibido na tela imediatamente após a criação self.box.offsetHeight será 0
    // Nesses casos, sempre que o InputLabel3 for exibido na tela a mesma função deverá chamar InputLabel3.update() a fim de que as opções sejam corretamente exibidas
    var self = this;
    self.divopcoes.style.top = 'calc(' + (self.box.offsetHeight + 'px') + ' + 0px)';
};

InputLabel3.prototype.aguarde = function(){
    var self = this;
    self.divopcoes = ['Aguarde...'];
    self.divopcoes.style.height = '20px';
    self.divopcoes.style.hidden = false;
    MFt.criaElem('div', {
        innerHTML : 'Aguarde...'
    }, self.divopcoes);
};