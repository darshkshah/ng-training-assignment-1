import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http:HttpClient) {}

    apiUrl:string = "/api/token/web/";

    cookieLogin() {
        const body = {
            "username": "darshshah",
            "password": "password123"
        };
        return this.http.post(this.apiUrl, body);
    }
}
