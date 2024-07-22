import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../intefaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mprofile.component.html',
  styleUrl: './mprofile.component.css'
})
export class MprofileComponent {
  profile!: User;
  currentDateTime = new Date();

  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };

  formattedDate = this.currentDateTime.toLocaleDateString('en-US', this.options);

  currentTime = new Date();
  formattedTime = this.currentTime.toLocaleTimeString('en-US', { hour12: false });

  error: string = '';
  success: string = '';
  styles = {};
  profile_image: string = '';
  show = false;

  updateUserForm!: FormGroup;

  constructor(private userService: UsersService, private fb: FormBuilder) {
    this.updateUserForm = this.fb.group({
      fullname: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      country: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
    this.getUserProfile();
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
      this.updateUserForm.patchValue({ profile_image: this.profile_image });
      this.show = false;
    })
  }

  getUserProfile() {
    this.userService.getSingleUserById().subscribe(res => {
      let profile_array = res.user as User[];
      this.profile = profile_array[0];
    })
  }

  updateUser() {}

}
