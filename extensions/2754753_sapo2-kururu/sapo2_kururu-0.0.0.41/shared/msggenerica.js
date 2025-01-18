/**
 * Created by dell on 14/08/15.
 */


/**
 * EXEMPLO:
 var msg = new MsgGenerica('ERRO NO NUP', 200, 80, null, {
    link : '../images/ic_warning_white_24px.svg',
    width : 20,
    height : 20
});
*
 *
 * @param msg
 * @param width
 * @param height
 * @param botao
 * @param icon
 * @constructor
 */
function MsgGenerica(msg, width, height, botao, icon) {
    var self = this;
    this.width = width || 300;
    this.height = height || 100;
    if (!msg) msg = 'Ok!';
    this.botao = botao;
    // A mensagem poderá ser mudada após a criação do objeto apenas mudando o valor de msg.
    Object.defineProperties(this, {
        msg : {
            get : function(){return msg;},
            set : function(val){
                msg = val;
                if (self.p1) {
                    self.p1['innerHTML'] = val;
                }
            }
        },
        icon : {
            get : function(){return icon;},
            set : function(val){
                var ic = new Image();
                icon = val;
                ic.width = self.icon.width;
                ic.height = self.icon.height;
                ic.style.width = self.icon.width + 'px';
                ic.style.height = self.icon.height + 'px';
                ic.style.transition = '1s';
                ic.style.transform = 'rotateY(90deg)';
                ic.src = self.icon.link;
                ic.onload = function(){
                    while (self.p2.firstChild) self.p2.removeChild(self.p2.firstChild);
                    self.p2.appendChild(ic);
                    setTimeout(function(){
                        ic.style.transform = 'rotateY(0deg)';
                    }, 80);
                };
            }
        },
        width : {
            get : function(){return width;},
            set : function(val) {
                self.div.style.width = isNaN(val) ? val : val.toString() + 'px';
                width = parseInt(val);
            }
        },
        height : {
            get : function(){return height;},
            set : function(val) {
                self.div.style.height = isNaN(val) ? val : val.toString() + 'px';
                height = parseInt(val);
            }
        }
    });
    this.init();
}

MsgGenerica.prototype = new PopUp();
MsgGenerica.prototype.constructor = MsgGenerica;
MsgGenerica.prototype.name = 'MsgGenerica';

MsgGenerica.prototype.formulario = function(self) {
    self.p1 = self.cria('div', {innerHTML : self.msg, style : {
        textAlign : 'center',
        // fontFamily : 'Tahoma, Arial',
        margin : '0px'
    }});
    self.p2 = self.cria('div');
    self.p2.style.textAlign = 'center';
    if (self.icon) {
        self.icon = self.icon;
        /*
        var ic = new Image();
        ic.width = self.icon.width;
        ic.height = self.icon.height;
        ic.style.width = self.icon.width + 'px';
        ic.style.height = self.icon.height + 'px';
        ic.src = self.icon.link;
        ic.onload = function(){
            self.p2.appendChild(ic);
        };
        */
    }
    self.div.appendChild(self.p1);
    self.div.appendChild(self.p2);
    if (self.botao) {
        var p3 = self.cria('p', {innerHTML : '', style : {textAlign : 'center'}});
        var bt = self.cria('input', {type : 'button', value : self.botao});
        p3.appendChild(bt);
        self.div.appendChild(p3);
        bt.onclick = function() {
            self.closeWindow(self);
        };
    }
};