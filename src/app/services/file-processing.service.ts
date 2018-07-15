import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { FullAddress } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class FileProcessingService {

  readonly delimeter = "\",\"";
  constructor() { }

  GetProperties(data: string, state: string): Property[] {
    const records = data.split(/\r\n|\n/);
    const propertyArr: Property[] = [];
    
    const headers = records[0].split(this.delimeter);
    const indexes = this.GetHeaderIndexes(headers);

    if (!indexes.Address || !indexes.City || !indexes.Price) {
      throw "Invalid input data";
    }

    records.slice(1).forEach((rec) => {
      const data = rec.split(this.delimeter);

      if (data.length != headers.length)
        return;

      // create address
      const addr = this.GetValue(data, indexes.Address);
      const city = this.GetValue(data, indexes.City);
      const zip = this.GetValue(data, indexes.Zip);

      const fullAddress = new FullAddress(addr, city, state, zip);

      // create property
      const mls = this.GetValue(data, indexes.MlsNumber);
      const price = this.GetPrice(this.GetValue(data, indexes.Price));
      const status = this.GetValue(data, indexes.Status);
      const sqft = this.GetValue(data, indexes.SqFt);

      const property = new Property(mls, status, sqft, price, fullAddress);

      propertyArr.push(property);
    });

    return propertyArr;
  }

  GetPrice(price: string): number {
    const num = parseFloat(price.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num; 
  }

  GetValue(data: string[], idx: number): string {
    if (!idx)
      return "";
    
    const str = data[idx];
    return str.replace('"', '').trim();
  }

  GetHeaderIndexes(headers: string[]): any {
    let headerIndexes: any = {};

    headers.forEach((header, idx) => {
      const colName = header.toLowerCase();

      if (colName.indexOf("mls") > -1) {
        headerIndexes.MlsNumber = idx;
      }
      else if (colName.indexOf("current price") > -1) {
        headerIndexes.Price = idx;
      }
      else if (colName.indexOf("price") > -1) {
        headerIndexes.Price = idx;
      }
      else if (colName.indexOf("sqft") > -1) {
        headerIndexes.SqFt = idx;
      }
      else if (colName.indexOf("square feet") > -1) {
        headerIndexes.SqFt = idx;
      }
      else if (colName.indexOf("status") > -1) {
        headerIndexes.Status = idx;
      }
      else if (colName.indexOf("address") > -1) {
        headerIndexes.Address = idx;
      }
      else if (colName.indexOf("city") > -1) {
        headerIndexes.City = idx;
      }
      else if (colName.indexOf("zip") > -1) {
        headerIndexes.Zip = idx;
      }
    });

    return headerIndexes;
  }
}
