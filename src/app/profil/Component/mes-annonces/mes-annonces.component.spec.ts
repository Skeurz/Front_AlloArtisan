import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAnnoncesComponent } from './mes-annonces.component';

describe('MesAnnoncesComponent', () => {
  let component: MesAnnoncesComponent;
  let fixture: ComponentFixture<MesAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesAnnoncesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
