import { Component } from '@angular/core';
import { User } from '../../../intefaces/interfaces';
import { UsersService } from '../../../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-anav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './anav.component.html',
  styleUrl: './anav.component.css'
})
export class AnavComponent {
  user: User = {} as User;

  constructor(private router: Router, private userService: UsersService) {
    this.getProfileImage();
  }

  ngOnInit() {
    this.getProfileImage();
  }

  clearLocalStorage() {
    localStorage.clear();
    
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }

  getProfileImage() {
    this.userService.getSingleUserById().subscribe(res => {
      let users = res.user as User[];
      this.user = users[0];
    })
  }
}
