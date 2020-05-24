import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../shared/services/client.service';
import {Client, Pet, Reception} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {PetService} from '../shared/services/pet.service';
import {ReceptionService} from '../shared/services/reception.service';
import {find} from 'rxjs/operators';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {all} from 'codelyzer/util/function';
import {faCoffee} from '@fortawesome/free-solid-svg-icons/faCoffee';
import {faCommentMedical} from '@fortawesome/free-solid-svg-icons/faCommentMedical';
import {faSyringe} from '@fortawesome/free-solid-svg-icons/faSyringe';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';


@Component({
  selector: 'app-reception-page',
  templateUrl: './reception-page.component.html',
  styleUrls: ['./reception-page.component.scss']
})
export class ReceptionPageComponent implements OnInit, OnDestroy {

  clients: Client[];
  pSub: Subscription;
  allReceptions: Reception[];
  todayReceptions: Reception[];
  message = ''
  faCommentMedical = faCommentMedical;
  faSyringe=faSyringe;
  faPlus = faPlus;
  show = false
  idx: string;
  search = '';


  constructor(private petService: PetService, private receptionService: ReceptionService) {
  }

  ngOnInit() {

    this.receptionService.getAllReception().subscribe(receptions => {
      this.allReceptions = receptions;
      this.todayReceptions = this.allReceptions.filter(receptions => receptions.date.getDate() == new Date().getDate())
      if (this.todayReceptions.length == 0){
        this.message = 'Приемов нет'
      }else{
        this.message =''
      }

    });



  }


  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  onDateSelect($event: NgbDate) {


      this.todayReceptions = this.allReceptions.filter(receptions => receptions.date.getDate() == $event.day)
    if (this.todayReceptions.length == 0){
      this.message = 'Приемов нет'
    }else{
      this.message =''
    }

  }

  toggler($event) {
    this.show = !this.show;
    this.idx = $event.target.id;
    if (this.show == true&&this.idx) {

      document.getElementById(this.idx + '_toggle').className = 'displayBlock';
    } else {
      document.getElementById(this.idx + '_toggle').className = 'displayNone';
    }

  }
}
