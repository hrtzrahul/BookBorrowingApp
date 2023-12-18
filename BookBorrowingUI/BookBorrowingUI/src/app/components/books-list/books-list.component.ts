import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  animations: [
    trigger('flashAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out'))
    ])
  ]
})
export class BooksListComponent {
  bookCollection: any[] = [];
  filteredBookCollection: any[] = []; 
  // selectedBook: any;
  route = "getBooks";
  userName: any;
  searchText: string = ''; 
  borrowMessage: string = ''; 
  flashState: 'visible' | 'hidden' = 'hidden';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private service : ServicesService,private router: Router){
    const userdata = sessionStorage.getItem('username');
    if (userdata) {
      const userData = JSON.parse(userdata);
      this.userName = userData.userName;
    }
    //console.log(userdata);
    console.log(this.userName);
  }
  ngOnInit(): void {
    this.refreshBookCollection();

  }
  filterBooks() {
    const searchTerm = (this.searchInput.nativeElement as HTMLInputElement).value.toLowerCase();
    //const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    if (searchTerm.trim() === '') {
      this.filteredBookCollection = [...this.bookCollection];
    } else {
      this.filteredBookCollection = this.bookCollection.filter((book) =>
        book.name.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
      );
    }
    console.warn(this.filteredBookCollection)
  }
  borrowBook(bookId: number) {
    if (this.userName) {
      this.service.borrowBook(this.userName, bookId).subscribe(
        (result) => {
          console.log("Book borrowed successfully", result);
          this.borrowMessage = "Book borrowed successfully";
          this.flashMessage();

          this.refreshBookCollection();

          this.router.navigate(['/']);
        },
        (error) => {
          console.error("Failed to borrow the book", error);
          // Handle error case
          this.borrowMessage = "You have Insufficient Tokens <br> OR <br> You are trying to borrow the book you added!";
          this.flashMessage();
        }
      );
    } else {
      console.error("Username not found");
      // Handle the case when username is not found
      this.borrowMessage = "Username not found";
      this.flashMessage();
      this.router.navigate(['/Login']);
    }

  }
flashMessage() {
  this.flashState = 'visible';
  setTimeout(() => {
    this.flashState = 'hidden'; // Hide the message after a delay (adjust as needed)
  }, 4000);// Set the duration of the flash (in milliseconds)
}
refreshBookCollection() {
  this.service.getBooks(this.route).subscribe((result: any) => {
    console.warn("This is the refreshed result", result);
    this.bookCollection = result;
    this.filterBooks();
  });
}
}
