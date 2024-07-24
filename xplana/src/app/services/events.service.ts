import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseURL = 'http://localhost:3000/events';
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) {}

  createEventByManager(event: Events) {
    return this.http.post<{ error?: string, message?: string}>(`${this.baseURL}/create-event`, event, {headers: this.getAuthHeaders()})
  }

  updateEventByManager(event_id: string, event: Events) {
    return this.http.put<{ error?: string, message?: string}>(`${this.baseURL}/update-event/${event_id}`, event, {headers: this.getAuthHeaders()})
  }

  getAllEvents() {
    return this.http.get<{error?: string, message?:string, events?: Events[]}>(`${this.baseURL}/get-all-events`, {headers: this.getAuthHeaders()})
  }

  updateAllEventStatus() {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-all-event-status`, {headers: this.getAuthHeaders()})
  }

  updateEventStatus(event_id:string) {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-event-status/${event_id}`, {headers: this.getAuthHeaders()})
  }

  getEventById(event_id: string) {
    return this.http.get<{error?: string, message?: string, event?: Events[]}>(`${this.baseURL}/get-event-by-id/${event_id}`, {headers: this.getAuthHeaders()})
  }

  getEventByUserId() {
    return this.http.get<{error?: string, message?: string, events?: Events[]}>(`${this.baseURL}/get-event-by-user-id`, {headers: this.getAuthHeaders()})
  }

  getEventByDateCreated() {
    return this.http.get<{error?: string, message?: string, event?: Events[]}>(`${this.baseURL}/get-events-by-date-created`, {headers: this.getAuthHeaders()})
  }

  deleteAnEventById(event_id: string) {
    return this.http.delete<{error?: string, message?: string}>(`${this.baseURL}/delete-event/${event_id}`, {headers: this.getAuthHeaders()})
  }
}
