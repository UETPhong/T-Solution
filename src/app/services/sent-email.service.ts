import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SentEmailService {

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) { }

  sentEmail(option){
    return this.http.post(`${this.apiUrl}/api/SentEmail`, option)
  }
}
