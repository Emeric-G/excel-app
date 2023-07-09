import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl: FormControl = new FormControl('', [Validators.required]);

  public email: string = "";
  public password: string = "";
  public isLogin: boolean = false;
  public loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {};

  public login() {
    this.isLogin = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('id', response.user.id);
        this.isLogin = false;
        this.router.navigate(['/grid']);
      },
      error: err => {
        this.loginError = true;
        this.isLogin = false;
      }
    });
  }

}
