import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Events } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  event: Events[] = [];

  constructor(private eventsService: EventsService) { }
  
  displayEvents() {
    this.eventsService.getAllEvents().subscribe(res => {
      console.log(res);
    })
  }

}
