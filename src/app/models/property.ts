import { FullAddress } from "./address";

export class Property {
    FullAddress: FullAddress;
    MlsNumber: string;
    Status: string;
    SqFt: string;
    CurrentPrice: number;
    EstimatedValue: number;
    ValueIndex: number;

    constructor(mls: string, status: string, sqFt: string, price: number, addr: FullAddress) {
        this.MlsNumber = mls;
        this.Status = status;
        this.SqFt = sqFt;
        this.CurrentPrice = price;
        this.FullAddress = addr;
    }

    setEstimatedValue(estimate: number) {
        this.EstimatedValue = estimate > 0 ? estimate : this.CurrentPrice;
        this.calculateValueIndex();
    }

    private calculateValueIndex() {
        if (this.EstimatedValue == 0) {
            this.ValueIndex = 0;
        } else {
            this.ValueIndex = 1 - (this.CurrentPrice / this.EstimatedValue);
        }
    }
}