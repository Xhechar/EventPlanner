import { Component } from '@angular/core';
import { Book, Events, User } from '../../intefaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { BookingsService } from '../../services/bookings.service';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single.component.html',
  styleUrl: './single.component.css'
})
export class SingleComponent {
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
    this.router.navigate(['/manager/m-events'])
  }

  getEventByEventId() {
    this.activeRoute.params.subscribe(res => this.event_id = res['event_id']);

    this.eventService.getEventById(this.event_id).subscribe(res => {
      this.event = (res.event as Events[])[0];
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
