import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { EventsService } from '../../../services/events.service';
import { Events, User } from '../../../intefaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adashboard.component.html',
  styleUrl: './adashboard.component.css'
})
export class AdashboardComponent {
  totalUsers: number = 0;
  totalEvents: number = 0;
  totalManagers: number = 0;
  totalRevenue: number = 0;
  recentUsers: User[] = [];
  recentEvents: Events[] = [];
  recentManagers: User[] = [];
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
    this.getAllUsers();
    this.retrieveAllManagers();
    this.getAllEvents();
    this.getUsersByDateCreated();
    this.getEventByDateCreated();
  }

  ngOnInit() {
    this.getAllUsers();
    this.retrieveAllManagers();
    this.getAllEvents();
    this.getUsersByDateCreated();
    this.getEventByDateCreated();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.totalUsers = (res.users as User[]).length;
    });
  }

  retrieveAllManagers() {
    this.userService.retrieveAllManagers().subscribe(res => {
      this.totalManagers = (res.managers as User[]).length;
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.totalEvents = (res.events as Events[]).length;

      let revenue = 0;
      (res.events as Events[]).forEach(event => {
        revenue += ((event.singles + event.couple + event.groups) * 0.1);
      });
      this.totalRevenue = revenue;
    });
  }

  getUsersByDateCreated() {
    this.userService.getUsersByDateCreated().subscribe(res => {
      this.recentUsers = res.users as User[];
    });
  }

  getEventByDateCreated() {
    this.eventService.getEventByDateCreated().subscribe(res => {
      this.recentEvents = res.events as Events[];
      console.log(this.recentEvents)
      this.recentManagers = res.managers as User[];
      console.log(this.recentManagers)
    });
  }

}
