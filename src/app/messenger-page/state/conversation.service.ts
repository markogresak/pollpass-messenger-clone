import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { WebsocketService } from 'src/app/websocket.service';
import { environment } from 'src/environments/environment';
import { ReceivedMessage, SentMessage } from '../types';
import { isReceivedMessage } from '../types/guards';

@Injectable({
  providedIn: 'root',
})
export class ConversationService implements OnDestroy {
  private static API_URL = `${environment.wsBase}/conversation`;

  private destroyed$ = new Subject();

  constructor(
    private websocket: WebsocketService<ReceivedMessage | SentMessage>,
  ) {}

  connect(authToken: string): Observable<ReceivedMessage> {
    const config = {
      url: ConversationService.API_URL,
      protocol: authToken,
    };

    return this.websocket
      .connect(config)
      .pipe(filter(isReceivedMessage), takeUntil(this.destroyed$));
  }

  close(): void {
    this.destroyed$.next();
    this.websocket.close();
  }

  ngOnDestroy(): void {
    this.close();
  }

  send(data: SentMessage): void {
    this.websocket.send(data);
  }
}
