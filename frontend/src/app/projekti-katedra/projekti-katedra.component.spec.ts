import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektiKatedraComponent } from './projekti-katedra.component';

describe('ProjektiKatedraComponent', () => {
  let component: ProjektiKatedraComponent;
  let fixture: ComponentFixture<ProjektiKatedraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjektiKatedraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektiKatedraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
