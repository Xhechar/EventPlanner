import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeventsComponent } from './mevents.component';

describe('MeventsComponent', () => {
  let component: MeventsComponent;
  let fixture: ComponentFixture<MeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
