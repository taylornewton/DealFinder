import { TestBed } from '@angular/core/testing';

import { FileProcessingService } from './file-processing.service';
import * as MockData from '../mocks/mock-csv-data';
import { Property } from '../models/property';

describe('Service: FileProcessingService', () => {
  let service: FileProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileProcessingService]
    });

    service = TestBed.get(FileProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GetProperties()', () => {
    it('should return properties', () => {
      const result = service.GetProperties(MockData.ValidPropertyData, "TX");
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual(jasmine.any(Property));
    });

    it('should return properties from data with extra headers', () => {
      const result = service.GetProperties(MockData.ValidPropertyDataWithExtraHeaders, "TX");
      expect(result.length).toEqual(5);
      expect(result[0]).toEqual(jasmine.any(Property));
    });

    it('should map property from csv data', () => {
      const result = service.GetProperties(MockData.ValidPropertyDataWithExtraHeaders, "TX");
      expect(result.length).toEqual(5);
      expect(result[4]).toBeDefined();
      expect(result[4].CurrentPrice).toEqual(799000);
      expect(result[4].FullAddress.Address).toEqual('5946 Mercedes Avenue');
      expect(result[4].MlsNumber).toEqual('13398363');
      expect(result[4].SqFt).toEqual('3,255');
      expect(result[4].Status).toEqual('Active');
    });

    it('should throw exception if no address field', () => {
      expect(() => {
        service.GetProperties(MockData.InvalidPropertyDataNoAddress, "OK")
      }).toThrow("Invalid input data");
    });

    it('should throw exception if no city field', () => {
      expect(() => {
        service.GetProperties(MockData.InvalidPropertyDataNoCity, "OK")
      }).toThrow("Invalid input data");
    });

    it('should throw exception if no price field', () => {
      expect(() => {
        service.GetProperties(MockData.InvalidPropertyDataNoPrice, "OK")
      }).toThrow("Invalid input data");
    });
  });

  describe('GetValue()', () => {
    it('should return empty string if invalid index', () => {
      const result = service.GetValue(["cat", "dog"], undefined);
      expect(result).toBe("");
    });

    it('should return empty string if empty array', () => {
      const result = service.GetValue([], 3);
      expect(result).toBe('');
    });

    it('should return empty string if index not in array', () => {
      const result = service.GetValue(['mouse', 'dog'], 2);
      expect(result).toBe('');
    });

    it('should return value at index', () => {
      const result = service.GetValue(["cat", "dog"], 1);
      expect(result).toEqual('dog');
    });
  });

  describe('GetPrice()', () => {
    it('should return number', () => {
      const result = service.GetPrice("$12,234.00");
      expect(result).toEqual(jasmine.any(Number));
    });

    it('should return correct value', () => {
      const result = service.GetPrice("$1,234,567.89");
      expect(result).toEqual(1234567.89);
    });

    it('should return 0 for invalid input', () => {
      const result = service.GetPrice("Ten");
      expect(result).toEqual(0);
    });
  });

  describe('GetHeaderIndexes()', () => {
    it('should return correct indexes of names, if provided', () => {
      const headers = ["Street Address", "City", "ZIPCODE",
        "MLS #", "Current Price", "SqFt", "Status"];
      const idxObj = service.GetHeaderIndexes(headers);

      expect(idxObj.Address).toEqual(0);
      expect(idxObj.City).toEqual(1);
      expect(idxObj.Zip).toEqual(2);
      expect(idxObj.MlsNumber).toEqual(3);
      expect(idxObj.Price).toEqual(4);
      expect(idxObj.SqFt).toEqual(5);
      expect(idxObj.Status).toEqual(6);
    });

    it('should recognize alternative header names', () => {
      const headers = ["Price", "Square Feet"];
      const idxObj = service.GetHeaderIndexes(headers);

      expect(idxObj.Price).toEqual(0);
      expect(idxObj.SqFt).toEqual(1);
    });

    it('should not return indexes if not provided', () => {
      const headers = ["Yoda", "Luke Skywalker"];
      const idxObj = service.GetHeaderIndexes(headers);

      expect(idxObj.Address).toBeFalsy();
      expect(idxObj.City).toBeFalsy();
      expect(idxObj.Zip).toBeFalsy();
      expect(idxObj.MlsNumber).toBeFalsy();
      expect(idxObj.Price).toBeFalsy();
      expect(idxObj.SqFt).toBeFalsy();
      expect(idxObj.Status).toBeFalsy();
    });
  });
});
