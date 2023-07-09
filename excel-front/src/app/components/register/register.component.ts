import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl: FormControl = new FormControl('', [Validators.required]);;

  public email: string = "";
  public password: string = "";
  public isRegister: boolean = false;
  public registerError: boolean = false;

  constructor(public authService: AuthService, private router: Router) {};

  public ngOnInit() {

  }

  public registration() {
    this.isRegister = true;
    if(!this.emailFormControl.hasError('required') && !this.emailFormControl.hasError('email') && !this.passwordFormControl.hasError('required')){
      this.authService.registration(this.email, this.password).subscribe({
        next: response => {
          this.isRegister = false;
          this.router.navigate(['/login']);
        },
        error: err => {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.isRegister = false;
      this.registerError = true;
    }
  }

}
