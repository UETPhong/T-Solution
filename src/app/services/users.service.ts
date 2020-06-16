import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  // ----------------------  GET  ----------------------

  getUsers() {
    return this.http.get(`${this.apiUrl}/api/users`)
  };

  getUser(id) {
    return this.http.get(`${this.apiUrl}/api/users/${id}`)
  };

  // getExcelUsers() { };

  getUserFiles() {
    return this.http.get(`${this.apiUrl}/api/user_files`)
  };

  getUserFile(id) {
    return this.http.get(`${this.apiUrl}/api/user_files/${id}`)
  };

  // ----------------------  PUT  ----------------------

  putUser(id, options) {
    return this.http.put(`${this.apiUrl}/api/users/${id}`, options, {
      reportProgress: true,
      observe: 'events',
    })
  }
  putUserFile(id, formData) {
    return this.http.post(`${this.apiUrl}/api/user_files/${id}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // ----------------------  POST  ----------------------

  postUser(options) {
    return this.http.post(`${this.apiUrl}/api/users`, options);
  };

  postUserFile(id, formData) {
    return this.http.post(`${this.apiUrl}/api/user_files/${id}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // ----------------------  DELETE  ----------------------

  deleteUser(id){
    return this.http.delete(`${this.apiUrl}/api/users/${id}`);
  }

  deleteFile(id){
    return this.http.delete(`${this.apiUrl}/api/user_files/${id}`);
  }
}
