import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdashboardSingleEventComponent } from './mdashboard-single-event.component';

describe('MdashboardSingleEventComponent', () => {
  let component: MdashboardSingleEventComponent;
  let fixture: ComponentFixture<MdashboardSingleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdashboardSingleEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdashboardSingleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
