import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

 

  constructor(private _http: HttpClient) { }


  sendMessage(message: string, useremail: string): Observable<any> {
  console.log(useremail);
    
    return this._http.post<any>(`${NAV_URL}/chat/send-message`, { message, useremail });
  }

  getMessages(userId: string): Observable<any> {
    return this._http.get(`${NAV_URL}/messages/${userId}`);
  }
}