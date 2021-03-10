import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketSubjectConfig } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';

// TODO
type Data = any;

@Injectable({
  providedIn: 'root',
})
export class ConversationService implements OnDestroy {
  private static API_URL = `${environment.wsBase}/conversation`;

  private destroyed$ = new Subject();

  private messages: Data[] = [];

  constructor(private websocket: WebsocketService<Data>) {}

  connect(): void {
    this.websocket.connect(this.getConfig()).subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  send(data: Data): void {
    this.websocket.send(data);
  }

  getMessages(): Data[] {
    return this.messages;
  }

  private getConfig(): WebSocketSubjectConfig<Data> {
    return {
      url: ConversationService.API_URL,
      // TODO: use access_token from `POST /auth/magic_link/nbvpji`
      protocol:
        'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwb2xscGFzcy1hcGkiLCJpYXQiOjE2MTUyODY4ODQsInJuZCI6IjA3NjU0MDIzYjhkZGVjZmFmZjY5ODZmMjRiMjA1ZGE0IiwiZXhwIjoxNjE1MzA4NDg0LCJ1c2VyIjp7InV1aWQiOiI5ODJhZTQwOC1kZWE0LTRhNjgtYmEwMi1mNWQ1ZjM5M2E4ZjkiLCJyb2xlcyI6WyJtYWdpY19saW5rX3VzZXIiXSwiY2FtcGFpZ24iOnsidXVpZCI6ImQ4NmVhMzM4LWQ4MDQtNDZkYS1iZjU1LWU4MGYyN2RiYmIwOSIsImNvZGUiOiJuYnZwamkifX19.SGwg_GRiI2UAFAukiDFbZbSLtoilhoxWyP2jwaLi1KdcylYKh3mW-CkJrBhtbc-OAPv0hLABMP0f3__uvu9xog',
    };
  }
}
