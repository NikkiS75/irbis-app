import {Pipe, PipeTransform} from '@angular/core';
import {Reception} from './interfaces';

@Pipe({name: 'search'})
 export class SearchPipe implements PipeTransform{
  transform(receptions: Reception[], search= ''): Reception[] {
    if(!search.trim()){
      return receptions
    }
    return receptions.filter( reception => { return reception.clientSurname.toLowerCase().includes(search.toLowerCase())})
  }

}
