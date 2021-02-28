import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeProfesoraComponent } from './azuriranje-profesora.component';

describe('AzuriranjeProfesoraComponent', () => {
  let component: AzuriranjeProfesoraComponent;
  let fixture: ComponentFixture<AzuriranjeProfesoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeProfesoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzuriranjeProfesoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
