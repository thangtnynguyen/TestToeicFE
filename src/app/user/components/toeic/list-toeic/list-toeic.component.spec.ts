import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToeicComponent } from './list-toeic.component';

describe('ListToeicComponent', () => {
  let component: ListToeicComponent;
  let fixture: ComponentFixture<ListToeicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListToeicComponent]
    });
    fixture = TestBed.createComponent(ListToeicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
