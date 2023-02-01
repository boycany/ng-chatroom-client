import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChatService } from './sevices/chat/chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  private storageArray = []

  public showScreen: boolean;
  public phone: string;
  public currentUser;
  public selectedUser;

  public userList = [
    {
      id: 1,
      name: 'Red',
      phone: '0961336838',
      image: 'assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
      },
    },
    {
      id: 2,
      name: 'Red2',
      phone: '0961336839',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
      },
    },
    {
      id: 3,
      name: 'Red3',
      phone: '0961336837',
      image: 'assets/user/user-3.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6',
      },
    },
    {
      id: 4,
      name: 'Red4',
      phone: '0961336836',
      image: 'assets/user/user-4.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6',
      },
    },
  ];

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getMessage()
      .subscribe((data: { user: string, message: string }) => {
      // this.messageArray.push(data);
      console.log('this.roomId :>> ', this.roomId);
      if(this.roomId){
        setTimeout(() => {
           this.storageArray = this.chatService.getStorage();
           const storeIndex = this.storageArray.findIndex((storage) => {
             return storage.roomId === this.roomId;
           });
           this.messageArray = this.storageArray[storeIndex].chats;
        }, 500)
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
    console.log('hello')
    this.currentUser = this.userList.find(
      (user) => {
        console.log('user :>> ', user.phone);
        console.log('this.phone :>> ', this.phone);
        return user.phone === this.phone.toString()
      }
    );
    this.userList = this.userList.filter(
      (user) => user.phone !== this.phone.toString()
    );
      console.log('this.currentUser :>> ', this.currentUser);
    if (this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }

  selectUserHandler(phone: string) {
    console.log('select User phone :>> ', phone);
    this.selectedUser = this.userList.find((user) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    console.log('this.roomId :>> ', this.roomId);
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage()
    console.log('this.storageArray :>> ', this.storageArray);
    const storeIndex = this.storageArray.findIndex(storage => {
      return storage.roomId === this.roomId
    })

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string) {
    this.chatService.joinRoom({ user: username, room: roomId });
  }

  sendMessage() {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText,
    });

    this.storageArray = this.chatService.getStorage()
    const storeIndex = this.storageArray.findIndex(storage => {
      return storage.roomId === this.roomId
    })

    if(storeIndex > -1){
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      })
    }else{
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      }

      this.storageArray.push(updateStorage)
    }

    this.chatService.setStorage(this.storageArray)
    this.messageText = '';
  }

  test(){
    console.log('button click')
  }
}
