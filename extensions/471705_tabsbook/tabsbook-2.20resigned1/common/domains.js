var z_domains = {
    // Ставим www последним, так как он будет добавлен в последнюю очередь и использован по умолчанию после установки плагина
    domains : ["www.tabsbook.ru"],
    popup_default_domain : "www.tabsbook.ru",
    popup_domain : "www.tabsbook.ru",
    addDomain : function(domain) {
        this.popup_domain = domain;
        var el;
        var exists = false;
        for(el in this.domains)
            if(this.domains[el] == domain)
                exists = true;
        if(!exists) this.domains.push(domain);
    },
    removeDomain : function(domain) {
        var tmp =[];
        for(el in this.domains) {
            if(this.domains[el] != domain)
                tmp.push(this.domains[el]);
        }
        this.domains = tmp;
    }
}