import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattendeesComponent } from './mattendees.component';

describe('MattendeesComponent', () => {
  let component: MattendeesComponent;
  let fixture: ComponentFixture<MattendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MattendeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MattendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
