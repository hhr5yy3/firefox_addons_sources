 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 var _dict = {
    "fr": "en"
};
var gestionTraduction = {
    description: "implementation en javascript de Tr et UniFmt .",
    maLangue: -1,
    maLangueString: "",
    maLangueLocale: "",
    monAntidoteEstEnAnglais: false,
    initAvecConstante: function(leDict) {
        _dict = leDict;
        _dict["_lang"] = "fr";
        _dict["_langLocale"] = -1;
    },
    estLangueSupportee: function(laLangue) {
        if (laLangue.indexOf(cstIsoLangueAnglaisEtatsUnis) >= 0 || laLangue.indexOf(cstIsoLangueAnglais) >= 0 || laLangue.indexOf(cstIsoLangueFrancais) >= 0) {
            return true;
        }
        return false;
    },
    metsLaLangue: function(uneLangue) {
        this.convertisLangue(uneLangue);
        _dict["_lang"] = this.maLangueString;
        _dict["_langLocale"] = this.maLangueLocale;
    },
    convertisLangue: function(laChaine) {
        var uneChaine = laChaine;
        if (uneChaine === undefined)
            uneChaine = "1";
        if (typeof(uneChaine) === 'number') {
            uneChaine = uneChaine.toString();
        }
        if (uneChaine.indexOf(cstIsoLangueAnglaisEtatsUnis) >= 0 || uneChaine == "4") {
            this.maLangueString = cstIsoLangueAnglais;
            this.maLangueLocale = cstIsoLangueAnglaisEtatsUnis;
            this.maLangue = cstIndexLangues.ANGLAIS_ETATSUNIS;
        } else if (uneChaine.indexOf(cstIsoLangueAnglais) >= 0 || uneChaine == "3") {
            this.maLangueString = cstIsoLangueAnglais;
            this.maLangueLocale = cstIsoLangueAnglaisCanada;
            this.maLangue = cstIndexLangues.ANGLAIS_CANADA;
        } else if (uneChaine.indexOf(cstIsoLangueFrancais) >= 0 || uneChaine == "2") {
            this.maLangueString = cstIsoLangueFrancais;
            this.maLangueLocale = cstIsoLangueFrancais + "_CA";
            this.maLangue = cstIndexLangues.FRANCAIS;
        } else if (uneChaine == "1") {
            var uneLangue = self.navigator.language;
            if (this.estLangueSupportee(uneLangue)) {
                this.metsLaLangue(uneLangue);
            } else {
                this.metsLaLangue(cstIsoLangueFrancais);
            }
        } else if (this.estLangueSupportee(laChaine)) {
            this.metsLaLangue(uneLangue);
        } else {
            this.metsLaLangue(cstIsoLangueFrancais);
        }
    },
    Tr_: function(_dib37, _dib92) {
        return this.Tr(_dib37, _dib92);
    },
    Tr: function(_dib37, _dib92) {
        var laCleAvecContexte = _dib37;
        if (_dib92 !== undefined && _dib92.length > 0)
            laCleAvecContexte = _dib92 + "\u0004" + _dib37;
        if (this.maLangue == cstIndexLangues.FRANCAIS) {
            return _dib37;
        } else if (this.maLangue > 0) {
            var indexAnglais = this.maLangue - 1;
            if (_dict[indexAnglais][_dib37] !== undefined && _dict[indexAnglais][_dib37][1] !== undefined) {
                return _dict[indexAnglais][_dib37][1];
            } else if (_dict[indexAnglais][laCleAvecContexte] !== undefined && _dict[indexAnglais][laCleAvecContexte][1] !== undefined) {
                return _dict[indexAnglais][laCleAvecContexte][1];
            }
        }
        return _dib37;
    },
    UniFmt: function(_dib37) {
        var chaineDeTravail = "";
        var chaineSeparee = _dib37.split(cstRegexTraduction);
        var args = Array.prototype.slice.call(arguments, 0);
        chaineSeparee.forEach(function(chaineIteree) {
            if (chaineIteree[0] == cstAccoladeJsonOuvrante) {
                var n = chaineIteree.match(/\d/);
                var chaineResultat = chaineDeTravail.concat(args[n]);
                chaineDeTravail = chaineResultat;
            } else {
                var chaineResultat = chaineDeTravail.concat(chaineIteree);
                chaineDeTravail = chaineResultat;
            }
        });
        return chaineDeTravail;
    },
    UniFmt_: function(_dib37, args) {
        var chaineDeTravail = "";
        var chaineSeparee = _dib37.split(cstRegexTraduction);
        chaineSeparee.forEach(function(chaineIteree) {
            if (chaineIteree[0] == cstAccoladeJsonOuvrante) {
                var n = chaineIteree.match(/\d/);
                var chaineResultat = chaineDeTravail.concat(args[n]);
                chaineDeTravail = chaineResultat;
            } else {
                var chaineResultat = chaineDeTravail.concat(chaineIteree);
                chaineDeTravail = chaineResultat;
            }
        });
        return chaineDeTravail;
    },
    DonneIndexLangue: function() {
        return this.maLangue;
    },
    ConvertisIndexLangueALangueIso: function(indexLangue) {
        return this.maLangueString;
    }
};