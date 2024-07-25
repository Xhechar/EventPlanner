import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { UsersService } from '../../services/users.service';
import { BookingsService } from '../../services/bookings.service';
import { Book, Events } from '../../intefaces/interfaces';

@Component({
  selector: 'app-eventform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './eventform.component.html',
  styleUrl: './eventform.component.css'
})
export class EventformComponent {
  myStyle = {};
  error: string = '';
  successmsg: string = '';
  styles = {};
  event_id: string = '';
  event: Events = {} as Events;
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

  constructor(private activeRoute: ActivatedRoute, private userService: UsersService, private bookService: BookingsService, private eventService: EventsService, private router: Router) {
    this.getEventByEventId();
  }

  ngOnInit() {
    this.getEventByEventId();
  }

  navigateback() {
    this.router.navigate(['/attendee/events'])
  }

  getEventByEventId() {
    this.activeRoute.params.subscribe(res => this.event_id = res['event_id']);

    this.eventService.getEventById(this.event_id).subscribe(res => {
      this.event = (res.event as Events[])[0];
      this.myStyle = {
        'background-image': `${(res.event as Events[])[0].images}`
      }
    })
  }

  createBooking(book: Book) {
    this.bookService.createBooking(this.event_id, book).subscribe(res => {
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
        this.getEventByEventId();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }


}
