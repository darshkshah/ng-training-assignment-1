import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
    authService = inject(AuthService)

    registerFormGroup = new FormGroup({
        username: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        password: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        first_name: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        last_name: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        email: new FormControl<string>("", {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    get isUserNameMarkedError() {
        return this.registerFormGroup.controls.username.hasError('required') && (this.registerFormGroup.controls.username.dirty || this.registerFormGroup.controls.username.touched);
    }

    get isPasswordMarkedError() {
        return this.registerFormGroup.controls.password.hasError('required') && (this.registerFormGroup.controls.password.dirty || this.registerFormGroup.controls.password.touched);
    }

    get isFirstNameMarkedError() {
        return this.registerFormGroup.controls.first_name.hasError('required') && (this.registerFormGroup.controls.first_name.dirty || this.registerFormGroup.controls.first_name.touched);
    }

    get isLastNameMarkedError() {
        return this.registerFormGroup.controls.last_name.hasError('required') && (this.registerFormGroup.controls.last_name.dirty || this.registerFormGroup.controls.last_name.touched)
    }

    get isEmailMarkedError() {
        return this.registerFormGroup.controls.email.hasError('required') && (this.registerFormGroup.controls.email.dirty || this.registerFormGroup.controls.email.touched)
    }

    onRegister() {
        if (this.registerFormGroup.invalid) {
            this.registerFormGroup.markAllAsTouched();
        } else {
            const controlsTemp = this.registerFormGroup.controls;
            this.authService.registerUserRequest(
                controlsTemp.username.value,
                controlsTemp.password.value,
                controlsTemp.first_name.value,
                controlsTemp.last_name.value,
                controlsTemp.email.value
            ).subscribe({
                next: body => {
                    // console.log("Handle Success");
                },
                error: err => {
                    // console.log("Handle Failure");
                }

            })
        }
    }


}
