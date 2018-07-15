import { Injectable } from '@angular/core';
import { PropertyService } from './property.service';
import { Property } from '../models/property';
import { PropertyEstimate } from '../models/property-estimate';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZillowPropertyService implements PropertyService {

  constructor() { }

  GetPropertyEstimate(property: Property): Observable<PropertyEstimate> {
    return of({
      EsimatedValue: 100000,
      PropertyUrl: 'http://zillow.com/123'
    });
  }
}
