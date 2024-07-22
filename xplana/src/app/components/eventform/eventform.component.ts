import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-eventform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './eventform.component.html',
  styleUrl: './eventform.component.css'
})
export class EventformComponent {

  constructor(private router: Router, private eventsService: EventsService) {
    
  }

}
