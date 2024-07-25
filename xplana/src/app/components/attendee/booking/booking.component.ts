import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { Book, Events } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  events: Events[] = [];
  bookings: Book[] = [];
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

  constructor(private bookService: BookingsService) {
    this.getUserBookingHistory()
  }

  ngOnInit() {}

  getUserBookingHistory() {
    this.bookService.getAttendeeBookingHistory().subscribe(res => {
      this.events = res.events as Events[];
      this.bookings = res.bookings as Book[];
    })
  }

  deleteBooking(book_id: string) {
    this.bookService.deleteBooking(book_id).subscribe(res => {
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
        this.events = [];
        this.bookings = [];
        this.getUserBookingHistory();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }
    })
  }
}
