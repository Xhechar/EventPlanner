import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MprofileComponent } from './mprofile.component';

describe('MprofileComponent', () => {
  let component: MprofileComponent;
  let fixture: ComponentFixture<MprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
