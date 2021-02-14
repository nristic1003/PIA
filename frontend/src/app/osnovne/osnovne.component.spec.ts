import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovneComponent } from './osnovne.component';

describe('OsnovneComponent', () => {
  let component: OsnovneComponent;
  let fixture: ComponentFixture<OsnovneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsnovneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnovneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
