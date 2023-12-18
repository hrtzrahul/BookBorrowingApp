import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Service/service.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: any;
  UserName: any;
  tokensAvailable: any;

  constructor(private router: Router, private service: ServicesService) {
    this.isLoggedIn = sessionStorage.getItem('username') != null;
    console.log("login", this.isLoggedIn);
  }

  ngOnInit(): void {
    const username = sessionStorage.getItem('username');

    if (username) {
      const userData = JSON.parse(username);
      this.UserName = userData.userName;

      interval(3000).pipe(
        switchMap(() => this.service.getTotalTokens(this.UserName))
      ).subscribe((tokens: any) => {
        this.tokensAvailable = tokens.totalTokensAvailable;
      });
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    console.log(this.isLoggedIn);
  }
}
