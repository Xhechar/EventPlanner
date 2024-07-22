import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Events, User } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  baseURL = 'http://localhost:3000/bookings';
  token_headers = new HttpHeaders({
    'Authorisation': `Bearer ${localStorage.getItem('token') as string}`
  });

  constructor(private http: HttpClient) { }

  createBooking(event_id: string, booking: Book) {
    return this.http.post<{error?: string, message?: string}>(`${this.baseURL}/create-booking/${event_id}`, booking, {headers: this.token_headers})
  }
  
  updateBooking(event_id: string, booking: Book) {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-booking/${event_id}`, booking, {headers: this.token_headers})
  }

  deleteBooking(book_id: string) {
    return this.http.delete<{ error?: string, message?: string}>(`${this.baseURL}/delete-booking/${book_id}`, {headers: this.token_headers})
  }

  getAttendeeBookingHistory() {
    return this.http.get<{error?: string, message?: string, events?: Events[], bookings?: Book[]}>(`${this.baseURL}/get-attendee-booking-history`)
  }

  getEventUsersBookingHistory() {
    return this.http.get<{error?: string, message?: string, users?: User[]}>(`${this.baseURL}/get-managers-booked-events-users`)
  }
}
