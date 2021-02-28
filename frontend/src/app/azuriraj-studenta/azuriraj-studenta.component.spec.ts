import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajStudentaComponent } from './azuriraj-studenta.component';

describe('AzurirajStudentaComponent', () => {
  let component: AzurirajStudentaComponent;
  let fixture: ComponentFixture<AzurirajStudentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajStudentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajStudentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
