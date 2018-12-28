export class Contrat {
    nom: string;
    nom_commercial: string;
    code_pays: string;
    agglomerations: string[];

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
