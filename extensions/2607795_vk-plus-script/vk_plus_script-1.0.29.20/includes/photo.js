// ==UserScript==
// @include *://*.userapi.com/*
// ==/UserScript==

var browser = browser || chrome
var extension = browser.extension || browser.runtime

if (!extension.onMessage) extension = browser.runtime

if (location.href.match(/\.userapi\.com/) && location.pathname.match(/\.jpg$/)) {
   var img = document.getElementsByTagName('img')[0]
   img.style.marginTop = Math.max(0, Math.round((window.innerHeight - img.clientHeight) / 2)) + 'px'
   window.addEventListener('resize', function() {
      img.style.marginTop = Math.max(0, Math.round((window.innerHeight - img.clientHeight) / 2)) + 'px'
   }, false)
   
   var d = document.createElement('div')
   d.id = 'download_icon'
   d.innerHTML = '<div></div><div></div><div></div>'
   document.body.appendChild(d)
   
   extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.operation == 'download') {
         document.getElementById('download_icon').style.opacity = '1'
         document.getElementById('download_icon').children[0].style.top = '3px'
         document.getElementById('download_icon').children[1].style.top = '18px'
         setTimeout(function() {
            document.getElementById('download_icon').style.transition = 'opacity 1s cubic-bezier(0.57, 0.92, 1, 1)'
            setTimeout(function() {
               document.getElementById('download_icon').style.opacity = ''
               setTimeout(function() {
                  document.getElementById('download_icon').style.transition = ''
                  document.getElementById('download_icon').children[0].style.top = ''
                  document.getElementById('download_icon').children[1].style.top = ''
               }, 1000)
            }, 300)
         }, 700)
      }
   })
}