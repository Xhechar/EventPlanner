import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-attendee',
  standalone: true,
  imports: [NavComponent, SideComponent, NavbarComponent, RouterOutlet],
  templateUrl: './attendee.component.html',
  styleUrl: './attendee.component.css'
})
export class AttendeeComponent {
  
}
