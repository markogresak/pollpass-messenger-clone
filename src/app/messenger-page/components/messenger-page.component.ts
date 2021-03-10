import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state';
import { updateAuthGrant } from '../../state/auth.actions';
import { selectMessages } from '../state/conversation.selectors';
import { ReceivedMessage } from '../types';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss'],
})
export class MessengerPageComponent implements OnInit {
  messages$: Observable<ReceivedMessage[]> = this.store.select(selectMessages);

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    const id = this.getRouteId();

    if (id) {
      this.store.dispatch(updateAuthGrant({ id }));
    }
  }

  getText(message: any): string {
    // HACK: this is temporary testing code
    return message.text_html || message.name_html;
  }

  private getRouteId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
