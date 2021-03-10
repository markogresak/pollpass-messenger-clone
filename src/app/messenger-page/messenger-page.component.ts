import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss'],
})
export class MessengerPageComponent implements OnInit {
  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.connect();
  }

  getMessages(): string[] {
    return this.conversationService
      .getMessages()
      .filter((message) => message.kind !== 'Heartbeat')
      .map((message) => JSON.stringify(message, null, 2));
  }
}
