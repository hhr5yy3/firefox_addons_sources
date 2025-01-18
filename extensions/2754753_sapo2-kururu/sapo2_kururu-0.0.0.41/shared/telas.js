/**
 * Created by Manoel Filho on 3/31/2016.
 *
 * Divide a área de trabalho em duas ou três telas, a depender do numTelas.
 * Manipula o tamanho das telas para se adaptar às mudanças de tamanho do browser.
 * Os elementos podem ser introduzidos em cada uma das telas criadas.
 * Ex.: var telas = new Telas(document.body, 3);
 * Depende de mftools.js
 */
function Telas(elem, numTelas) {
    MFt.clear(elem);
    MFt.atribs(elem, {
        style: {
            margin: '0',
            padding: '0',
            border: 'none'
        }
    })
    this.mainDiv = document.createElement('div');
    if (numTelas === 3) this.telaTopo = document.createElement('div');
    else this.telaTopo = undefined;
    this.telaEsquerda = document.createElement('div');
    this.telaDireita = document.createElement('div');
    this.linguetaDiv = document.createElement('div');
    this.tamanhoTela = { // A fim de evitar o redimensionamento dos elementos caso exista o evento resize, mas não seja mudado o tamanho da tela
        width: window.innerWidth,
        height: window.innerHeight,
        timestamp: new Date().valueOf(),
    }
    this.onBeforeResize = undefined; // can point to function who is called before resize
    this.onAfterResize = undefined; // can point to function who is called after resize
    this.redesenharTimeout = undefined;
}

Telas.prototype.tamEsquerda = 300;
Telas.prototype.tamTopo = 40;
Telas.prototype.margin = 0;
Telas.prototype.radius = 0;

Telas.prototype.init = function(self) {
    self.criaAmbiente(self);
};

Telas.prototype.criaAmbiente = function(self) {
    MFt.zeraTudo(document.body);
    document.body.style.backgroundColor = "#000";
    document.body.style.overflow = 'hidden';
    self.mainDivDrawer(self);
    window.addEventListener('resize', ()=>{
        const tempoRedesenhar = 3500; // O tempo que o Firefox leva é de cerca de 2100ms
        if (!self.redesenharTimeout) {
            // às vezes o firefox redimensiona a tela por 2100ms, gerando o evento resize (não sei porque)
            // esse evento refaz o desenho de toda a Tela() com o reposicionamento do PDF na página do marcador
            // aqui faz com que esse redimensionamento somente determine o redesenhar após consolidado depois de um tempo
            // ou seja, evita-se que o firefox fique perturbando a visualização dos PDFs
            console.group('REDESENHAR');
            console.log(new Date().valueOf());
            console.log({
                width: window.innerWidth,
                height: window.innerHeight,
                timestamp: new Date().valueOf()
            });
            console.groupEnd();
            self.redesenharTimeout = setTimeout(()=>{
                if ((self.tamanhoTela.width !== window.innerWidth || self.tamanhoTela.height !== window.innerHeight)) {
                    if (typeof this.onBeforeResize === 'function') {
                        this.onBeforeResize(self.tamanhoTela.width, self.tamanhoTela.height);
                    }
                    self.tamanhoTela.width = window.innerWidth;
                    self.tamanhoTela.height = window.innerHeight;
                    self.tamanhoTela.timestamp = new Date().valueOf();
                    console.group('REDESENHANDO -------');
                    console.log(self.tamanhoTela);
                    console.groupEnd();
                    self.mainDivDrawer(self, false);
                    if (typeof this.onAfterResize === 'function') {
                        this.onAfterResize(self.tamanhoTela.width, self.tamanhoTela.height);
                    }
                }
                else {
                    console.log('NAO REDESENHAR');
                }
                self.redesenharTimeout = undefined;
            }, tempoRedesenhar);
        }
    }, false);
};

Telas.prototype.lingueta = function() {
    MFt.clear(this.linguetaDiv);
    let intervalo = 80; // Intervalo de atualização do browser em ms
    let pontoX;
    let lastMove;
    let grabbing = false;
    let setas = new Image();
    setas.src = 'data:image/png;base64,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';
    setas.width = 5; // Se deixar mais largo, ele atrapalha o scrollbar???
    setas.height = 10;
    setas.setAttribute('draggable', false);
    const li = this.linguetaDiv;
    MFt.atribs(li, {
        style : {
            position : 'fixed',
            top : (this.tamTopo + this.margin) + 'px',
            left : (this.tamEsquerda - (setas.width / 2)) + 'px',
            width : setas.width + 'px',
            height : setas.height + '15px',
            cursor : 'col-resize'
        }
    });
    li.draggable = false;
    li.appendChild(setas);
    li.style.zIndex = 3;
    let xOriginal;
    let tamOriginal;
    let lastX;
    let params = [ // Parâmetros que permitem ou impedem a seleção de texto
        'webkitUserSelect',
        'mozUserSelect',
        'msUserSelect',
        'userSelect',
    ];
    let mousemove = (e) => { // Sistema para diminuir a frequência das atualizações e aliviar o browser
        pontoX = e.pageX;
        let recheck = () => {
            let now = new Date();
            if (lastMove) {
                let difTempo = now - lastMove;
                if (difTempo >= intervalo) {
                    lastMove = now;
                    doMove();
                }
                else {
                    if (grabbing) setTimeout(recheck, intervalo);
                }
            }
            else {
                lastMove = new Date();
                if (grabbing) setTimeout(recheck, intervalo);
            }
        };
        let doMove = () => {
            let size = MFt.tamanhoTotal(this.telaEsquerda);
            let dif = pontoX - xOriginal;
            let novoX = (tamOriginal + dif) + 'px';
            this.telaEsquerda.style.width = novoX;
            this.telaDireita.style.left = (size.width) + 'px';
            this.telaDireita.style.width = (parseInt(getComputedStyle(this.telaDireita.parentNode)['width']) - size.width) + 'px';
            li.style.left = (parseInt(novoX) - (setas.width / 2)) + 'px';
        };
        recheck(); // Verifica se já se passaram mais de "X" milisegundos da última atualização
        if (Math.abs(e.pageX - lastX) > 100) { // Quando existem movimentos bruscos do mouse
            let ev = new MouseEvent('mouseup', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            window.dispatchEvent(ev);
        }
        lastX = e.pageX;
    };
    // let mousedown = (e) => {
    //     grabbing = true;
    //     li.style.cursor = 'grabbing';
    //     if (e.target !== li && e.target.parentNode !== li) return; // Só trata os eventos disparados de dentro do elemento "li"
    //     for(let i of params) document.body.style[i] = 'none';
    //     xOriginal = tamOriginal = parseInt(getComputedStyle(this.telaEsquerda).width);
    //     lastX = e.pageX;
    //     window.addEventListener('mousemove', mousemove, false);
    // };
    // let mouseup = (e) => {
    //     grabbing = false;
    //     li.style.cursor = 'col-resize';
    //     window.removeEventListener('mousemove', mousemove, false);
    //     for (let i = 0; i < params.length; i++) document.body.style[params[i]] = 'auto';
    // };
    const mouseup2 = e=>{
        window.removeEventListener('mousemove', mousemove);
        this.telaDireita.style.display = '';
        li.style.cursor = 'col-resize';
    };
    if (!li.parentNode) {
        document.body.appendChild(li);
        li.onmousedown = e=>{
            xOriginal = tamOriginal = parseInt(getComputedStyle(this.telaEsquerda).width);
            lastX = e.pageX;
            window.addEventListener('mousemove', mousemove, false);
            window.addEventListener('mouseup', mouseup2, false);
            this.telaDireita.style.display = 'none';
            // li.style.cursor = 'grabbing';
            for(let i of params) document.body.style[i] = 'none';
        };
        // window.addEventListener('mouseup', mouseup, false);
        // window.addEventListener('mousedown', mousedown, false);
    }
};

Telas.prototype.mainDivDrawer = function(self, resizeTelaEsquerda=true) {
    var radius = [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius'
    ];
    self.mainDiv.style.position = 'absolute';
    MFt.zeraTudo(self.mainDiv);
    self.mainDiv.style.margin = self.margin + 'px';
    for (var e in radius) self.mainDiv.style[radius[e]] = self.radius + 'px';
    self.mainDiv.style.backgroundColor = '#fff';
    self.mainDiv.style.overflow = 'hidden';
    document.body.appendChild(self.mainDiv);
    if (self.telaTopo) self.telaTopoDrawer(self);
    if (resizeTelaEsquerda) self.telaEsquerdaDrawer(self);
    self.fillParent(document.body);
    self.fillParent(self.mainDiv);
    if (self.telaTopo) self.fillParent(self.telaTopo, 'width');
    self.fillParent(self.telaEsquerda, 'height');
    self.telaDireitaDrawer(self);
    self.lingueta();
    window.addEventListener('resize', function() {
        self.fillParent.bind(self)(document.body);
        self.fillParent.bind(self)(self.mainDiv);
        self.fillParent.bind(self)(self.telaEsquerda, tipo='height');
    }, false);
};

Telas.prototype.telaTopoDrawer = function(self) {
    MFt.zeraTudo(self.telaTopo);
    MFt.atribs(self.telaTopo, {
        style : {
            boxShadow : "0px 1px 10px #aaa",
            height : self.tamTopo + 'px',
            position : 'absolute',
            top : '0px',
            left : '0px',
            backgroundColor : '#fff'
        }
    });
    self.mainDiv.appendChild(self.telaTopo);
    self.telaTopo.style.zIndex = 4;
};

Telas.prototype.telaEsquerdaDrawer = function(self) {
    MFt.zeraTudo(self.telaEsquerda);
    var top = 0;
    if (self.telaTopo) {
        top = MFt.totalHeight(self.telaTopo);
    }
    MFt.atribs(self.telaEsquerda, {
        style : {
            paddingTop : '5px',
            paddingBottom : (self.tamTopo + 20) + 'px',
            boxShadow : "0px 5px 10px #aaa",
            backgroundColor : getComputedStyle(self.telaEsquerda)?.backgroundColor || "#fff",
            width : self.tamEsquerda + 'px',
            position : 'absolute',
            top : top + 'px',
            left : '0px'
        }
    });
    self.mainDiv.appendChild(self.telaEsquerda);
    self.telaEsquerda.style.zIndex = 2;
};

Telas.prototype.telaDireitaDrawer = function(self) {
    MFt.zeraTudo(self.telaDireita);
    self.mainDiv.appendChild(self.telaDireita);
    var size = MFt.tamanhoTotal(self.telaEsquerda);
    var top = 0;
    if (self.telaTopo) {
        top = MFt.totalHeight(self.telaTopo);
    }
    MFt.atribs(self.telaDireita, {
        style : {
            boxShadow : "none",
            paddingBottom : (self.tamTopo + 20) + 'px',
            position : 'absolute',
            backgroundColor : getComputedStyle(self.telaDireita)?.backgroundColor || "rgb(255, 255, 255)",
            top : top + 'px',
            left : (size.width) + 'px',
            width : (parseInt(getComputedStyle(self.telaDireita.parentNode)['width']) - size.width) + 'px',
            height : (size.height - top) + 'px'
        }
    });
};

Telas.prototype.fillParent = function(elem, tipo) {
    // Faz com que o elemento preencha totalmente o espaço interno no avo
    // Define o tamanho interno do elemento subtraindo os valores de margin, padding e border
    // Tipos podem ser "width" ou "height"
    // Assim o preenchimento se da na orizontal ou na vertical ou se for undefined nos dois
    // Se numTelas == 3, vai existir o this.telaTop. Se ela existir devem ser desenhadas 3 telas
    // EXISTE UM PROBLEMA NO CÁLCULO DO VALOR DAS TELAS DIREITA E ESQUERDA QUE FARIA COM QUE
    // O HEIGHT DELAS FICASSE ALÉM DO NECESSÁRIO, TENDO COMO EFEITO ESCONDER PARTE DO QUE SERIA EXIBIDO
    // PARA RESOLVER O PROBLEMA, ACRESCENTEI UM PADDINGBOTTOM DO TAMANHO DE TELATOPO, QUE É JUSTAMENTE
    // A ÁREA QUE FICA ESCONDIDA.
    var getTopPos = function(el) {
        for (var topPos = 0; el != null; topPos += el.offsetTop, el = el.offsetParent);
        return topPos;
    };
    if (elem.tagName == 'BODY') {
        var maxWidth = parseInt(window.innerWidth);
        var maxHeight = parseInt(window.innerHeight);
    }
    else {
        var parent = elem.parentNode;
        var size = getComputedStyle(parent);
        var maxWidth = parseInt(size.width);
        var maxHeight = parseInt(size.height);
        if (self.telaTopo) {
            maxHeight = maxHeight - MFt.totalHeight(self.telaTopo);
        }
    }
    var width;
    var height;
    var fatorH = [
        'marginTop',
        'marginBottom',
        'paddingTop',
        'paddingBottom',
        'borderBottomWidth',
        'borderTopWidth'
    ];
    var fatorW = [
        'marginLeft',
        'marginRight',
        'paddingLeft',
        'paddingRight',
        'borderLeftWidth',
        'borderRightWidth'
    ];
    var tmp = maxHeight;
    for(var e in fatorH) tmp -= parseInt(getComputedStyle(elem)[fatorH[e]]);
    //tmp -= (getTopPos(elem) - getTopPos(this.telaTopo));
    height = tmp + 'px';
    tmp = maxWidth;
    for(e in fatorW) tmp -= parseInt(getComputedStyle(elem)[fatorW[e]]);
    width = tmp + 'px';
    if (tipo == undefined) {
        elem.style.width = width;
        elem.style.height = height;
    }
    else if (tipo.toLowerCase() == 'width') elem.style.width = width;
    else if (tipo.toLowerCase() == 'height') elem.style.height = height;
};