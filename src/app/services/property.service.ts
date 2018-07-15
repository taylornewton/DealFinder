import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { PropertyEstimate } from '../models/property-estimate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class PropertyService {
  abstract GetPropertyEstimate(property: Property): Observable<PropertyEstimate>;
}
