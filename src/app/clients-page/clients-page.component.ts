import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../shared/services/client.service';
import {Client} from '../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit, OnDestroy {

  clients: Client[] = [];
  pSub: Subscription;
  search = '';

  constructor(private  clientService: ClientService)  { }

  ngOnInit(): void {
    this.pSub = this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}
