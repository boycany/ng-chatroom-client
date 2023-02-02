import { Component, Input } from '@angular/core';
import { ChatService } from '../sevices/chat/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {
  @Input() selectedUser;
  @Input() messageArray;
  @Input() currentUser;
  // @Input() sendMessage;
  @Input() roomId
  @Input() storageArray
  
  messageText;
  
  constructor(private chatService: ChatService){}

  sendMessage() {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText,
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex((storage) => {
      return storage.roomId === this.roomId;
    });

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText,
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [
          {
            user: this.currentUser.name,
            message: this.messageText,
          },
        ],
      };

      this.storageArray.push(updateStorage);
      
    }
    console.log('Chat-Container this.storageArray :>> ', this.storageArray);
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
}
