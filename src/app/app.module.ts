import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { UserListCardComponent } from './user-list-card/user-list-card.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListCardComponent,
    ChatContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
