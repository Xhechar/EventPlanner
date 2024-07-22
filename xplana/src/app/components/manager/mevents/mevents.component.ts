import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-mevents',
  standalone: true,
  imports: [],
  templateUrl: './mevents.component.html',
  styleUrl: './mevents.component.css'
})
export class MeventsComponent {
  constructor(private eventService: EventsService) { }
}
