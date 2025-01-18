function trimAndReturn(str) {
  var res;
  if (typeof str === 'string') {
    res = str.trim()
  }

  return res;
}

USER = {
  profile: null,
  getProfile: function(iframeDoc) {

    // If profile bar is not available we may still have a token authed user
    if (!$('a#meusdados', iframeDoc)[0]) {

      if(window.location.pathname === "/projudi/processo/validacaoDocumentos.do") {
        // for guest token-authenticated user process screen
        USER.profile = {
          name: 'Convidado com chave',
          userLink: window.location.toString(),
          status: 'Ativo',
        }
        return USER.profile;
      } else {
        return null;
      }

    }

    var name = $("a#meusdados", iframeDoc)[0].innerText;
    var userLink = $("a#meusdados", iframeDoc)[0].attributes.href.value;
    var tribunal = $("a#areaatuacao", iframeDoc).text() || $("span.userinfo_label:contains('Atuação')", iframeDoc).next().text();
    var role = $("span.userinfo_label:contains('Atribuição')", iframeDoc).next().text();

    var r = /(.*?)\s\((.*?)\)/.exec(role);

    var login = r[2];
    role = r[1];

    USER.profile = {
      name: trimAndReturn(name),
      userLink: trimAndReturn(userLink),
      tribunal: trimAndReturn(tribunal),
      login: trimAndReturn(login),
      role: trimAndReturn(role),
      status: 'Ativo'
    };

    return USER.profile;
  },

  isModerator: function() {
    var role = USER.profile && USER.profile.role || '';
    var reg = /.*(analista|assessor|magistrado|autuador|mediador|conciliador|t.cnico judici.rio|servidor judici.rio).*/ig;
    var notReg = /Escriv.o de pol.cia/;
    var m = reg.exec(role) && !notReg.exec(role) ? true : false;

    console.log('isModerator', {permission: m, role: role});
    return m;
  }

};
