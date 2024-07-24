import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Logins, User } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURL = 'http://localhost:3000/users';
  token_headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') as string}`
  });

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<{error?:string, message?:string}>(`${this.baseURL}/register`, user)
  }

  loginUser(logins: Logins) {
    return this.http.post<{error?:string, role?: string, message?:string, token?: string}>('http://localhost:3000/auth/login', logins)
  }

  updateUser(user: User) {
    return this.http.post<{error?: string, message?:string}>(`${this.baseURL}/update`, user, {headers: this.token_headers})
  }

  getAllUsers() {
    return this.http.get<{error?:string, message?:string, users?: User[]}>(`${this.baseURL}/get-all`, {headers: this.token_headers})
  }

  getSingleUserById() {
    return this.http.get<{error?: string, message?:string, user?: User[]}>(`${this.baseURL}/get-single-user`, {headers: this.token_headers})
  }

  getUserByRole() {
    return this.http.get<{error?: string, message?: string, users?: User[]}>(`${this.baseURL}/get-user-by-role`, {headers: this.token_headers})
  }

  getUsersByDateCreated() {
    return this.http.get<{error?: string, message?: string, users?: User[]}>(`${this.baseURL}/get-all-by-date-created`, {headers: this.token_headers})
  }

  updateUserRoleByAdmin(user_id: string) {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-role-by-admin/${user_id}`, {headers: this.token_headers})
  }

  updateAllUsersRoleByAdmin() {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/update-all-user-roles`, {headers: this.token_headers})
  }

  softDeleteUserByAdmin(user_id: string) {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/soft-delete-user/${user_id}`, {headers: this.token_headers})
  }

  retrieveDeletedUserByAdmin(user_id: string) {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/retrieve-deleted-user/${user_id}`, {headers: this.token_headers})
  }

  retrieveAllDeletedUsersByAdmin() {
    return this.http.put<{error?: string, message?: string}>(`${this.baseURL}/retrieve-deleted-users`, {headers: this.token_headers})
  }

  getUsersByEventId(event_id: string) {
    return this.http.get<{error?: string, message?: string, bookings?: Book [], users?: User[]}>(`${this.baseURL}/get-user-by-event-id/${event_id}`, {headers: this.token_headers})
  }
}
