function getElementsByClass(searchClass, node, tag) {
   var classElements = new Array();
   if ( node == null )
      node = document;
   if ( tag == null )
      tag = '*';
   var els = node.getElementsByTagName(tag);
   var elsLen = els.length;

   var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
   for (i = 0, j = 0; i < elsLen; i++) {
      if ( pattern.test(els[i].className) ) {
         classElements[j] = els[i];
         j++;
      }
   }
   return classElements;
}

window.addEventListener("DOMContentLoaded", function() {
   
   var extension = window.browser && window.browser.runtime || chrome.extension

   var els = getElementsByClass('checkbox', document.body, 'div')

   for (var i = 0; i < els.length; i++) {
      if (localStorage[els[i].getAttribute('data-value')] != 'false') {
         els[i].classList.add('enabled')
         els[i].children[0].checked = true
      }
      els[i].parentNode.parentNode.addEventListener('click', function() {
         var target = this.lastElementChild.children[0]
         if (!target.children[0].checked) {
            target.classList.add('enabled')
         } else {
            target.classList.remove('enabled')
         }
         target.children[0].checked = !target.children[0].checked
         var data = {}
         data[target.getAttribute('data-value')] = target.children[0].checked
         extension.sendMessage({ operation: 'update', data: data })
      }, false)
   }
   
})