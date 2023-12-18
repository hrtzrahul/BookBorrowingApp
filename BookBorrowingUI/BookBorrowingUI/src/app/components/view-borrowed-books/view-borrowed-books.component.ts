import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-view-borrowed-books',
  templateUrl: './view-borrowed-books.component.html',
  styleUrls: ['./view-borrowed-books.component.css']
})
export class ViewBorrowedBooksComponent {
  collection : any = [];
  id:any;
  userName: any;
  route = "getAllBooksBorrowedByUser";
  constructor(private service : ServicesService, private router : ActivatedRoute){
    const userdata = sessionStorage.getItem('username');
    if (userdata) {
      const userData = JSON.parse(userdata);
      this.userName = userData.userName;
    }
  }
  ngOnInit(): void {
    console.warn(this.router)
    this.id = this.router.snapshot.params['id'];
    console.log("Id is", this.id)
    this.service.getAllBooksBorrowedByUser(this.userName).subscribe((result: any) => {
      console.warn("get product call", result)
      result.forEach((object: any) => {
        console.warn("Object Id", object.id)
        if (this.id == object.id) {
          console.log(object.id);
          this.collection.push(object);
        }
        else{
          console.log("Nooooooooooooooooo")
        }
      });
      console.log("revieced collection data", this.collection);
    })

  }
}
