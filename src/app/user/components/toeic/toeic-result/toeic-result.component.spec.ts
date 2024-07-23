import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicResultComponent } from './toeic-result.component';

describe('ToeicResultComponent', () => {
  let component: ToeicResultComponent;
  let fixture: ComponentFixture<ToeicResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToeicResultComponent]
    });
    fixture = TestBed.createComponent(ToeicResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
