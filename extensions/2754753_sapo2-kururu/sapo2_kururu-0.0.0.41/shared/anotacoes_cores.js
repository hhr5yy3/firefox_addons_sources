class AnotacoesCores {
    static get cores() {return [
        // PRECISAM ESTAR EM HEXADECIMAL PARA TER COMPATIBILIDADE COM OS MARCADORES DO SUPER em tela_anotacao.js
        "#FAFAFA", // 'rgb(250, 250, 250)', // cinza
        "#54D07C", // 'rgb(84,208,124)', // verde?
        "#ECFD79", // 'rgb(236,253,121)', // amarelo
        "#FB7A4A", // 'rgb(251,122,74)', // abobora
        "#F72F94", // 'rgb(247,47,148)', // roxo?
        "#147EB1", // 'rgb(20,126,177)' // azul
    ]}

    static get_cor(indice) {
        return AnotacoesCores.cores[indice % AnotacoesCores.cores.length];
    }
}