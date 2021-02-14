import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazZaposlenogComponent } from './prikaz-zaposlenog.component';

describe('PrikazZaposlenogComponent', () => {
  let component: PrikazZaposlenogComponent;
  let fixture: ComponentFixture<PrikazZaposlenogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazZaposlenogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
