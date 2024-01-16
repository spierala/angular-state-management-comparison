import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserStore } from './state/user-store';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserStore],
})
export class LoginComponent implements OnInit {
    pageTitle = 'Log In';

    authService = inject(AuthService);
    userStore = inject(UserStore);
    router = inject(Router);

    ngOnInit(): void {}

    cancel(): void {
        this.router.navigate(['welcome']);
    }

    checkChanged(): void {
        this.userStore.toggleMaskUserName();
    }

    login(loginForm: NgForm): void {
        if (loginForm && loginForm.valid) {
            const userName = loginForm.form.value.userName;
            const password = loginForm.form.value.password;
            this.authService.login(userName, password);

            if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
                this.router.navigate(['/products']);
            }
        }
    }
}
