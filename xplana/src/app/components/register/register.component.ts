import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
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
      fullname: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      country: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, validatePassword()]],
      confirm_password: ['', [Validators.required, validatePassword()]]
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
      this.registerUserForm.patchValue({ profile_image: this.profile_image });
      this.show = false;
    })
    
  }
  
  registerUser() {
    if (!(this.registerUserForm.get('password')?.value == this.registerUserForm.get('confirm_password')?.value)) {
      this.error = "The passwords you provided do not match";
        this.styles = {
          'background-color': 'rgb(190, 17, 17)',
          'display': 'flex'
        }

        setTimeout(() => {
          this.error = '';
          this.styles = {};
        }, 3000);
    }
    else {
      const formValue = { ...this.registerUserForm.value };
      delete formValue.confirm_password;

      this.userService.registerUser(formValue).subscribe(res => {
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
  
          setTimeout(() => {
            this.success = '';
            this.styles = {};
            this.router.navigate(['/login']);
          }, 3000);
        }
      })
    }
  }

}

function validatePassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null
    }

    let hasUppercase = /[A-Z]+/.test(value);
    let hasLowercase = /[a-z]+/.test(value);
    let hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUppercase && hasLowercase && hasNumeric;

    return !passwordValid ? {passwordStrength: true} : null
  }
}