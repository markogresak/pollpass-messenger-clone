import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConversationService } from '../conversation.service';
import { AppState } from '../state';
import { updateAuthGrant } from '../state/auth.actions';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss'],
})
export class MessengerPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private conversation: ConversationService,
  ) {}

  ngOnInit(): void {
    const id = this.getRouteId();

    if (id) {
      this.store.dispatch(updateAuthGrant({ id }));
    }
  }

  getMessages(): string[] {
    return this.conversation
      .getMessages()
      .filter((message) => message.kind !== 'Heartbeat')
      .map((message) => JSON.stringify(message, null, 2));
  }

  private getRouteId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
