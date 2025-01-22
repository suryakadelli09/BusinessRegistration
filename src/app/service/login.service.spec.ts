import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
 
describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });
 
  afterEach(() => {
    httpMock.verify();
  });
 
  it('should send a POST request to the correct API URL with user credentials', () => {
    const mockUserCred = { username: 'test', password: 'password' };
    const mockResponse = { token: 'sampleToken' };
 
    service.onSubmit(mockUserCred).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
 
    const req = httpMock.expectOne('https://reg-apis.onrender.com/api/Auth/login');
    //const req = httpMock.expectOne('https://localhost:7000/api/Auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUserCred);
    req.flush(mockResponse);
  });
 
  it('should return true if token exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someToken');
 
    const result = service.IsLogged();
    expect(result).toBe(true);
  });
 
  it('should return false if token does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
 
    const result = service.IsLogged();
    expect(result).toBe(false);
  });
 
  it('should return the token from localStorage if present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someToken');
 
    const result = service.GetToken();
    expect(result).toBe('someToken');
  });
 
  it('should return an empty string if no token is present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
 
    const result = service.GetToken();
    expect(result).toBe('');
  });
 
  it('should handle error when POST request fails', () => {
    const mockUserCred = { username: 'test', password: 'password' };
    const mockError = { status: 500, statusText: 'Internal Server Error' };
 
    service.onSubmit(mockUserCred).subscribe(
      () => fail('Expected an error, but got success response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );
 
   // const req = httpMock.expectOne('https://localhost:7000/api/Auth/login');
    const req = httpMock.expectOne('https://reg-apis.onrender.com/api/Auth/login');
    req.flush(null, mockError);
  });
});
 
