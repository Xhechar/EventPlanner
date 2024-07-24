import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Book, Events, User } from '../../intefaces/interfaces';
import { BookingsService } from '../../services/bookings.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-mdashboard-single-event',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mdashboard-single-event.component.html',
  styleUrl: './mdashboard-single-event.component.css'
})
export class MdashboardSingleEventComponent {
  approved_attendies: number = 0;
  error: string = '';
  successmsg: string = '';
  styles = {};
  bookings: Book[] = [];
  users: User[] = [];
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

  constructor(private activeRoute: ActivatedRoute, private userService: UsersService, private bookService: BookingsService, private eventService: EventsService) {
    this.getUserByEventId();
  }

  ngOnInit() {
    this.getUserByEventId();
    this.getEventByEventId();
  }

  getUserByEventId() {
    this.activeRoute.params.subscribe(res => {
      this.event_id = res['event_id'];
    })

    this.userService.getUsersByEventId(this.event_id).subscribe(res => {
      this.users = res.users as User[];
      this.bookings = res.bookings as Book[];
    })
    
    for (let booking of this.bookings) {
      if (booking.book_status == true) {
        this.approved_attendies++
      }
    }
  }

  getEventByEventId() {
    this.eventService.getEventById(this.event_id).subscribe(res => {
      this.event = (res.event as Events[])[0];
    })
  }

  updateBookStatus(event_id: string) {
    this.bookService.updateBookStatus(event_id).subscribe(res => {
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
        this.users = [];
        this.getUserByEventId();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }

    })
  }

  userAlreadyApproved() {
    this.error = "The user selected, is already booked ...";
    this.styles = {
      'background-color': 'rgb(190, 17, 17)',
      'display': 'flex'
    }

    setTimeout(() => {
      this.error = '';
      this.styles = {};
    }, 3000);
  }
}
