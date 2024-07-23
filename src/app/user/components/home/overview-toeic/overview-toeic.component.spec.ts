import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewToeicComponent } from './overview-toeic.component';

describe('OverviewToeicComponent', () => {
  let component: OverviewToeicComponent;
  let fixture: ComponentFixture<OverviewToeicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewToeicComponent]
    });
    fixture = TestBed.createComponent(OverviewToeicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
