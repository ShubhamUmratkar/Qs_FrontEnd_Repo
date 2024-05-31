
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class chatboxComponent implements OnInit {
  messages:{ user: string; text: string }[]=[] ;
  newMessage: string = '';
  user: { email: string } = { email: '' };


  profileDetails : Observable<User[]> | undefined;

  constructor(private chatService: ChatService, private _service: UserService) {}
   

  ngOnInit(): void {
    // this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    // this.loggedUser = this.loggedUser.replace(/"/g, '');
    // console.log(this.loggedUser,'This is loggeduser')
    // const loggedUserObj = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    // if (loggedUserObj && loggedUserObj.email) {
    //   this.user.email = loggedUserObj.email;
    // }

    // const loggedUser = sessionStorage.getItem('loggedUser');
    // console.log(loggedUser,'This block is before if statemenet')
    // if (loggedUser) {
    //   const loggedUserObj = JSON.parse(loggedUser);
    //   if (loggedUserObj && loggedUserObj.email) {
    //     this.user.email = loggedUserObj.email;
    //   }
    // }
    // console.log(loggedUser,'This is loggeduser block');


    this.retrieveLoggedUser();
    this.loadMessages();
  }   

  retrieveLoggedUser() {
    
    const loggedUser = sessionStorage.getItem('loggedUser');
  console.log(loggedUser, 'RetrieveLoggedUser1-1');  // Log the raw session storage value

  if (loggedUser) {
    try {
      const loggedUserObj = JSON.parse(loggedUser);
      console.log(loggedUserObj, 'This is loggedUserObj1-2');  // Log the parsed object

      if (loggedUserObj && loggedUserObj.email) {
        this.user.email = loggedUserObj.email;
        console.log(this.user.email, 'This is email from retrieveLoggedUser1-3');  // Log the email value
      } else {
        console.warn('Logged user object does not have an email property.1-4');
      }
    } catch (e) {
      console.error('Error parsing logged user from session storage:1-5', e);
    }
  } else {
    console.warn('No logged user found in session storage.1-6');
  }
  console.log('Retrieved user email:1-7---', this.user.email);




    // const loggedUser = sessionStorage.getItem('loggedUser');
    // console.log(loggedUser,'Retriveloggeduser ');
    // const loggedUserObj = JSON.parse(this.loggedUser);
    // console.log(loggedUserObj,'This is loggedUserOBJ');
    // this.user.email = loggedUserObj.email;
    // console.log(this.user.email,'This is emil from retriveloggedUser');
  

    // if (loggedUser) {
    //   try {
    //     const loggedUserObj = JSON.parse(loggedUser);
    //     console.log(loggedUser,'Try block of RetrieveUser');
    //     if (loggedUserObj && loggedUserObj.email) {
    //       this.user.email = loggedUserObj.email;
    //     } else {
    //       console.warn('Logged user object does not have an email property.');
    //     }
    //   } catch (e) {
    //     console.error('Error parsing logged user from session storage:', e);
    //   }
    // } else {
    //   console.warn('No logged user found in session storage.');
    // }
    // console.log('Retrieved user email:', this.user.email);
  }


  loadMessages() {
    this.chatService.getMessages(this.user.email).subscribe((data: any) => {
      this.messages = data;
    });
  }

   sendMessage(): void {

    if (this.newMessage.trim().length > 0) {
      console.log('This Is email id:--',this.user.email);
      this.chatService.sendMessage(this.newMessage, this.user.email).subscribe(response => {
        this.messages.push({user: this.user.email, text: this.newMessage});
        this.newMessage = '';
      }, 
      error => {
        console.error('Error sending message:', error);
      })
     
      setTimeout(() => {
        const chatboxBody = document.querySelector('.chatbox-body');
        if (chatboxBody) {
          chatboxBody.scrollTop = chatboxBody.scrollHeight;
        }
      }, 0);



    }
  }

      
  // getProfileDetails(loggedUser : string)
  // {
  //   this.profileDetails = this._service.getProfileDetails(this.loggedUser);
  //   console.log(this.profileDetails);
  // }

  }
  