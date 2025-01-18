 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 class ObjetDetecteurWordpress extends ObjetDetecteur {
    positionAt(info) {
        this.zonePositionnementDW = document.querySelector("iframe[name='editor-canvas']");
        super.positionAt(info);
    }
    async placerContenantBoutonDansBonElement() {
        if (this.dejaPlaceay) return;
        await super.placerContenantBoutonDansBonElement();
        this.dejaPlaceay = true;
    }
}