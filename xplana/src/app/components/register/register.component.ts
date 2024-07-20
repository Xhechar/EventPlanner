import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  error: string = '';
  success: string = '';
  styles = {};
  profile_image: string = '';
  show = false;

  registerUserForm!: FormGroup;

  constructor(private router: Router, private userService: UsersService, private fb: FormBuilder) {
    this.registerUserForm = this.fb.group({
      fullname: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      profile_image: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  setProfilePhoto(event: any) {
    const file = event.target.files[0];
    this.show = true;

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'xplana');
    formData.append('cloud_name', 'dakyiye2e');

    fetch('https://api.cloudinary.com/v1_1/dakyiye2e/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      this.profile_image = res.url as string;
      this.show = false;
    })
    
  }
  
  registerUser(user: any) {
    console.log(user);
    
  }

}
