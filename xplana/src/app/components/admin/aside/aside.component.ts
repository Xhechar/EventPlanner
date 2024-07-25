import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
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
      this.router.navigate(['/login']);
    }, 3000);
  }

  getProfileImage() {
    this.userService.getSingleUserById().subscribe(res => {
      let users = res.user as User[];
      this.user = users[0];
    })
  }

}
