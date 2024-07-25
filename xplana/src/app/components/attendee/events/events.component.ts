import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Events } from '../../../intefaces/interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: Events[] = [];
  currentDateTime = new Date();

  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };

  formattedDate = this.currentDateTime.toLocaleDateString('en-US', this.options);

  currentTime = new Date();
  formattedTime = this.currentTime.toLocaleTimeString('en-US', { hour12: false });


  constructor(private eventService: EventsService, private router: Router) {
    this.displayEvents()
  }

  displayEvents() {
    this.eventService.getAllEvents().subscribe(res => {
      this.events = res.events as Events[];
    })
  }

  navigateToBooking(event_id: string) {
    this.router.navigate(['/attendee/single-event/', event_id]);
  }

}
