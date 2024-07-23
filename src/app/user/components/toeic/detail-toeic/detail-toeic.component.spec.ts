import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailToeicComponent } from './detail-toeic.component';

describe('DetailToeicComponent', () => {
  let component: DetailToeicComponent;
  let fixture: ComponentFixture<DetailToeicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailToeicComponent]
    });
    fixture = TestBed.createComponent(DetailToeicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
