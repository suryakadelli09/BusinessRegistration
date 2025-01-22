import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BusinesssearchComponent } from './businesssearch.component';
import { BusinessService } from '../service/business.service';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
 
describe('BusinesssearchComponent', () => {
  let component: BusinesssearchComponent;
  let fixture: ComponentFixture<BusinesssearchComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BusinesssearchComponent
      ],
      providers: [BusinessService],
    })
    .compileComponents();
   
    fixture = TestBed.createComponent(BusinesssearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should select a category and update the button class', () => {
    component.categories = [{ name: 'Category 1' }, { name: 'Category 2' }];
    fixture.detectChanges();
   
    const categoryButton = fixture.debugElement.queryAll(By.css('.category-button'))[0];
    const category = component.categories[0];
    spyOn(component, 'selectCategory');
 
    categoryButton.triggerEventHandler('click', null);
 
    expect(component.selectCategory).toHaveBeenCalledWith(category);
   
    expect(categoryButton.nativeElement.classList).toContain('active');
  });
 
  it('should select a subcategory', () => {
    component.subCategories = [{ name: 'Subcategory 1' }];
    fixture.detectChanges();
 
    const subcategoryButton = fixture.debugElement.queryAll(By.css('.category-button'))[0];
    const subcategory = component.subCategories[0];
 
    spyOn(component, 'selectSubcategory');
 
    subcategoryButton.triggerEventHandler('click', null);
 
    expect(component.selectSubcategory).toHaveBeenCalledWith(subcategory);
  });
 
  it('should populate the search input with selected category and subcategory', () => {
    component.selectedCategory = 'Category 1';
    component.selectedSubCategory = 'Subcategory 1';
    fixture.detectChanges();
 
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('.search-input')).nativeElement;
    expect(inputElement.value).toBe('Category 1,Subcategory 1');
  });
 
  it('should call onSubmit when the form is submitted', () => {
    spyOn(component, 'onSubmit');
 
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
 
    expect(component.onSubmit).toHaveBeenCalled();
  });
 
  it('should show the business table if there are businesses', () => {
    component.businessList = [{ name: 'Business 1', description: 'Description', visitingCard: 'card1.jpg', distancekm: 5 }];
    component.isTableVisible = true;
    fixture.detectChanges();
 
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
    const noRecordsMessage = fixture.debugElement.query(By.css('.no-records-message'));
    expect(noRecordsMessage).toBeFalsy();
  });
 
  it('should show no records message if no businesses are found', () => {
    component.businessList = [];
    component.isTableVisible = true;
    fixture.detectChanges();
 
    const table = fixture.debugElement.query(By.css('tbody'));
    expect(table).toBeFalsy();
 
    const noRecordsMessage = fixture.debugElement.query(By.css('.no-records-message'));
    expect(noRecordsMessage).toBeTruthy();
  });
 
  it('should open the popup when a business is clicked', () => {
    const business = { name: 'Business 1', description: 'Description', visitingCard: 'card1.jpg', distancekm: 5 };
 
    component.openPopup(business);
    fixture.detectChanges();
 
    const popup = fixture.debugElement.query(By.css('.popup'));
    expect(popup).toBeTruthy();
 
    expect(component.selectedBusiness).toEqual(business);
  });
  it('should close the popup when the close button is clicked', () => {
    component.selectedBusiness = true;
    component.selectedBusiness = { name: 'Business 1', description: 'Description' };
    fixture.detectChanges();
 
    const closeButton = fixture.debugElement.query(By.css('.close'));
    closeButton.triggerEventHandler('click', null);
 
    fixture.detectChanges();
 
    const popup = fixture.debugElement.query(By.css('.popup'));
    expect(popup).toBeFalsy();
 
    expect(component.selectedBusiness).toBeNull();
  });
 
  it('should return the correct image URL for business visiting card', () => {
    const business = { visitingCard: 'e.jpeg' };
    const imageUrl = component.getImageUrl(business.visitingCard);
 
    expect(imageUrl).toBe('https://reg-apis.onrender.com/uploads/e.jpeg');
  });
 
  it('should display the correct distance in the table', () => {
    component.businessList = [{ name: 'Business 1', description: 'Description', visitingCard: 'card1.jpg', distancekm: 5 }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const distanceCell = fixture.debugElement.query(By.css('td:nth-child(4)'));
      expect(distanceCell.nativeElement.textContent).toBe('5');
    });
  });
});