import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Events, User } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-pendingevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pendingevents.component.html',
  styleUrl: './pendingevents.component.css'
})
export class PendingeventsComponent {
  events: Events[] = [];
  managers: User[] = [];
  totalEvents: number = 0;
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

  constructor(private eventService: EventsService) { }
  
  ngOnInit() {
    this.getAllEvents();
    this.getAllPendingEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.totalEvents = (res.events as Events[]).length;
    });
  }

  getAllPendingEvents() {
    this.eventService.getAllPendingEvents().subscribe(res => {
      this.events = res.events as Events[];
      this.managers = res.managers as User[];
    })
  }

}
