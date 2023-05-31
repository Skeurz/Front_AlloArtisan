import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Back2TopComponent } from './back2-top.component';

describe('Back2TopComponent', () => {
  let component: Back2TopComponent;
  let fixture: ComponentFixture<Back2TopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Back2TopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Back2TopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
