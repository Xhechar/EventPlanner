import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { Events } from '../../../intefaces/interfaces';

@Component({
  selector: 'app-mnewevents',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './mnewevents.component.html',
  styleUrl: './mnewevents.component.css'
})
export class MneweventsComponent {
  error: string = '';
  successmsg: string = '';
  styles = {};
  show: boolean = false;
  style = {
    'display': 'none'
  };
  buttonValue: string = 'Create New';
  events: Events[] = [];
  eventsImages: string[] = [];
  event_id: string = '';
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

  createEventForm!: FormGroup;

  constructor(private router: Router, private eventService: EventsService, private fb: FormBuilder) {

    this.createEventForm = this.fb.group({
      event_name: ['', Validators.required],
      location: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      short_desc: ['', Validators.required],
      long_desc: ['', Validators.required],
      images: [[''], Validators.required],
      booking_deadline: ['', Validators.required],
      singles: ['', Validators.required],
      couple: ['', Validators.required],
      groups: ['', Validators.required],
      no_of_tickets: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getEventByUserId();
  }

  changeFormFlex() {
    this.style = {
      'display': 'flex'
    }
  }

  changeFormNone() {
    this.style = {
      'display': 'none'
    }
    this.createEventForm.setValue({
      event_name: '',
      location: '',
      start_date: '',
      end_date: '',
      short_desc: '',
      long_desc: '',
      images: [''],
      booking_deadline: '',
      singles: '',
      couple: '',
      groups: '',
      no_of_tickets: ''
    });
  }

  getEventImages(event: any) {
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
      this.eventsImages.push(res.url);
      this.createEventForm.patchValue({ images: this.eventsImages });
      this.show = false;
    })
    
  }

  create_or_update(type: string) {
    
    if (!this.event_id) {
      this.createNewEvent();
    }
    else {
      this.updateEvent();
    }

  }

  createNewEvent() {
    const newForm = {
      ...this.createEventForm.value,
      images: this.createEventForm.value.images.join(', ')
    }
    this.eventService.createEventByManager(newForm).subscribe(res => {
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
        this.successmsg = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.createEventForm.setValue({
          event_name: '',
          location: '',
          start_date: '',
          end_date: '',
          short_desc: '',
          long_desc: '',
          images: [''],
          booking_deadline: '',
          singles: '',
          couple: '',
          groups: '',
          no_of_tickets: ''
        });

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
          this.events = [];
          this.getEventByUserId();
          this.changeFormNone();
        }, 3000);
      }
    })
  }

  setEventId(event_id: string) {
    this.event_id = event_id;
    this.changeFormFlex();

    this.buttonValue = 'Update Event';this.eventService.getEventById(this.event_id).subscribe(res => {
      let myEvent = res.event as Events[];
      const eventObj = myEvent[0];

      this.createEventForm.setValue({
        event_name: eventObj.event_name,
        location: eventObj.location,
        start_date: eventObj.start_date,
        end_date: eventObj.end_date,
        short_desc: eventObj.short_desc,
        long_desc: eventObj.long_desc,
        images: [eventObj.images],
        booking_deadline: eventObj.booking_deadline,
        singles: eventObj.singles,
        couple: eventObj.couple,
        groups: eventObj.groups,
        no_of_tickets: eventObj.no_of_tickets
      })
    });
    
  }

  updateEvent() {

    const newForm = {
      ...this.createEventForm.value,
      images: this.createEventForm.value.images.join(', ')
    }

    this.eventService.updateEventByManager(this.event_id, newForm).subscribe(res => {
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
        this.successmsg = res.message;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.createEventForm.setValue({
          event_name: '',
          location: '',
          start_date: '',
          end_date: '',
          short_desc: '',
          long_desc: '',
          images: [''],
          booking_deadline: '',
          singles: '',
          couple: '',
          groups: '',
          no_of_tickets: ''
        });

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
          this.events = [];
          this.getEventByUserId();
          this.changeFormNone();
        }, 3000);
      }
    })
  }

  getEventByUserId() {
    this.eventService.getEventByUserId().subscribe(res => {
      if (res.events) {
        this.events = res.events;
        console.log(this.events);
      }
      else {
        console.log(res.error);
      }
    })
  }

  deleteSelectedEvent(event_id: string) {
    
    this.eventService.deleteAnEventById(event_id).subscribe(res => {
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
      else {
        this.successmsg = res.message as string;
        this.styles = {
          'background-color': 'rgb(24, 179, 14)',
          'display': 'flex'
        }
        this.events = [];
        this.getEventByUserId();

        setTimeout(() => {
          this.successmsg = '';
          this.styles = {};
        }, 3000);
      }
    })
  }
}
