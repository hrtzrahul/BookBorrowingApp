import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    Rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    Author: new FormControl('', [Validators.required]),
    Genre: new FormControl('', [Validators.required]),
    IsBookAvailable: new FormControl(true, [Validators.required]),
    Description: new FormControl('',[Validators.required, Validators.maxLength(500)]),
    LentByUserName: new FormControl('', [Validators.required])
  });

  collection: any = [];
  route = "addBooks";

  constructor(private service: ServicesService,private router: Router) { }

  Submit() {
    if (this.addBookForm.valid) {
      this.service.addBook(this.addBookForm.value, this.route).subscribe((result) => {
        console.log("Result of Books", result);
        this.collection = result;
        console.warn("Collection", this.collection);
        // Redirect to home page after adding the book
      this.router.navigate(['/']);
      });
      this.addBookForm.reset();
    } else {
      console.log('Form validation errors');
      this.addBookForm.markAllAsTouched();
    }
  }

  ngOnInit(): void { }

  get Name(): FormControl {
    return this.addBookForm.get("Name") as FormControl;
  }

  get Rating(): FormControl {
    return this.addBookForm.get("Rating") as FormControl;
  }

  get Author(): FormControl {
    return this.addBookForm.get("Author") as FormControl;
  }

  get Genre(): FormControl {
    return this.addBookForm.get("Genre") as FormControl;
  }

  get IsBookAvailable(): FormControl {
    return this.addBookForm.get("IsBookAvailable") as FormControl;
  }

  get Description(): FormControl {
    return this.addBookForm.get("Description") as FormControl;
  }

  get LentByUserName(): FormControl {
    return this.addBookForm.get("LentByUserName") as FormControl;
  }
  }

