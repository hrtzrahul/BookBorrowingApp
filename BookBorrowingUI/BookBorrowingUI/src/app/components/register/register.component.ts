import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)])
  });

  constructor(private user: ServicesService,private loginrouter : Router) {}
  registerError: string = ''; 
  collection : any = []

  route = "signup"
  ngOnInit(): void {
    
  }
  CollectUser() {
    if (this.registerForm.valid) {
      console.log("success", this.registerForm);
      this.user.RegisterUser(this.registerForm.value, this.route).subscribe(
        (result) => {
          console.warn("result is here", result);
          this.collection = result;
          if (this.collection != null) {
            this.registerForm.reset();
            this.loginrouter.navigate(['/']);
          }
        },
        (error) => {
          console.error("Registration failed", error);
          this.registerError = "Registration failed. Please check your input.";
        }
      );
    } else {
      console.log("fail");
      this.registerForm?.markAsTouched();
      console.log("add user val", this.registerForm);
      this.registerError = "Please fill out the required fields correctly.";
    }
  }

  get Name() :FormControl {
    return this.registerForm.get("Name") as FormControl;
  }
  
  get UserName() : FormControl {
    return this.registerForm.get("userName") as FormControl;
  }
  
 
  
  get Password() : FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  

}
