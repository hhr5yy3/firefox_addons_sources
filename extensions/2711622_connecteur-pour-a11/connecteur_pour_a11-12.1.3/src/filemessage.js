 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 class FileMessages {
    #fileMessages = [];
    recoisMessage(leMessage) {
        this.#fileMessages.push(leMessage);
        if (this.#fileMessages.length == 1) {
            this.executeFile();
        }
    }
    async executeFile() {
        if (this.#fileMessages.length == 0) return;
        await this.execute(this.#fileMessages[0]);
        this.#fileMessages.shift();
        this.executeFile();
    }
    async execute(msg) {};
};