import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAnnoncesEditComponent } from './mes-annonces-edit.component';

describe('MesAnnoncesEditComponent', () => {
  let component: MesAnnoncesEditComponent;
  let fixture: ComponentFixture<MesAnnoncesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesAnnoncesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesAnnoncesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
