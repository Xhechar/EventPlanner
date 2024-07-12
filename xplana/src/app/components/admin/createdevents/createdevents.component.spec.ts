import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedeventsComponent } from './createdevents.component';

describe('CreatedeventsComponent', () => {
  let component: CreatedeventsComponent;
  let fixture: ComponentFixture<CreatedeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedeventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
