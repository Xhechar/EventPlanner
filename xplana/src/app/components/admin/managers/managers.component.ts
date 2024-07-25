import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../intefaces/interfaces';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent {
  managers: User[] = [];
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

  constructor(private userService: UsersService, private eventService: EventsService) {
    this.retrieveAllManagers();
  }

  ngOnInit() {
    this.retrieveAllManagers();
  }

  retrieveAllManagers() {
    this.userService.retrieveAllManagers().subscribe(res => {
      this.managers = res.managers as User[];
    })
  }

  revertUserRole(user_id: string) {
    this.userService.revertUserRole(user_id).subscribe(res => {
      console.log(res);
      
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
        this.managers = [];
        this.retrieveAllManagers();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }
}
