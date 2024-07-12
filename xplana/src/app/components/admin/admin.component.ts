import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AnavComponent } from './anav/anav.component';
import { AsideComponent } from './aside/aside.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, AnavComponent, AsideComponent, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
