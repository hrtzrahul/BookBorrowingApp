import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AddBookComponent } from './components/add-book/add-book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { BooksBorrowedComponent } from './components/books-borrowed/books-borrowed.component';
import { BooksAddedComponent } from './components/books-added/books-added.component';
import { ViewBorrowedBooksComponent } from './components/view-borrowed-books/view-borrowed-books.component';
import { ViewLentBooksComponent } from './components/view-lent-books/view-lent-books.component';
const routes: Routes = [
  {
    component: HomeComponent,
    path: "Home"
  },
  {
    component: LoginComponent,
    path: "Login"
  },
  {
    component: RegisterComponent,
    path: "RegisterUser"
  },
  {
    component: AddBookComponent,
    path: "AddBooks"
  },
  {
    component: BooksListComponent,
    path: ""
  },
  {
    component:BooksBorrowedComponent,
    path:"BooksBorrowed"
  },
  {
    component:BooksAddedComponent,
    path: "BooksLent"
  },
  {
    component: ViewBookComponent,
    path: "BookDetails/:id"
  },
  {
    component: ViewBorrowedBooksComponent,
    path: "ViewBorrowedBooks/:id"
  },
  {
    component: ViewLentBooksComponent,
    path: "ViewLentBooks/:id"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
