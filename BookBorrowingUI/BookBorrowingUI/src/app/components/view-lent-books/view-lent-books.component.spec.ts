import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLentBooksComponent } from './view-lent-books.component';

describe('ViewLentBooksComponent', () => {
  let component: ViewLentBooksComponent;
  let fixture: ComponentFixture<ViewLentBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLentBooksComponent]
    });
    fixture = TestBed.createComponent(ViewLentBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
