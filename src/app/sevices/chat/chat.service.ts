import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  // private url = 'http://localhost:3000';
  private url = 'https://ng-chatroom-backend.onrender.com';

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket', 'pulling', 'flashsocket'],
    });
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{ user: string; message: string }>((observer) => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  getStorage() {
    const storage: string = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

  deleteStorage() {
    localStorage.removeItem('chats');
  }
}
