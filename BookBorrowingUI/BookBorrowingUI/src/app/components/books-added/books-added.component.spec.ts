import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAddedComponent } from './books-added.component';

describe('BooksAddedComponent', () => {
  let component: BooksAddedComponent;
  let fixture: ComponentFixture<BooksAddedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksAddedComponent]
    });
    fixture = TestBed.createComponent(BooksAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
