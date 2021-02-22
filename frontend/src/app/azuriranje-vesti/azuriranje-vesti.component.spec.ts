import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeVestiComponent } from './azuriranje-vesti.component';

describe('AzuriranjeVestiComponent', () => {
  let component: AzuriranjeVestiComponent;
  let fixture: ComponentFixture<AzuriranjeVestiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeVestiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzuriranjeVestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
