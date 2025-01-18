class AdmissibilidadeRepositorio {

    constructor() {
        const app = firebase.initializeApp({
            apiKey: "AIzaSyCsOJLhIRBadrOo-de8GvTnUpeAU8Lif7I",
            authDomain: "pje-admissibilidade.firebaseapp.com",
            projectId: "pje-admissibilidade",
            storageBucket: "pje-admissibilidade.appspot.com",
            messagingSenderId: "790229531476",
            appId: "1:790229531476:web:2f50be63eea2e2817de6c1",
            measurementId: "G-ZBHHEJ4G0D",
        });

        this.db = firebase.firestore();

        this.chaveUsuario = this.chaveBanco();
    }

    incrementarContadorAcesso() {
        // Não há necessidade de transação no Firestore
        const acessosRef = this.db.collection("acessos").doc(this.chaveUsuario);

        acessosRef.get()
            .then((doc) => {
                if (doc.exists) {
                    // Se o documento existir, atualize-o
                    return acessosRef.update({contador: doc.data().contador + 1});
                } else {
                    // Se o documento não existir, crie-o
                    return acessosRef.set({contador: 1});
                }
            })
            .then(() => {
                console.log(`Acesso para ${this.chaveUsuario} atualizado com sucesso.`);
            })
            .catch((erro) => {
                console.error('Erro ao atualizar o acesso:', erro);
            });
    }

    contarAvaliacaoEstrelas(pontuacaoEstrelas) {
        const avaliacoesRef = this.db.collection("avaliacoes");

        const nomeUsuario = this.chaveUsuario;
        avaliacoesRef.doc(nomeUsuario).set({avaliacao: pontuacaoEstrelas})
            .then(() => {
                console.log(`Avaliação de ${nomeUsuario} atualizada com sucesso.`);
            })
            .catch((erro) => {
                console.error('Erro ao atualizar a avaliação:', erro);
            });
    }

    enviarSugestao(textoAvaliacao) {
        const collectionRef = this.db.collection("sugestoes");

        const documentRef = collectionRef.doc();

        // Adiciona os dados da sugestão ao documento
        documentRef.set({
            sugestao: textoAvaliacao,
            nomeUsuario: this.chaveUsuario,
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

        const json = jwtDecode(token);

        const nome = json.nome;
        const orgaoJulgador = json?.orgaoJulgador?.descricao;
        const tribunal = json.origem;

        return `${tribunal}-${orgaoJulgador}-${nome}`;
    }

}
