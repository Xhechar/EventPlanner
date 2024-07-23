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

  style = {
    'display': 'none'
  }

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
  }

  ngOnInit() {
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

  toggleForm() {
    if (this.style.display === 'none') {
      this.style.display = 'flex';

      this.getUserProfile();
      this.updateUserForm.setValue({
        fullname: this.profile.fullname,
        phone_number: this.profile.phone_number,
        email: this.profile.email,
        country: this.profile.country,
        address: this.profile.address,
        profile_image: this.profile.profile_image,
        role: this.profile.role
      });
    } else {
      this.style.display = 'none';

      this.updateUserForm.setValue({
        fullname: ['',],
      phone_number: ['',],
      email: ['',],
      country: ['',],
      address: ['',],
      profile_image: ['',],
      role: ['',]
      })
    }
  }

  getUserProfile() {
    this.userService.getSingleUserById().subscribe(res => {
      let profile_array = res.user as User[];
      this.profile = profile_array[0];
    })
  }

  updateUser() {
    this.userService.updateUser(this.updateUserForm.value).subscribe(res => {
      if (res.error) {
        this.error = res.error;
        this.styles = {
          'background-color': 'rgb(190, 17, 17)',
          'display': 'flex'
        }

        setTimeout(() => {
          this.error = '';
          this.styles = {};
        }, 3000);
      }
      else if (res.message) {
        this.success = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.toggleForm();
        this.profile = {
          user_id: '',
          fullname: '',
          phone_number: '',
          email: '',
          country: '',
          address: '',
          profile_image: '',
          password: '',
          createdAt: '',
          role: '',
        };
        this.getUserProfile();

        setTimeout(() => {
          this.success = '';
          this.styles = {};
        }, 3000);
      }

    })
  }

}
