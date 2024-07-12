import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventformComponent } from './eventform.component';

describe('EventformComponent', () => {
  let component: EventformComponent;
  let fixture: ComponentFixture<EventformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
