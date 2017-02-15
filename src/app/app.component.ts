//Angular
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
//Translate
import { TranslateService } from 'ng2-translate';
//Material
import { MdIconRegistry } from '@angular/material';
//Models
import { MembersModel } from './models/members';
import { ChatModel } from './models/chat';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MdIconRegistry]
})
export class AppComponent implements OnInit {

  private member = new MembersModel('','','','','');
  private membersmodelviewAll: MembersModel[];
  private chatmodelview = new ChatModel(0, '', '');
  private chatmodelviewAll: ChatModel[];
  private notification: boolean = false;
  private admin: boolean;
  private opened: any = false;

  constructor(
    private membersService: MembersService,
    private loginService: LoginService,
    private chatService: ChatService,
    private translate: TranslateService,
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    mdIconRegistry.addSvgIcon('ball', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/soccer.svg'));
    mdIconRegistry.addSvgIcon('cup', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/cup.svg'));
    translate.setDefaultLang('en');
    let lang = translate.getBrowserLang();
    translate.use(lang);
  }

  logout(): void {
    this.loginService.logout();
  }

  isAuth(): Observable<boolean> {
    return this.loginService.getAuthenticated().map(user => {
      if(user) {
        this.membersService.get(user.uid).subscribe(member => {
          this.member = member;
        });
        return true;
      } else {
        this.member = new MembersModel('','','','','');
        return false;
      }
    });
  }

  isAdmin(): Observable<boolean> {
    return this.loginService.getAdmin();
  }

  getChat(): void {
    this.loginService.getAuthenticated().subscribe(user => {
      if(user) {
        this.membersService.getAll().subscribe( members => {
          this.membersmodelviewAll = members;
          this.chatService.getLast(10).subscribe(chat => {
            this.chatmodelviewAll = chat.reverse();
            this.chatmodelviewAll.forEach( chat => {
              let membermerge = this.membersmodelviewAll.find(member => member['$key'] == chat.user);
              if(membermerge) {
                chat['userName'] = membermerge.firstName + ' ' + membermerge.lastName;
              }
              if(chat.created >= this.member.chatactivity){
                this.notification = true;
              }
            })
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.getChat();
  }

  toggleChat(navChat: any): void {
    navChat.open();
    this.membersService.changeChatActivity();
    this.notification = false;                      //!!!
  }

  sendChatMessage(): void {
    if (this.chatmodelview.message.replace(/\s/g, "").length > 0) {
      this.chatService.create(this.chatmodelview);
    }
    this.chatmodelview = new ChatModel(0,'','');
    this.notification = false;                      //!!!
  }

}
