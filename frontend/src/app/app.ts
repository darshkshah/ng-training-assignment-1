import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/auth/login-service';
import { AuthService } from './services/auth/auth-service';
import { Notifications } from './components/notifications/notifications';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Notifications],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    constructor() {}

    
    authService = inject(AuthService)

    protected readonly title = signal('to-do-list');

    loginFunction() {
        this.authService.cookieLoginRequest().subscribe((data) => {
            console.log(data);
        });
    }
}
