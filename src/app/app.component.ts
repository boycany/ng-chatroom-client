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

  // public userList: any[] = [
  //   {
  //     id: 1,
  //     name: 'Red',
  //     phone: '0961336838',
  //     image: 'assets/user/user-1.png',
  //     roomId: {
  //       2: 'room-1<>2',
  //       3: 'room-1<>3',
  //       4: 'room-1<>4',
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: 'Red2',
  //     phone: '0961336839',
  //     image: 'assets/user/user-2.png',
  //     roomId: {
  //       1: 'room-1<>2',
  //       3: 'room-2<>3',
  //       4: 'room-2<>4',
  //     },
  //   },
  //   {
  //     id: 3,
  //     name: 'Red3',
  //     phone: '0961336837',
  //     image: 'assets/user/user-3.png',
  //     roomId: {
  //       1: 'room-1<>3',
  //       2: 'room-2<>3',
  //       4: 'room-3<>4',
  //     },
  //   },
  //   {
  //     id: 4,
  //     name: 'Red4',
  //     phone: '0961336836',
  //     image: 'assets/user/user-4.png',
  //     roomId: {
  //       1: 'room-1<>4',
  //       2: 'room-2<>4',
  //       3: 'room-3<>4',
  //     },
  //   },
  // ];
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
