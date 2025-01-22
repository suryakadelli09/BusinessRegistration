import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
 
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,RouterTestingModule]
    }).compileComponents();
 
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should contain a link with routerLink="/login"', () => {
    fixture.detectChanges();
    const loginLink = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    expect(loginLink).toBeTruthy();
  });
 
  it('should have the menulink class and be floated to the right', () => {
    fixture.detectChanges();
    const loginLink = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    const element = loginLink.nativeElement;
 
    expect(element.classList).toContain('menulink');
    expect(element.style.float).toBe('right');
  });
});