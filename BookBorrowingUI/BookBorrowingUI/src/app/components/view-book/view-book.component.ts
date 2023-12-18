import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ServicesService } from 'src/app/Service/service.service';


@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {
  collection : any = [];
  id:any;
  route = "getBooks";
  constructor(private service : ServicesService, private router : ActivatedRoute){
  }
  ngOnInit(): void {
    console.warn(this.router)
    this.id = this.router.snapshot.params['id'];
    console.log("Id is", this.id)
    this.service.getBooks(this.route).subscribe((result: any) => {
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
