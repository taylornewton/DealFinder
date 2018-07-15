export class FullAddress {
    Address: string;
    City: string;
    State: string;
    Zip: string;

    constructor(address: string, city: string, state: string, zip: string) {
        this.Address = address;
        this.City = city;
        this.State = state;
        this.Zip = zip;
    }

    toString() {
        return this.Address + " " + this.City + ", " + 
            this.State + " " + this.Zip; 
    }

    getUrlEncoded() {
        
    }
}