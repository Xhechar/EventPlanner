import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { BookingsService } from '../../../services/bookings.service';
import { Events } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-mdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mdashboard.component.html',
  styleUrl: './mdashboard.component.css'
})
export class MdashboardComponent {
  events: Events[] = [];
  currentDateTime = new Date();
  approvedEvents: number = 0;
  pendingEvents: number = 0;

  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };

  formattedDate = this.currentDateTime.toLocaleDateString('en-US', this.options);

  currentTime = new Date();
  formattedTime = this.currentTime.toLocaleTimeString('en-US', { hour12: true });


  constructor(private router: Router, private eventService: EventsService, private bookService: BookingsService) {
    this.getEventByUserId();
  }

  getEventByUserId() {
    this.eventService.getEventByUserId().subscribe(res => {
      this.events = res.events as Events[];
      console.log('number of events are', this.events);
      

      for (let event of res.events as Events[]) {
        if (event.event_status === 'approved') {
          this.approvedEvents++;
        }
      }
      
      this.pendingEvents = this.events.length - this.approvedEvents
    })
  }

  checkEvent(event_id: string) {
    this.router.navigate(['/manager/single-event-stats', event_id]);
  }

}
