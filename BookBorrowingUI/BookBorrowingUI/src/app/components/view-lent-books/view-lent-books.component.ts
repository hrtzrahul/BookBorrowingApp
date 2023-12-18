import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-view-lent-books',
  templateUrl: './view-lent-books.component.html',
  styleUrls: ['./view-lent-books.component.css']
})
export class ViewLentBooksComponent {
  collection : any = [];
  id:any;
  userName: any;
  route = "getAllBooksAddedByUser";
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
    this.service.getAllBooksAddedByUser(this.userName).subscribe((result: any) => {
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
