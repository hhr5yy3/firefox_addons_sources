function escapeHtml(text) {
    text = "" + (text || "");
    return text.replace(/[\"&\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;', '<': '&lt;', '>': '&gt;'
        }[a];
    });
}

function setDropdown() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.textContent = selElmnt.options[selElmnt.selectedIndex].textContent;
        a.classList.add(selElmnt.options[selElmnt.selectedIndex].getAttribute('data-provider'));
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.className = selElmnt.options[j].className;
            if(selElmnt.options[j].textContent === a.textContent) {
                c.classList.add('same-as-selected');
            }
            let attr =  selElmnt.options[j].getAttribute("data-provider")
            c.setAttribute("data-provider", attr);
            c.textContent = selElmnt.options[j].textContent;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h, sl, yl, optionClaas;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;                
                for (i = 0; i < sl; i++) {
                    if (s.options[i].textContent == this.textContent) {
                        optionClaas = this.className;
                        s.selectedIndex = i;
                        h.textContent = this.textContent;
                        h.removeAttribute('class');
                        if(!(h.classList.contains(this.getAttribute("data-provider")))) {
                            h.classList.add('select-selected', this.getAttribute("data-provider"));
                            h.setAttribute("data-provider", this.getAttribute("data-provider"));
                        }

                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            // y[k].removeAttribute("class");
                            y[k].classList.remove('same-as-selected');
                        }
                        this.setAttribute("class", `same-as-selected ${optionClaas}`);
                        // closeAllSelect(this);
                        break;
                    }
                }
                h.click();
            });

            b.appendChild(c);
        }

        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            // storageReplacer.setLocalStorageItem("defaultSp",this.getAttribute('data-provider'));            
            changeClockFontSize(this.getAttribute('data-provider'));  
            e.stopPropagation();
            colourPickerWrap.classList.add('hide');
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}



function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", function() {
    toggleColorPicker;
    closeAllSelect;
});