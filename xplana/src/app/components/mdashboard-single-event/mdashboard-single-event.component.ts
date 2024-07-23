import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Book, User } from '../../intefaces/interfaces';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-mdashboard-single-event',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mdashboard-single-event.component.html',
  styleUrl: './mdashboard-single-event.component.css'
})
export class MdashboardSingleEventComponent {
  myMessage = '';
  bookings: Book[] = [];
  users: User[] = [];
  event_id: string = '';
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

  constructor(private activeRoute: ActivatedRoute, private userService: UsersService, private bookService: BookingsService) {
    this.getUserByEventId();
  }

  getUserByEventId() {
    this.activeRoute.params.subscribe(res => {
      this.event_id = res['event_id'];
    })

    this.userService.getUsersByEventId(this.event_id).subscribe(res => {
      this.users = res.users as User[];
      this.bookings = res.bookings as Book[];

      if (this.users.length < 1) {
        this.myMessage = res.message as string
      }
    })
    
  }
}
