import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  urlaccount = "https://localhost:44387/api/Account"
  urlBook = "https://localhost:44387/api/Book"
  

  Book : any = [];
  
  constructor(private http : HttpClient) { }

  RegisterUser(data:any , signup:any){
    return this.http.post(`${this.urlaccount}/${signup}`,data)
  }
  loginUser(data : any , signin:any){
    return this.http.post(`${this.urlaccount}/${signin}`,data)
  }
  borrowBook(userName: string, bookId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.urlaccount}/borrowbook/${userName}/${bookId}`, null, {
      headers,
    });
  }

  getAllBooksBorrowedByUser(userName: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.urlaccount}/getallbooksborrowedbyuser/${userName}`, {
      headers,
    });
  }

  getAllBooksAddedByUser(userName: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.urlaccount}/getallbooksaddedbyuser/${userName}`, {
      headers,
    });
  }

  getTotalTokens(username: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.urlaccount}/getTotalTokens/${username}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user is not logged in, you can handle this case accordingly.
      // For example, redirect to the login page or display an error message.
      console.error('User is not logged in');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer + localStorage.getItem('token')?.toString()`,
    });
  }
  addBook(data: any, route: any): Observable<any> {
    // Check if the user is logged in
    const headers = this.getHeaders();
    // const authToken = localStorage.getItem('token');
  
    // if (!authToken) {
    //   // If the user is not logged in, you can handle this case accordingly.
    //   // For example, redirect to the login page or display an error message.
    //   console.error('User is not logged in');
    //   return throwError('User is not logged in');
    // }
  
    // // Set the headers for the HTTP request
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + authToken
    // });
  
    // Send a POST request to the specified API endpoint
    return this.http.post(`${this.urlBook}/${route}`, data, { headers });
  }
  
  // addBook(data : any , route : any ){
  //   console.log("my auth toke",localStorage.getItem('token'));
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+ localStorage.getItem('token')?.toString()
  //   });
  //   return this.http.post(`${this.urlBook}/${route}`,data, { headers })
  // }
  getBooks(getBooks : any ){ 
    this.Book = this.http.get(`${this.urlBook}/${getBooks}`)
    return this.Book;
  }
  // getBooksByName(bookName: string): Observable<any> {
  //   return this.http.get(`${this.urlBook}/getBooksByName/${bookName}`);
  // }

  // searchBookByGenre(genre: string): Observable<any> {
  //   return this.http.get(`${this.urlBook}/searchBookByGenre/${genre}`);
  // }

  // searchBookByAuthor(author: string): Observable<any> {
  //   return this.http.get(`${this.urlBook}/searchBookByAuthor/${author}`);
  // }
  
  

}
