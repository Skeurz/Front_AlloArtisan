import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreConfirmationComponent } from './pre-confirmation.component';

describe('PreConfirmationComponent', () => {
  let component: PreConfirmationComponent;
  let fixture: ComponentFixture<PreConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
