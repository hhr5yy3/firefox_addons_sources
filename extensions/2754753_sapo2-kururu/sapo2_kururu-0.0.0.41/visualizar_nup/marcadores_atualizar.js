/**
 * Gerencia os bookmarks do SuperSapiens
 */
class MarcadoresAtualizar extends Payloads {
    constructor() {
        super();
        this.xml = new RequestMF();
        this.trabalhando = false;
        this.lista = [];
    }

    adicionar_marcador(obj) {
        if (!Number.isInteger(obj?.processo)) throw new Error('Erro processo ID');
        if (!Number.isInteger(obj?.pagina)) throw new Error('Erro pagina');
        if (!Number.isInteger(obj?.juntada)) throw new Error('Erro juntada ID');
        if (!Number.isInteger(obj?.componente)) throw new Error('Erro componente ID');
        if (typeof obj.nome !== 'string' && !obj.nome) throw new Error('Erro nome vazio');
        if (!obj.descricao || typeof obj?.descricao !== 'string') obj.descricao = '';
        this.lista.push(obj);
        if (!this.trabalhando) this.inserir_atualizar();
    }

    async esperar_marcador_sumir_db(marcador_novo, marcador_existente) {
        console.group('Esperando marcador desaparecer do DB');
        console.log(new Date());
        console.log(marcador_existente);
        console.groupEnd();
        let tentativa = 0;
        let repetir = true;
        do {
            console.log(`Tentativa ${++tentativa}`);
            repetir = await this.obter_marcador_existente(null, marcador_novo);
        } while (repetir);
        console.group('Marcador foi excluído');
        console.log(marcador_existente);
        console.log(new Date());
        console.groupEnd();
    }

    async inserir_atualizar() {
        this.trabalhando = true;
        if (this.lista.length === 0) return;
        const marcador_novo = this.lista[0];
        const marcador_existente = await this.obter_marcador_existente(null, marcador_novo); // Verifica se ja existe o marcador indicado para o processo, juntada, componente e pagina
        let res;
        if (marcador_existente) {
            res = await this.super_get(this.xml, this.delete_marcador(marcador_existente.id)); // Se houver, apaga
            if (!res?.id) {
                console.group();
                console.log('Erro ao tentar apagar o seguinte marcador (tentativa 1):');
                console.log(marcador_existente);
                console.log('Tentando novamente');
                console.groupEnd();
                await this.esperar(3000);
                res = await this.super_get(this.xml, this.delete_marcador(marcador_existente.id)); // Se der errado tenta apagar novamente
                if (!res?.id) {
                    console.group();
                    console.log('Erro ao tentar apagar o seguinte marcador (tentativa 2):');
                    console.log(marcador_existente);
                    console.log('Reiniciando procedimento.');
                    console.groupEnd();
                    await this.esperar(3000);
                    this.inserir_atualizar(); // Se der errado recomeca tudo
                    return;
                }
            }
            // Aqui deu certo apagar
            await this.esperar_marcador_sumir_db(marcador_novo, marcador_existente); // Espera o marcador sumir do DB
        }
        // Aqui ja nao existe mais nenhum marcador com o mesmo processo, juntada, componente e pagina.
        // Aqui salva o marcador seja ele novo, seja em substituicao ao antigo
        console.group("CRIAR MARCADOR", new Date());
        res = await this.super_get(this.xml, this.post_criar_marcador(marcador_novo.nome, marcador_novo.descricao, marcador_novo.pagina, marcador_novo.componente, marcador_novo.processo, marcador_novo.juntada, marcador_novo.cor));
        console.log(res);
        console.log(new Date());
        console.groupEnd();
        if (!res?.id) {
            console.group();
            console.log('Erro ao tentar inserir o seguinte marcador (tentativa 1):');
            console.log(marcador_novo);
            console.log('Tentando novamente');
            console.groupEnd();
            await this.esperar(3000);
            res = await this.super_get(this.xml, this.post_criar_marcador(marcador_novo.nome, marcador_novo.descricao, marcador_novo.pagina, marcador_novo.componente, marcador_novo.processo, marcador_novo.juntada, marcador_novo.cor));
            if (!res?.id) {
                console.group();
                console.log('Erro ao tentar inserir o seguinte marcador (tentativa 2):');
                console.log(marcador_novo);
                console.log('Reiniciando procedimento.');
                console.groupEnd();
                await this.esperar(3000);
                this.inserir_atualizar();
            }
        }
        this.lista.splice(0, 1);
        if (this.lista.length) {
            this.inserir_atualizar();
        }
        else {
            this.trabalhando = false;
        }
    }

    /**
     *
     * @param lista {Array<Object>|null} Ou recebe a lista do Super ou se receber nulo obtem a propria lista
     * @param marcador_novo
     * @returns {Promise<*>}
     */
    async obter_marcador_existente(lista, marcador_novo) {
        console.group("OBTENDO MARCADORES", new Date());
        lista = lista || await this.super_get(this.xml, this.get_marcadores(marcador_novo.processo), true);
        console.log(new Date());
        console.log(lista);
        let marcador_existente;
        if (Array.isArray(lista)) {
            marcador_existente = lista.filter(d=>
                d?.juntada?.id === marcador_novo.juntada &&
                d?.pagina === marcador_novo.pagina &&
                d?.componenteDigital.id === marcador_novo.componente
            );
        }
        marcador_existente = marcador_existente?.length ? marcador_existente[0] : undefined;
        console.log("Marcador existente: ", marcador_existente);
        console.log(new Date());
        console.groupEnd();
        return marcador_existente;
    }
}