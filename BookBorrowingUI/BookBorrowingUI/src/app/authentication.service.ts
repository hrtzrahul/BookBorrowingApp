
// // TypeScript logic for the AuthenticationService
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthenticationService {
//     private loggedIn: boolean = false;
//     private username: string = '';
//     private tokens: number = 0;

//     constructor() {
//         // Check if the user is already logged in (retrieve user session)
//         const storedUser = localStorage.getItem('currentUser');
//         if (storedUser) {
//             const user = JSON.parse(storedUser);
//             this.username = user.username;
//             this.tokens = user.tokens;
//             this.loggedIn = true;
//         }
//     }

//     login(username: string, password: string): Observable<boolean> {
//         // Simulate login logic (Replace with actual authentication logic)
//         // Check if username and password are valid (e.g., authenticate against a backend)
//         if (username === 'example' && password === 'password') {
//             this.username = username;
//             this.tokens = 10; // Set tokens or retrieve from the backend

//             // Save user details in local storage for session management
//             localStorage.setItem('currentUser', JSON.stringify({ username: this.username, tokens: this.tokens }));
//             this.loggedIn = true;
//             return of(true); // Return observable of login success
//         } else {
//             this.loggedIn = false;
//             return of(false); // Return observable of login failure
//         }
//     }

//     logout() {
//         // Remove user details from local storage
//         localStorage.removeItem('currentUser');
//         this.loggedIn = false;
//         this.username = '';
//         this.tokens = 0;
//     }

//     isLoggedIn(): boolean {
//         return this.loggedIn;
//     }

//     getUsername(): string {
//         return this.username;
//     }

//     getTokens(): number {
//         return this.tokens;
//     }
// }