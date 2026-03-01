import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

    loginFormGroup = new FormGroup({
        username: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        password: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        })
    })
    authService = inject(AuthService);

    get isUsernameMarkedError() {
        return this.loginFormGroup.controls.username.hasError('required') && (this.loginFormGroup.controls.username.dirty || this.loginFormGroup.controls.username.touched);
    }
    get isPasswordMarkedError() {
        return this.loginFormGroup.controls.password.hasError('required') && (this.loginFormGroup.controls.password.dirty || this.loginFormGroup.controls.password.touched);
    }

    onLogin() {
        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched()
        } else {
            this.authService.cookieLoginRequest(
                this.loginFormGroup.controls.username.value, 
                this.loginFormGroup.controls.password.value
            ).subscribe({
                next: user => {
                    
                },
                error: err => {

                }
            })
        }
    }
}
