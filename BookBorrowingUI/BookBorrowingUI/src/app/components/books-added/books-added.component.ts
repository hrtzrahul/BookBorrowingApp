import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-books-added',
  templateUrl: './books-added.component.html',
  styleUrls: ['./books-added.component.css']
})
export class BooksAddedComponent implements OnInit {
  bookCollection: any[] = [];
  route = "getAllBooksAddedByUser"
  userName: any;
  constructor(private service: ServicesService) {
    const userdata = sessionStorage.getItem('username');
    if (userdata) {
      const userData = JSON.parse(userdata);
      this.userName = userData.userName;
    }
    console.log(userdata);
    console.log(this.userName);
  }

  ngOnInit(): void {
    this.service.getAllBooksAddedByUser(this.userName).subscribe((result: any) => {
      console.warn("Books added by the user", result);
      this.bookCollection = result;
    });
  }
    
   
  }
 
 
 

  

