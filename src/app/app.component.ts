import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChatService } from './sevices/chat/chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userList } from './data/user-list'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('popup', { static: false }) popup: any;

  title = 'chat-client';

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string; message: string }[] = [];
  public storageArray = [];

  public showScreen: boolean;
  public phone: string;
  public currentUser;
  public selectedUser;

  
  public userList = userList

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService
  ) {
     this.chatService.deleteStorage();
  }

  ngOnInit(): void {
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; message: string }) => {
        // console.log('subscribed data :>> ', data);
        if (this.roomId) {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray.findIndex((storage) => {
              return storage.roomId === this.roomId;
            });
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });

  }

  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  openPopup(content: any) {
    this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  login(dismiss: any) {
    this.currentUser = this.userList.find((user) => {

      return user.phone === this.phone.toString();
    });
    
    this.userList = this.userList.filter(
      (user) => user.phone !== this.phone.toString()
    );

    if (this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }

}
