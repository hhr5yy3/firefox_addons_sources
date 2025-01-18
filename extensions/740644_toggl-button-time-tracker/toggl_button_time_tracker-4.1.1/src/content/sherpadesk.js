togglbutton.render("#ctl00_ctl00_PageBody_tktHeader",{},function(){const e=$("#ctl00_ctl00_PageBody_lbSubject");let t=e.textContent;t.indexOf(`
`)>0&&(t=t.substr(0,t.indexOf(`
`)));const n=togglbutton.createTimerLink({className:"sherpadesk",description:t});e.parentElement.appendChild(n)});
