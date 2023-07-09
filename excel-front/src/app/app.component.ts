import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'excel-front';

  public userLogged: boolean = false;
  public userNotLog: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.userNotLog = !sessionStorage.getItem('id');
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.userLogged = true;
  }

}
