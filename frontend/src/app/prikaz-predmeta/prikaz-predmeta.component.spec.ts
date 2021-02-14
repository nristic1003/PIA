import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazPredmetaComponent } from './prikaz-predmeta.component';

describe('PrikazPredmetaComponent', () => {
  let component: PrikazPredmetaComponent;
  let fixture: ComponentFixture<PrikazPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazPredmetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
