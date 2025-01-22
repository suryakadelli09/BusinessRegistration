import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BusinessService } from './business.service';
import { HttpClient } from '@angular/common/http';
 
describe('BusinessService', () => {
  let service: BusinessService;
  let httpMock: HttpTestingController;
  let apiUrl: string;
  let cus_ApiUrl: string;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusinessService]
    });
 
    service = TestBed.inject(BusinessService);
    httpMock = TestBed.inject(HttpTestingController);
    // apiUrl = 'https://localhost:7000/api/Business';
    // cus_ApiUrl = 'https://localhost:7000/api/Customer';
    apiUrl = 'https://reg-apis.onrender.com/api/Business';
    cus_ApiUrl = 'https://reg-apis.onrender.com/api/Customer';
  });
 
  afterEach(() => {
    httpMock.verify(); // ensures there are no outstanding HTTP requests
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 
  describe('registerBusiness', () => {
    it('should register a business and return a response', () => {
      const formData = new FormData();
      formData.append('name', 'Test Business');
     
      service.registerBusiness(formData).subscribe(response => {
        expect(response).toEqual({ message: 'Business registered successfully' });
      });
 
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Business registered successfully' });
    });
  });
 
  describe('registerCustomer', () => {
    it('should register a customer and return a response', () => {
      const inputdata = { name: 'John Doe', email: 'johndoe@example.com' };
 
      service.registerCustomer(inputdata).subscribe(response => {
        expect(response).toEqual({ message: 'Customer registered successfully' });
      });
 
      const req = httpMock.expectOne(cus_ApiUrl);
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Customer registered successfully' });
    });
  });
 
  describe('searchBusinesses', () => {
    it('should return a list of businesses for the given category and subcategory', () => {
      const category = 'Restaurant';
      const subcategory = 'Chinese';
 
      const mockResponse = [
        { id: 1, name: 'Business 1', category: 'Restaurant', subcategory: 'Chinese' },
        { id: 2, name: 'Business 2', category: 'Restaurant', subcategory: 'Chinese' }
      ];
 
      service.searchBusinesses(category, subcategory).subscribe((businesses) => {
        expect(businesses.length).toBe(2);
        expect(businesses).toEqual(mockResponse);
      });
 
      const req = httpMock.expectOne(`${apiUrl}/search?category=${category}&subcategory=${subcategory}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
 
  describe('getCategories', () => {
    it('should return a list of categories', () => {
      const mockCategories = ['Food', 'Services', 'Technology'];
 
      service.getCategories().subscribe((categories) => {
        expect(categories.length).toBe(3);
        expect(categories).toEqual(mockCategories);
      });
 
      const req = httpMock.expectOne(`${apiUrl}/GetCategories`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCategories);
    });
  });
 
  describe('getSubCategories', () => {
    it('should return a list of subcategories for a given category ID', () => {
      const categoryId = 1;
      const mockSubcategories = ['Chinese', 'Indian', 'Italian'];
 
      service.getSubCategories(categoryId).subscribe((subcategories) => {
        expect(subcategories.length).toBe(3);
        expect(subcategories).toEqual(mockSubcategories);
      });
 
      const req = httpMock.expectOne(`${apiUrl}/GetSubCategories/${categoryId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSubcategories);
    });
  });
});
