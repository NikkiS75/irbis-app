import {Pipe, PipeTransform} from '@angular/core';
import {Client} from './interfaces';

@Pipe({name: 'searchClients'})
export class SearchClientPipe implements PipeTransform{
  transform(clients: Client[], search= ''): Client[] {
    if(!search.trim()){
      return clients
    }
    return clients.filter( clients => { return clients.surname.toLowerCase().includes(search.toLowerCase())})
  }

}
