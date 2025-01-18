/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2022 Druide informatique inc. */

class info{
    constructor(donnees){
        this.donnees = [];
        for (let d of donnees){
            this.donnees.push(d); 
        }
    }

    size(){
        return this.donnees.length;
    }

    get(i){
        return this.donnees[i];
    }

}

class ClientCorrecteurSimpleJS{
    constructor(fn_correcteur_simple){
        if(fn_correcteur_simple!==undefined){
            this.correcteur_simple = fn_correcteur_simple;
        }
        this.phrases = [];
    }

    _donneIndex(leIdPhrase){
        return  this.phrases.findIndex(a => a.identificateur === leIdPhrase);
    }

    _estApres(intervalleA, intervalleB){
       return  intervalleA.borneFin < intervalleB.borneDebut;
    }

    _ajusteIntervalles(idxPhrase, diff, intervalle){
        if(idxPhrase>=0){
            // mettre a jour les intervalles des detections de la phrases
            if(this.phrases[idxPhrase].resultats.corrections !== undefined){
                for(let c = 0; c<this.phrases[idxPhrase].resultats.corrections.length; c++){
                    if(intervalle!==undefined && this._estApres(intervalle,this.phrases[idxPhrase].resultats.corrections[c].intervalle)){
                        this.phrases[idxPhrase].resultats.corrections[c].intervalle.borneDebut = this.phrases[idxPhrase].resultats.corrections[c].intervalle.borneDebut + diff;
                        this.phrases[idxPhrase].resultats.corrections[c].intervalle.borneFin = this.phrases[idxPhrase].resultats.corrections[c].intervalle.borneFin + diff;
                    }
                }
            }
            if(this.phrases[idxPhrase].resultats.detections !== undefined){
                for(let c = 0; c<this.phrases[idxPhrase].resultats.detections.length; c++){
                    if(intervalle!==undefined && this._estApres(intervalle,this.phrases[idxPhrase].resultats.detections[c].intervalle)){
                        this.phrases[idxPhrase].resultats.detections[c].intervalle.borneDebut = this.phrases[idxPhrase].resultats.detections[c].intervalle.borneDebut + diff;
                        this.phrases[idxPhrase].resultats.detections[c].intervalle.borneFin = this.phrases[idxPhrase].resultats.detections[c].intervalle.borneFin + diff;
                    }
                }
            }

            // mettre a jour les intervalles des phrases qui suivent
            for(let i=idxPhrase+1; i<this.phrases.length; i++ ){
                this.phrases[i].intervalle.borneDebut = this.phrases[i].intervalle.borneDebut + diff;
                this.phrases[i].intervalle.borneFin = this.phrases[i].intervalle.borneFin + diff;
            } 
        }
    }

    // lorsqu'on fait Applique, on enregistre dans notre modele interne et on envoie au CorrecteurSimple
    Applique(actionChaine){
        let action = JSON.parse(actionChaine);
        //mettre a jour this.phrases
        if(action.message == "initialiser"){
            // pas besoin de mettre a jour, les bonnes valuers seront donnees dans Consomme ...
        }else if(action.message == "texte"){
            // mettre a jour les intervalles

            //suppression
            let diff = 0;
            if(action.texte == "" && action.texteOriginal != ""){
                diff = -action.texteOriginal.length;
            }
            //insertion
            else if(action.texte != "" && action.texteOriginal == ""){
                diff = action.texte.length;
            }

            let index = this._donneIndex(action.idPhrase);
            if(index==-1){
                index = this._donneIndex(action.phrasesInvalidees[0]);
            }
            this._ajusteIntervalles(index,diff);

        }else if(action.message == "appliquerCorrection"){
            // mettre a jour les intervalles
            let diff = 0;
            
            if(action.intervalleAbsolu.borneDebut!=action.intervalleAbsolu.borneFin && action.texte == ""){
                //suppression ()
                diff = -action.texteOriginal.length;
            }
            else if(action.intervalleAbsolu.borneDebut == action.intervalleAbsolu.borneFin){
                 //insertion
                diff = action.texte.length;
            } else{
                //remplacement
                diff = action.texte.length - action.texteOriginal.length;
            }

            let index = this._donneIndex(action.idPhrase);
            this._ajusteIntervalles(index,diff, action.intervalle);

        }

        this.correcteur_simple(actionChaine);
    } 

    Consomme(actionChaine){
        let action = JSON.parse(actionChaine);
        //mettre a jour this.phrases
        if( action.message == "nouveauDecoupage" ){

            for(let idPhrase of action.suppressionsPhrases){
                let phraseADetruire = this._donneIndex(idPhrase);
                delete this.phrases.splice(phraseADetruire,1);
            }

            for(let phrase of action.nouvellesPhrases){
                phrase.identificateur = phrase.idPhrase;
                let idxId = this._donneIndex(phrase.idPhrase);
                if(idxId==-1){
                    //insertion
                    this.phrases.push(phrase);
                }else{
                    //mise a jour des bornes
                    let diffDebut = 0;
                    if(this.phrases[idxId].intervalle.borneDebut != phrase.intervalle.borneDebut){
                        diffDebut = this.phrases[idxId].intervalle.borneDebut - phrase.intervalle.borneDebut;
                        this.phrases[idxId].intervalle.borneDebut = phrase.intervalle.borneDebut;
                    }
                    let diffFin = 0;
                    if(this.phrases[idxId].intervalle.borneFin != phrase.intervalle.borneFin){
                        diffFin = this.phrases[idxId].intervalle.borneFin - phrase.intervalle.borneFin;
                        this.phrases[idxId].intervalle.borneFin = phrase.intervalle.borneFin;
                    }
                    this._ajusteIntervalles(idxId,diffFin);
                }
                this.phrases = this.phrases.sort((a,b)=>a.intervalle.borneDebut - b.intervalle.borneDebut);
            }

        }else if( action.message == "analyseLocale" ){
            if(this.phrases[this._donneIndex(action.idPhrase)].resultats===undefined){  
                this.phrases[this._donneIndex(action.idPhrase)].resultats={};
            }
            if(action.resultats.corrections !== undefined){
                this.phrases[this._donneIndex(action.idPhrase)].resultats.corrections =  action.resultats.corrections;
            }
            if(action.resultats.detections !== undefined){
                this.phrases[this._donneIndex(action.idPhrase)].resultats.detections = action.resultats.detections;
            }
        }
    } 

    DonneDecoupageSelonOrdre(){
        return new info(this.phrases); 
    }

    DonneResultats(idPhrase){
        if(this.phrases[this._donneIndex(idPhrase)].resultats !== undefined){
            return {corrections: new info(this.phrases[this._donneIndex(idPhrase)].resultats.corrections), detections: new info(this.phrases[this._donneIndex(idPhrase)].resultats.detections)};
        }else{
            return {corrections: new info([]), detections: new info([])};
        }
    }

    DonnePhrasesInvalidees(leIntervalleModification){
        let position = 0;
        let desIDs = [];
        //trouve debut
        for(let phrase of this.phrases){
            if(leIntervalleModification.borneDebut >= phrase.intervalle.borneDebut && leIntervalleModification.borneDebut <= phrase.intervalle.borneFin ){
                desIDs.push(phrase.identificateur);
            }
        }
        //trouve fin
        for(let phrase of this.phrases){
            if(leIntervalleModification.borneFin >= phrase.intervalle.borneDebut && leIntervalleModification.borneFin <= phrase.intervalle.borneFin ){
                if(desIDs.findIndex(i => i === phrase.identificateur)<0){
                    desIDs.push(phrase.identificateur);
                }
            }
        }
        return new info(desIDs);
    }

    uuid_to_string(leUuid){
        return leUuid;
    }
};
