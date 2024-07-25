import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { Logins } from '../../intefaces/interfaces';
import { UsersService } from '../../services/users.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: string = '';
  success: string = '';
  styles = {};
  
  constructor(private userService: UsersService, private router: Router) { }

  loginUser(logins: Logins) {
    
    this.userService.loginUser(logins).subscribe(res => {
      if (res.error) {
        this.error = res.error;
        this.styles = {
          'background-color': 'rgb(190, 17, 17)',
          'display': 'flex'
        }

        setTimeout(() => {
          this.error = '';
          this.styles = {};
        }, 3000);
      }
      else if (res.message) {
        this.success = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }

        setTimeout(() => {
          this.success = '';
          this.styles = {};

          localStorage.setItem('token', res.token as string);
          if (res.role == 'admin') {
            this.router.navigate(['/admin/a-dashboard']);
          }
          else if (res.role == 'attendee') {
            this.router.navigate(['/attendee/events']);
          }
          else if (res.role == 'manager') {
            this.router.navigate(['/manager/m-dashboard']);
          }
        }, 3000);
      }
      
    })
  }

}
