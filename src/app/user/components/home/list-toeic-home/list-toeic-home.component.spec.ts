import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToeicHomeComponent } from './list-toeic-home.component';

describe('ListToeicHomeComponent', () => {
  let component: ListToeicHomeComponent;
  let fixture: ComponentFixture<ListToeicHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListToeicHomeComponent]
    });
    fixture = TestBed.createComponent(ListToeicHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
