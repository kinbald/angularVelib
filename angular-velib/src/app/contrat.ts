export class Contrat {
    name: string;
    commercial_name: string;
    country_code: string;
    cities: string[];

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
