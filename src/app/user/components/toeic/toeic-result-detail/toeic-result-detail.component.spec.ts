import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeicResultDetailComponent } from './toeic-result-detail.component';

describe('ToeicResultDetailComponent', () => {
  let component: ToeicResultDetailComponent;
  let fixture: ComponentFixture<ToeicResultDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToeicResultDetailComponent]
    });
    fixture = TestBed.createComponent(ToeicResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
