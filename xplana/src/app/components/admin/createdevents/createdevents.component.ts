import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Events, User } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-createdevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './createdevents.component.html',
  styleUrl: './createdevents.component.css'
})
export class CreatedeventsComponent {
  attendees: number = 0;
  earnings: number = 0;
  events: Events[] = [];
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

  constructor(private eventService: EventsService) {
    this.getAllEvents();
  }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res.events as Events[];
      this.managers = res.managers as User[];

      let earning = 0;
      let tally = 0;
      for (let event of this.events) {
        tally += event.booked_tickets;
        earning += ((event.singles + event.couple + event.groups) * 0.1);
      }
      this.earnings = earning;
      this.attendees = tally;
    })
  }

}
