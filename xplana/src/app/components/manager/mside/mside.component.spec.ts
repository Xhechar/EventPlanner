import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsideComponent } from './mside.component';

describe('MsideComponent', () => {
  let component: MsideComponent;
  let fixture: ComponentFixture<MsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
