import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MneweventsComponent } from './mnewevents.component';

describe('MneweventsComponent', () => {
  let component: MneweventsComponent;
  let fixture: ComponentFixture<MneweventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MneweventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MneweventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
