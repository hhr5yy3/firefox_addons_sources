//Система подбра туров "Megatec Мастер-WEB"
var OPERATOR_NAME = "China Travel";

function createOrderCell(panel) {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    if ( !panel ) {
        wrapper.style.cssText = 'display:flex;position:fixed;top:25%;left:5%;';
    }
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "185px";
    wrapper.classList.add('qq');
    wrapper.append(container);
    return wrapper;
}

function injectData() {
    if ( !document.querySelector('.qq') ) {
        $$("#aspnetForm").forEach(div => {
            if ( !div.querySelector(".qq") ) {
                const cell = createOrderCell();
                cell.style.position = 'fixed';
                cell.style.top = '100px';
                cell.style.left = '8px';
                cell.style.padding = '8px';
                div.append(cell)

                injectCurrencySelectionUtil('.qq-box', OPERATOR_CURRENCY, 'width:100%;', "font-size:12px", "display:flex;flex-direction: column;width:100%;")
            }
        });
    }
}
