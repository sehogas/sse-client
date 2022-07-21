import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyService } from 'src/app/services/my.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  constructor(private myService: MyService) { }

  ngOnInit(): void {
    this.subscription = this.myService.getServerSentEvent(`http://localhost:3000/sse`).subscribe( message => {
      const { data } = message;
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
