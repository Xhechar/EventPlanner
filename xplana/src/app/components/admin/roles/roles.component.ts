import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../intefaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  error: string = '';
  successmsg: string = '';
  styles = {};
  managersCount: number = 0;
  managers: User[] = [];
  users: User[] = [];
  currentDateTime = new Date();

  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };

  formattedDate = this.currentDateTime.toLocaleDateString('en-US', this.options);

  currentTime = new Date();
  formattedTime = this.currentTime.toLocaleTimeString('en-US', { hour12: true });

  constructor(private userService: UsersService) {
    this.getUserByRole();
    this.retrieveAllManagers();
  }

  ngOnInit() {
    this.getUserByRole();
    this.retrieveAllManagers();
  }

  retrieveAllManagers() {
    this.userService.retrieveAllManagers().subscribe(res => {
      this.managers = res.managers as User[];
      this.managersCount = this.managers.length;
      console.log(this.managersCount)
    })
  }

  getUserByRole() {
    this.userService.getUserByRole().subscribe(res => {
      this.users = res.users as User[];
    })
  }

  updateUserRoleByAdmin(user_id: string) {
    this.userService.updateUserRoleByAdmin(user_id).subscribe(res => {
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
        this.successmsg = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.users = [];
        this.getUserByRole();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }

  revertUserRole(user_id: string) {
    this.userService.revertUserRole(user_id).subscribe(res => {
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
        this.successmsg = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.users = [];
        this.getUserByRole();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }

  updateAllUsersRoleByAdmin() {
    this.userService.updateAllUsersRoleByAdmin().subscribe(res => {
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
        this.successmsg = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.users = [];
        this.getUserByRole();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }
}
