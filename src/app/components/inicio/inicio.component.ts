import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyService } from 'src/app/services/my.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {

  eventos: string[]=[];
  subscription!: Subscription;

  constructor(private myService: MyService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscription = this.myService.getServerSentEvent(environment.sse_url)
    .subscribe( (message: MessageEvent) => {
      console.log(message);
      const { text } = JSON.parse(message.data)
      this.eventos.push(text);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
