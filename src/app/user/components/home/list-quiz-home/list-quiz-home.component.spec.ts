import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizHomeComponent } from './list-quiz-home.component';

describe('ListQuizHomeComponent', () => {
  let component: ListQuizHomeComponent;
  let fixture: ComponentFixture<ListQuizHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListQuizHomeComponent]
    });
    fixture = TestBed.createComponent(ListQuizHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
