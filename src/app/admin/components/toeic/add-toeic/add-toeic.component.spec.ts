import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToeicComponent } from './add-toeic.component';

describe('AddToeicComponent', () => {
  let component: AddToeicComponent;
  let fixture: ComponentFixture<AddToeicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToeicComponent]
    });
    fixture = TestBed.createComponent(AddToeicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
