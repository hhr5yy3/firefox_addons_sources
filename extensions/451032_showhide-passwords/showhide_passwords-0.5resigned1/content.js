        var inputElements = document.getElementsByTagName('input');
        for (var i = 0, j = inputElements.length; i < j; i++) {
            if (inputElements[i].type === 'password') {
				
				var a = document.createElement('a');
                a.setAttribute('href', 'Show');
				a.style.display = "inline";
				a.style.backgroundColor = "red";
				a.style.color = "white";
				
                a.appendChild(document.createTextNode('Show'));
			   
 			   inputElements[i].parentNode.insertBefore(a, inputElements[i].nextElementSibling);
				
                a.addEventListener('click', function (e) {
                    var t = e.target;
                    var p = t.previousElementSibling.lastChild;
					
					if (p === null) {
					p = t.previousElementSibling;
					}
					
                    if (p.getAttribute('type') === 'password') {
                        p.setAttribute('type', 'text');
                        t.textContent = 'Hide';
                        t.setAttribute('href', '#');
                    } else {
                        p.setAttribute('type', 'password');
                        t.textContent = 'Show';
                        t.setAttribute('href', '#');
                    }
					
                    e.preventDefault();
                }, false);
            }
        }