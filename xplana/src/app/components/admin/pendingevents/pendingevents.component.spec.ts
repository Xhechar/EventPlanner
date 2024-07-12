import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingeventsComponent } from './pendingevents.component';

describe('PendingeventsComponent', () => {
  let component: PendingeventsComponent;
  let fixture: ComponentFixture<PendingeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingeventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
