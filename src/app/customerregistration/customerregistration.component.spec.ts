import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerregistrationComponent } from './customerregistration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Import NO_ERRORS_SCHEMA

describe('CustomerregistrationComponent', () => {
  let component: CustomerregistrationComponent;
  let fixture: ComponentFixture<CustomerregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerregistrationComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "register-customer"', () => {
    expect(component.title).toEqual('Register Customer');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Register Customer');
  });

  it('should initialize the form group correctly', () => {
    expect(component.cusRegisterForm).toBeDefined();
    expect(component.cusRegisterForm.controls['Cus_EmailId']).toBeDefined();
    expect(component.cusRegisterForm.controls['Cus_Password']).toBeDefined();
    expect(component.cusRegisterForm.controls['Cus_Location']).toBeDefined();
    expect(component.cusRegisterForm.controls['Latitude']).toBeDefined();
    expect(component.cusRegisterForm.controls['Longitude']).toBeDefined();
  });

  it('should validate email field as required', () => {
    const emailControl = component.cusRegisterForm.controls['Cus_EmailId'];
    emailControl.setValue('');
    expect(emailControl.invalid).toBe(true);
    expect(emailControl.hasError('required')).toBe(true);
  });

  it('should validate password field as required', () => {
    const passwordControl = component.cusRegisterForm.controls['Cus_Password'];
    passwordControl.setValue('');
    expect(passwordControl.invalid).toBe(true);
    expect(passwordControl.hasError('required')).toBe(true);
  });

  it('should validate location field as required', () => {
    const locationControl = component.cusRegisterForm.controls['Cus_Location'];
    locationControl.setValue('');
    expect(locationControl.invalid).toBe(true);
    expect(locationControl.hasError('required')).toBe(true);
  });

  it('should disable the submit button if form is invalid', () => {
    component.cusRegisterForm.controls['Cus_EmailId'].setValue('');
    component.cusRegisterForm.controls['Cus_Password'].setValue('');
    component.cusRegisterForm.controls['Cus_Location'].setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable the submit button if form is valid', () => {
    component.cusRegisterForm.controls['Cus_EmailId'].setValue('test@example.com');
    component.cusRegisterForm.controls['Cus_Password'].setValue('password');
    component.cusRegisterForm.controls['Cus_Location'].setValue('New York');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('should display email error messages when invalid', () => {
    const emailControl = component.cusRegisterForm.controls['Cus_EmailId'];
    emailControl.setValue('');
    emailControl.markAsTouched();
    fixture.detectChanges();
    const emailErrorMessage = fixture.debugElement.query(By.css('.error small')).nativeElement;
    expect(emailErrorMessage.textContent).toContain('Email is required.');
    emailControl.setValue('invalid-email');
    fixture.detectChanges();
    const emailInvalidMessage = fixture.debugElement.query(By.css('.error small')).nativeElement;
    expect(emailInvalidMessage.textContent).toContain('Please enter a valid email address.');
  });

  it('should display password error messages when invalid', () => {
    const passwordControl = component.cusRegisterForm.controls['Cus_Password'];
    passwordControl.setValue('');
    passwordControl.markAsTouched();

    fixture.detectChanges();

    const passwordErrorMessage = fixture.debugElement.query(By.css('.error small')).nativeElement;
    expect(passwordErrorMessage.textContent).toContain('Password is required.');

    passwordControl.setValue('12');
    fixture.detectChanges();

    const passwordLengthMessage = fixture.debugElement.query(By.css('.error small')).nativeElement;
    expect(passwordLengthMessage.textContent).toContain('Password must be at least 3 characters long.');
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
});
