import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/auth/login-service';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { TaskTable } from './components/task-table/task-table';

@Component({
    selector: 'app-root',
    imports: [Header, Footer, TaskTable],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    constructor(private loginService:LoginService) {}

    protected readonly title = signal('to-do-list');

    loginFunction() {
        console.log("Yes login please");
        this.loginService.cookieLogin().subscribe((data) => {
            console.log(data);
        });
    }
}
