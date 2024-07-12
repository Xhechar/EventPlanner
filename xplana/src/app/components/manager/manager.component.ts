import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MnavComponent } from './mnav/mnav.component';
import { MsideComponent } from './mside/mside.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterOutlet, MnavComponent, MsideComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
