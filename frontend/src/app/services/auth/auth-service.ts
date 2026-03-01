import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, of, switchMap, tap, throwError } from 'rxjs';
import { NotificationsService } from '../notifications/notifications-service';

interface AuthUser {
    email: string;
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
}

interface LoginResponse {
    email: string,
    user_id: number,
    username: string,
    first_name: string,
    last_name: string,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor(private http:HttpClient) {}

    private router = inject(Router);

    checkMeApiUrl:string = "api/users/check/me/";
    loginApiUrl:string = "/api/token/web/";
    logoutApiUrl:string = "/api/logout/";
    registerApiUrl:string = "/api/users/register/";

    notificationsService = inject(NotificationsService);

    user = signal<AuthUser | null>(null);
    loggedIn = computed(() => this.user() !== null);


    cookieLoginRequest(username: string = "darshshah", password: string = "password123") {
        return this.http.post(this.loginApiUrl, { username, password }).pipe(
            switchMap(() => this.http.get<AuthUser>(this.checkMeApiUrl)),
            tap(user => {
                this.user.set(user);
                this.router.navigate(['/']);
                this.notificationsService.addNotification("Success", "Login succeeded");
            }),
            catchError(err => {
                // console.log("Inside Catch Error")
                // console.log(err.status);
                // console.log(err.statusText);
                // console.log(err.message);
                // console.log(err.error);
                this.user.set(null);
                if (err.status === 401) {
                    const num = this.notificationsService.addNotification("Error", `${err.error.detail ?? "Login Failed"} `);
                    setTimeout(() => {
                        this.notificationsService.removeNotification(num);
                    }, 10000);
                }
                return of(null);
            })
        );
    }

    logout() {
        return this.http.post(this.logoutApiUrl, {}).pipe(
            tap(() => {
                this.user.set(null);
                this.router.navigate(['/login']);
            })
        );
    }

    registerUserRequest(
        username: string,
        password: string,
        first_name: string,
        last_name: string,
        email: string
    ) {
        return this.http.post(this.registerApiUrl, {
            username,
            password,
            first_name,
            last_name,
            email
        }).pipe(
            tap(body => {
                this.router.navigate(['/login']);
                this.notificationsService.addNotification("Success", "Registration succeeded, you may login now");
            }),
            catchError(err => {
                if (err.status === 400) {
                    const requiredFields = Object.keys(err.error);
                    for (const item of requiredFields) {
                        this.notificationsService.addNotification("item", err.error[item])
                    }
                }
                return of(null);
            })
        )
    }

    getUserDetailsFromCookie() {
        return this.http.get<AuthUser>(this.checkMeApiUrl).pipe(
            tap(user => {
                this.user.set(user);
                this.router.navigate(['/']);
            }),
            catchError(() => {
                this.user.set(null);
                this.router.navigate(['/login']);
                return of(null);
            })
        );
    }
}
