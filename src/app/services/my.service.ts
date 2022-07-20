import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  constructor(private zone: NgZone, private seeService: SseService) { }

  getServerSentEvent(url: string) {
    return new Observable(observer => {
      const eventSource = this.seeService.getEventSource(url);
      
      eventSource.onmessage = event => {
        observer.next(event);
/*         this.zone.run(() => {
          observer.next(event);
        })
 */      };

      eventSource.onerror = error => {

        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
/*
        this.zone.run(() => {
          observer.error(error);
        })
*/
      }

    })
  }

}
