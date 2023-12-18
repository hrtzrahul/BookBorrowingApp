import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  SigninUser = new FormGroup({
    userName : new FormControl('',[Validators.required]),
    Password : new FormControl('',[Validators.required])
  })
  route = "signin"
  collection : any = [];
  loginError: string = ''; 
  constructor(private login : ServicesService , private navrouter : Router){}

  ngOnInit(): void {
    
  }
  LoginUser(){ 
    this.login.loginUser(this.SigninUser.value , this.route).subscribe((result : any)=>{
      this.collection = result;
      sessionStorage.setItem('username', JSON.stringify(this.collection));
      localStorage.setItem('token' , result.token);
      console.warn("result is here",result);  
      if(this.collection.userName != null)
      {
       this.SigninUser.reset();
       setTimeout(() => {
        this.navrouter.navigate(['/']);
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 1000);
      }
    },
    (error) => {
      console.error("Login failed", error);
      this.loginError = "Invalid credentials. Please check your username and password.";
    });
  }
  get UserName() : FormControl {
    return this.SigninUser.get("userName") as FormControl;
  }
  get Password() : FormControl{
    return this.SigninUser.get("Password") as FormControl;
  }
}

