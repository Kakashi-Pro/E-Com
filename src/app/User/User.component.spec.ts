import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResigterComponent } from './User.component';

describe('ResigterComponent', () => {
  let component: ResigterComponent;
  let fixture: ComponentFixture<ResigterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResigterComponent]
    });
    fixture = TestBed.createComponent(ResigterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
