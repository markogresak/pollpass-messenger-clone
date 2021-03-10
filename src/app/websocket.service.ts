import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, retryWhen, switchMap } from 'rxjs/operators';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';

const RETRY_DELAY = 500000;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService<T = any> implements OnDestroy {
  private connection$?: WebSocketSubject<T>;

  constructor() {}

  ngOnDestroy(): void {
    this.close();
  }

  connect(config: WebSocketSubjectConfig<T>): Observable<T> {
    return of(config).pipe(
      switchMap((wsConfig) => {
        if (!this.connection$) {
          this.connection$ = webSocket(wsConfig);
        }

        return this.connection$;
      }),
      retryWhen((errors) => errors.pipe(delay(RETRY_DELAY))),
    );
  }

  send(data: T): void {
    if (!this.connection$) {
      throw new Error(
        'WebsocketService.send: no connection. Call WebsocketService.connect first.',
      );
    }

    this.connection$.next(data);
  }

  close(): void {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = undefined;
    }
  }
}
