import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassoublieComponent } from './passoublie.component';

describe('PassoublieComponent', () => {
  let component: PassoublieComponent;
  let fixture: ComponentFixture<PassoublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassoublieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassoublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
