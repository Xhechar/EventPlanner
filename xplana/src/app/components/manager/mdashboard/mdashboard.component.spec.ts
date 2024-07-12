import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdashboardComponent } from './mdashboard.component';

describe('MdashboardComponent', () => {
  let component: MdashboardComponent;
  let fixture: ComponentFixture<MdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
