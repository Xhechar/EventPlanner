import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../intefaces/interfaces';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-mside',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mside.component.html',
  styleUrl: './mside.component.css'
})
export class MsideComponent {

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
