class AdmissibilidadeRepositorioRealtime {

    constructor(db) {
        if (!db) {
            const app = firebase.initializeApp({
                apiKey: "AIzaSyCsOJLhIRBadrOo-de8GvTnUpeAU8Lif7I",
                authDomain: "pje-admissibilidade.firebaseapp.com",
                projectId: "pje-admissibilidade",
                storageBucket: "pje-admissibilidade.appspot.com",
                messagingSenderId: "790229531476",
                appId: "1:790229531476:web:2f50be63eea2e2817de6c1",
                measurementId: "G-ZBHHEJ4G0D",
                databaseURL: "https://pje-admissibilidade-default-rtdb.firebaseio.com/"
            });

            // Obtém a instância do Firebase Realtime Database
            this.db = app.database();
        } else {
            this.db = db;
        }

        this.chaveUsuario = this.chaveBanco();
    }

    incrementarContadorAcesso() {
        const documentRef = this.db.ref("acessos");

        const nomeUsuario = this.chaveUsuario;
        documentRef.transaction((dadosAntigos) => {
            if (dadosAntigos === null) {
                // Se não houver dados antigos, crie um objeto com o nomeUsuario e contador
                return {[nomeUsuario]: {contador: 1}};
            } else if (dadosAntigos[nomeUsuario]) {
                // Se o nomeUsuario já existe, incremente o contador
                dadosAntigos[nomeUsuario].contador += 1;
                return dadosAntigos;
            } else {
                // Se o nomeUsuario não existe, adicione um novo objeto com contador 1
                dadosAntigos[nomeUsuario] = {contador: 1};
                return dadosAntigos;
            }
        }).then((resultado) => {
            if (resultado.committed) {
                console.log(`Acesso para ${nomeUsuario} atualizado com sucesso.`);
            } else {
                console.log(`Erro ao atualizar o acesso para ${nomeUsuario}.`);
            }
        });
    }

    contarAvaliacaoEstrelas(pontuacaoEstrelas) {
        const documentRef = this.db.ref("avaliacoes");

        console.log(documentRef);

        const nomeUsuario = this.chaveUsuario;
        documentRef.transaction((dadosAntigos) => {
                console.log({[nomeUsuario]: {avaliacao: pontuacaoEstrelas}});
                return {[nomeUsuario]: {avaliacao: pontuacaoEstrelas}};
        }).then((resultado) => {
            console.log(resultado);
            if (resultado.committed) {
                console.log(`Avaliacao de ${nomeUsuario} atualizado com sucesso.`);
            } else {
                console.log(`Erro ao atualizar a avaliacao de ${nomeUsuario}.`);
            }
        }).catch((erro) => {
            console.error('Erro na transação:', erro);
        });
    }

    getToken() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "access_token") {
                return value;
            }
        }
        return null;
    };

    chaveBanco() {
        const token = this.getToken();
        const payload = token.split(".")[1];
        const jsonTokenString = atob(payload);
        const json = JSON.parse(jsonTokenString);
        const nome = json.nome;
        const orgaoJulgador = json.orgaoJulgador.descricao;
        const tribunal = json.origem;

        return `${tribunal}-${orgaoJulgador}-${nome}`;
    }

    enviarSugestao(textoAvaliacao) {
        const documentRef = this.db.ref("sugestoes");

        const nomeUsuario = this.chaveUsuario;
        const novoNodoRefSugestao = documentRef.push();
        novoNodoRefSugestao.set({ sugestao: nomeUsuario + '-' + textoAvaliacao });
    }
}
