import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../intefaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  deletedUsers: User[] = [];
  error: string = '';
  successmsg: string = '';
  styles = {};
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

  }

  ngOnInit() {
    this.getAllDeletedUsers();
  }

  getAllDeletedUsers() {
    this.userService.getAllDeletedUsers().subscribe(res => {
      this.deletedUsers = res.users as User[];
    })
  }

  retrieveDeletedUserByAdmin(user_id: string) {
    this.userService.retrieveDeletedUserByAdmin(user_id).subscribe(res => {
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
        this.deletedUsers = [];
        this.getAllDeletedUsers();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }

  retrieveAllDeletedUsersByAdmin() {
    this.userService.retrieveAllDeletedUsersByAdmin().subscribe(res => {
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
        this.deletedUsers = [];
        this.getAllDeletedUsers();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }
    })
  }

}
