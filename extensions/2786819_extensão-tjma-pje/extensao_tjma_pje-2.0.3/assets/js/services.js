function touch(token, instancia){
    return $.ajax({
        type: "GET",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        url: API + '/touch',
        headers: {
            "Token": token,
            "Instancia": instancia,
        }
    });
}

function checkServices(token, instancia, processo){
    return $.ajax({
        type: "GET",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        url: API + '/processos/existencia-informacoes?numeroProcesso='+processo,
        headers: {
            "Token": token,
            "Instancia": instancia,
        }
    });
}