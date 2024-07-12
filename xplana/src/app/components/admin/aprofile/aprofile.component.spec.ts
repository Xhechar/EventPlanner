import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprofileComponent } from './aprofile.component';

describe('AprofileComponent', () => {
  let component: AprofileComponent;
  let fixture: ComponentFixture<AprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
