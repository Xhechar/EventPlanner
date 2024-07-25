import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-regusers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './regusers.component.html',
  styleUrl: './regusers.component.css'
})
export class RegusersComponent {
  attendeesCount!: number;
  users: User[] = [];
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
    this.getAllUsers();
  }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res.users as User[];

      let count = 0;
      for (let user of this.users) {
        if (user.role == 'attendee') {
          count++;
        }
      }
      this.attendeesCount = count;
    })
  }

  softDeleteUserByAdmin(user_id: string) {
    this.userService.softDeleteUserByAdmin(user_id).subscribe(res => {
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
        this.getAllUsers();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }
}
