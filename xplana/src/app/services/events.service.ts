import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseURL = 'http://localhost:6000/events';
  token_headers = new HttpHeaders({
    'Authorisation': `Bearer ${localStorage.getItem('token') as string}`
  })

  constructor(private http: HttpClient) { }

  createEventByManager(event: Events) {
    return this.http.post<{ error?: string, message?: string}>(`${this.baseURL}/create-event`, event, {headers: this.token_headers})
  }

  updateEventByManager(event_id: string, event: Events) {
    return this.http.post<{ error?: string, message?: string}>(`${this.baseURL}/update-event/${event_id}`, event, {headers: this.token_headers})
  }

  getAllEvents() {
    return this.http.get<{error?: string, message?:string, events?: Events[]}>(`${this.baseURL}/get-all-events`, {headers: this.token_headers})
  }

  updateAllEventStatus() {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-all-event-status`, {headers: this.token_headers})
  }

  updateEventStatus(event_id:string) {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-event-status/${event_id}`, {headers: this.token_headers})
  }

  getEventById(event_id: string) {
    return this.http.get<{error?: string, message?: string, event?: Events[]}>(`${this.baseURL}/get-event-by-id/${event_id}`, {headers: this.token_headers})
  }

  getEventByDateCreated() {
    return this.http.get<{error?: string, message?: string, event?: Events[]}>(`${this.baseURL}/get-events-by-date-created`, {headers: this.token_headers})
  }

  deleteAnEventById(event_id: string) {
    return this.http.get<{error?: string, message?: string}>(`${this.baseURL}/delete-event/${event_id}`, {headers: this.token_headers})
  }
}
