import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RegisterbusinessComponent } from './registerbusiness.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { BusinessService } from '../service/business.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
 
describe('RegisterBusinessComponent', () => {
  let component: RegisterbusinessComponent;
  let fixture: ComponentFixture<RegisterbusinessComponent>;
  let form: FormGroup;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RegisterbusinessComponent
      ],
      providers: [
        BusinessService,
      ],
    }).compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterbusinessComponent);
    component = fixture.componentInstance;
    form = component.registerForm;
    fixture.detectChanges();
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize the form with default values', () => {
    expect(form).toBeTruthy();
    expect(form.get('Name')?.value).toBe('');
    expect(form.get('EmailId')?.value).toBe('');
    expect(form.get('Password')?.value).toBe('');
    expect(form.get('Description')?.value).toBe('');
    expect(form.get('location')?.value).toBe('');
    expect(form.get('Latitude')?.value).toBe(8.3);
    expect(form.get('Longitude')?.value).toBe(9.3);
    expect(form.get('CategoryID')?.value).toBe('');
    expect(form.get('SubCategoryID')?.value).toBe('');
  })
 
  it('should show error for required business name', () => {
    const businessName = form.get('Name');
    businessName?.setValue('');
    businessName?.markAsTouched();
    fixture.detectChanges();
 
    const errorMsg = fixture.nativeElement.querySelector('.error small');
    expect(errorMsg.textContent).toContain('Business name is required.');
  });
 
  it('should show error for short business name', () => {
    const businessName = form.get('Name');
    businessName?.setValue('AB');
    businessName?.markAsTouched();
    fixture.detectChanges();
 
    const errorMsg = fixture.nativeElement.querySelector('.error small');
    expect(errorMsg.textContent).toContain('Business name must be at least 3 characters long.');
  });
 
  it('should show error for invalid email format', () => {
    const email = form.get('EmailId');
    email?.setValue('invalid-email');
    email?.markAsTouched();
    fixture.detectChanges();
 
    const errorMsg = fixture.nativeElement.querySelector('.error small');
    expect(errorMsg.textContent).toContain('Please enter a valid email address.');
  });
 
  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('.submit-btn');
    expect(submitButton.disabled).toBe(true);
  });
 
  it('should enable submit button when form is valid', () => {
    form.get('Name')?.setValue('Valid Business');
    form.get('EmailId')?.setValue('test@domain.com');
    form.get('Password')?.setValue('123456');
    form.get('Description')?.setValue('Description of the business');
    form.get('location')?.setValue('Valid Location');
    form.get('CategoryID')?.setValue(1);
    form.get('SubCategoryID')?.setValue(1);
    fixture.detectChanges();
 
    const submitButton = fixture.nativeElement.querySelector('.submit-btn');
    expect(submitButton.disabled).toBe(false);
  });
 
  it('should update location when manual input is entered', () => {
    const locationInput = form.get('location');
    locationInput?.setValue('New York');
    locationInput?.markAsTouched();
    fixture.detectChanges();
 
    expect(form.get('location')?.value).toBe('New York');
  });
 
  it('should call category change handler when category is selected', () => {
    const categorySelect = fixture.nativeElement.querySelector('#category');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 2 } });
    spyOn(component, 'onCategoryChange');
    categorySelect.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.onCategoryChange).toHaveBeenCalledWith(event);
  });
 
  it('should call subcategory change handler when subcategory is selected', () => {
    const subcategorySelect = fixture.nativeElement.querySelector('#subCategory');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { value: 3 } });
    spyOn(component, 'onSubCategoryChange');
    subcategorySelect.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.onSubCategoryChange).toHaveBeenCalledWith(event);
  });
 
  it('should display the Google map picker', () => {
    const mapElement = fixture.debugElement.query(By.css('.map-container'));
    expect(mapElement).toBeTruthy();
  });
  
  it('should update marker with latitude and longitude on map click', () => {
    
    const mockEvent = {
      latLng: {
        lat: () => 40.7128,  
        lng: () => -74.0060, 
      },
    } as google.maps.MapMouseEvent;

    component.onMapClick(mockEvent);

    expect(component.marker).toEqual({ lat: 40.7128, lng: -74.0060 });
  });

  it('should call getLocationName with correct latitude and longitude', () => {
    spyOn(component, 'getLocationName');

    const mockEvent = {
      latLng: {
        lat: () => 40.7128,  
        lng: () => -74.0060, 
      },
    } as google.maps.MapMouseEvent;
    component.onMapClick(mockEvent);
    expect(component.getLocationName).toHaveBeenCalledWith(40.7128, -74.0060);
  });


})
 
 