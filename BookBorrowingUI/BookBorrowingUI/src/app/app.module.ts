import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicesService } from './Service/service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BooksAddedComponent } from './components/books-added/books-added.component';
import { BooksBorrowedComponent } from './components/books-borrowed/books-borrowed.component';
import { CommonModule } from '@angular/common';
import { ViewBookComponent } from './components/view-book/view-book.component';

import { ViewBorrowedBooksComponent } from './components/view-borrowed-books/view-borrowed-books.component';
import { ViewLentBooksComponent } from './components/view-lent-books/view-lent-books.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddBookComponent,
    BooksListComponent,
    BooksAddedComponent,
    BooksBorrowedComponent,
    ViewBookComponent,
   
    ViewBorrowedBooksComponent,
    ViewLentBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    CommonModule,
  ],
  providers: [
    ServicesService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

