import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from '../sevices/chat/chat.service';
import { AppComponent } from '../app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list-card',
  templateUrl: './user-list-card.component.html',
  styleUrls: ['./user-list-card.component.scss'],
})
export class UserListCardComponent {
  @Input() selectedUser;
  @Output() selectedUserChange = new EventEmitter();

  @Input() roomId: string
  @Output() roomIdChange = new EventEmitter()

  @Input() messageArray
  @Output() messageArrayChange = new EventEmitter()

  @Input() storageArray
  @Output() storageArrayChange = new EventEmitter()
  
  @Input() currentUser;
  @Input() userList;

  constructor(
    private chatService: ChatService,
    private modalService: NgbModal
  ) {}

  propsEmit() {
    this.selectedUserChange.emit(this.selectedUser);
    this.roomIdChange.emit(this.roomId)
    this.messageArrayChange.emit(this.messageArray)
    this.storageArrayChange.emit(this.storageArray)
  }

  selectUserHandler(phone: string) {
    this.selectedUser = this.userList.find((user) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    console.log('List-Card this.storageArray :>> ', this.storageArray);

    const storeIndex = this.storageArray.findIndex((storage) => {
      return storage.roomId === this.roomId;
    });
    this.messageArray = this.storageArray[storeIndex]?.chats || [];

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string) {
    this.chatService.joinRoom({ user: username, room: roomId });
  }
}
