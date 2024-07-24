import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Router, RouterLink } from '@angular/router';
import { Events } from '../../../intefaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mevents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mevents.component.html',
  styleUrl: './mevents.component.css'
})
export class MeventsComponent {
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
    this.router.navigate(['/manager/m-single-event/', event_id]);
  }
}
