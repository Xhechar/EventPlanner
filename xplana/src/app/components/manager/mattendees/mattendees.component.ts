import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { EventsService } from '../../../services/events.service';
import { Book, Events, User } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-mattendees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mattendees.component.html',
  styleUrl: './mattendees.component.css'
})
export class MattendeesComponent {
  attendees: User[] = [];
  bookings: Book[] = [];
  events: Events[] = [];

  constructor(private bookingService: BookingsService, private eventService: EventsService) {
    this.getEventUsersBookingHistory();
  }

  getEventUsersBookingHistory() {
    this.bookingService.getEventUsersBookingHistory().subscribe(res => {
      this.attendees = res.users as User[];
      console.log(this.attendees);
      this.bookings = res.bookings as Book[];
      console.log(this.bookings);
      this.events = res.events as Events[];
      console.log(this.events);
    })
  }
}
