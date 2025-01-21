import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerregistrationComponent } from './customerregistration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerregistrationComponent', () => {
  let component: CustomerregistrationComponent;
  let fixture: ComponentFixture<CustomerregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerregistrationComponent, // Import the standalone component
        HttpClientTestingModule, // Provide HttpClient for the test
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   const fixture = TestBed.createComponent(CustomerregistrationComponent);
  //   const component = fixture.componentInstance;
  //   expect(component).toBeTruthy();
  // });

  it('should display the Google map picker', () => {
    const mapElement = fixture.debugElement.query(By.css('.map-container'));
    expect(mapElement).toBeTruthy();
  });
  
  it('should update marker with latitude and longitude on map click', () => {
    // Create a mock MapMouseEvent object (simulating the Google Maps click event)
    const mockEvent = {
      latLng: {
        lat: () => 40.7128,  // Mock latitude
        lng: () => -74.0060, // Mock longitude
      },
    } as google.maps.MapMouseEvent;

    // Call the onMapClick method
    component.onMapClick(mockEvent);

    // Assert that the marker is updated with the correct latitude and longitude
    expect(component.marker).toEqual({ lat: 40.7128, lng: -74.0060 });
  });

  it('should call getLocationName with correct latitude and longitude', () => {
    // Spy on the getLocationName method
    spyOn(component, 'getLocationName');

    // Create a mock MapMouseEvent object
    const mockEvent = {
      latLng: {
        lat: () => 40.7128,  // Mock latitude
        lng: () => -74.0060, // Mock longitude
      },
    } as google.maps.MapMouseEvent;

    // Call the onMapClick method
    component.onMapClick(mockEvent);

    // Assert that the getLocationName method was called with the correct parameters
    expect(component.getLocationName).toHaveBeenCalledWith(40.7128, -74.0060);
  });
});
