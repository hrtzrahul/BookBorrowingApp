// books-borrowed.component.ts

import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-books-borrowed',
  templateUrl: './books-borrowed.component.html',
  styleUrls: ['./books-borrowed.component.css']
})
export class BooksBorrowedComponent implements OnInit {
  bookCollection: any[] = [];
  route = "getAllBooksBorrowedByUser"
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
    this.service.getAllBooksBorrowedByUser(this.userName).subscribe((result: any) => {
      console.warn("Books borrowed by the user", result);
      this.bookCollection = result;
    });
  }
}

