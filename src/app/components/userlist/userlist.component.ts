import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user.service';


@Component({
  
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users : Observable<User[]> | undefined;

  constructor(private _serive : UserService, private _router : Router ) { }

  ngOnInit(): void 
  {
    this.users = this._serive.getAllUsers();
  }

  Onclick(){
    this._router.navigate(['/chatbox']);
  }

}
