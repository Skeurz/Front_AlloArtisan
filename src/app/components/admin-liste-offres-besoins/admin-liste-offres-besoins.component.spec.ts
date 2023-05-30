import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListeOffresBesoinsComponent } from './admin-liste-offres-besoins.component';

describe('AdminListeOffresBesoinsComponent', () => {
  let component: AdminListeOffresBesoinsComponent;
  let fixture: ComponentFixture<AdminListeOffresBesoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListeOffresBesoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListeOffresBesoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
