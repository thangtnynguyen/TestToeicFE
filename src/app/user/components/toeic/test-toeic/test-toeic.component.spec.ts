import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestToeicComponent } from './test-toeic.component';

describe('TestToeicComponent', () => {
  let component: TestToeicComponent;
  let fixture: ComponentFixture<TestToeicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestToeicComponent]
    });
    fixture = TestBed.createComponent(TestToeicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
