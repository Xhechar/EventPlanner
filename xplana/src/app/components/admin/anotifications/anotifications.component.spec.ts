import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotificationsComponent } from './anotifications.component';

describe('AnotificationsComponent', () => {
  let component: AnotificationsComponent;
  let fixture: ComponentFixture<AnotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
