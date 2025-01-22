import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../service/login.service';
 
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let form: FormGroup;
  let usernameInput: DebugElement;
  let passwordInput: DebugElement;
  let submitButton: DebugElement;
  let errorMessage: DebugElement;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        LoginComponent,
        RouterTestingModule
      ],
      providers: [LoginService]
    }).compileComponents();
 
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    form = component.loginForm;
    usernameInput = fixture.debugElement.query(By.css('#username'));
    passwordInput = fixture.debugElement.query(By.css('#password'));
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    errorMessage = fixture.debugElement.query(By.css('.error-message'));
    fixture.detectChanges();
  });
 
  it('should create the form', () => {
    expect(component).toBeTruthy();
    expect(form).toBeDefined();
  });
 
  it('should be invalid when username and password are empty', () => {
    form.controls['username'].setValue('');
    form.controls['password'].setValue('');
    fixture.detectChanges();
    expect(form.valid).toBeFalsy();
  });
 
  it('should be valid when username and password are filled correctly', () => {
    form.controls['username'].setValue('testUser');
    form.controls['password'].setValue('password123');
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
  });
 
  it('should show username required error message', () => {
    form.controls['username'].setValue('');
    form.controls['username'].markAsTouched();
    fixture.detectChanges();
    const usernameError = fixture.debugElement.query(By.css('.form-group small'));
    expect(usernameError.nativeElement.textContent).toContain('Username is required.');
  });
 
  it('should show password required error message', () => {
    form.controls['password'].setValue('');
    form.controls['password'].markAsTouched();
    fixture.detectChanges();
    const passwordError = fixture.debugElement.query(By.css('.form-group small'));
    expect(passwordError.nativeElement.textContent).toContain('Password is required.');
  });
 
  it('should show password minlength error message', () => {
    form.controls['password'].setValue('123');
    form.controls['password'].markAsTouched();
    fixture.detectChanges();
    const passwordMinLengthError = fixture.debugElement.query(By.css('.form-group small'));
    expect(passwordMinLengthError.nativeElement.textContent).toContain('Password must be at least 6 characters.');
  });
 
  it('should disable submit button when form is invalid', () => {
    form.controls['username'].setValue('');
    form.controls['password'].setValue('');
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
 
  it('should enable submit button when form is valid', () => {
    form.controls['username'].setValue('testUser');
    form.controls['password'].setValue('password123');
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });
 
  it('should call onSubmit when the form is valid', () => {
    spyOn(component, 'onSubmit');
    form.controls['username'].setValue('testUser');
    form.controls['password'].setValue('password123');
    fixture.detectChanges();
 
    submitButton.nativeElement.click();
    fixture.detectChanges();
 
    expect(component.onSubmit).toHaveBeenCalled();
  });
 
  it('should display error message if there is a login error', () => {
    component.errorMessage = 'Invalid username or password';
    fixture.detectChanges();
   
    errorMessage = fixture.debugElement.query(By.css('.error-message'));
   
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Invalid username or password');
  });
});
 
 