import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login-status',
  imports: [],
  templateUrl: './login-status.html',
  styleUrl: './login-status.css',
})
export class LoginStatus {
    authService = inject(AuthService)

    logout() {
        this.authService.logout().subscribe(reponse => {
            
        })
    }
}
