import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ClientService} from '../shared/services/client.service';
import {switchMap} from 'rxjs/operators';
import {Client, Pet, Reception} from '../shared/interfaces';
import {PetService} from '../shared/services/pet.service';
import {ReceptionService} from '../shared/services/reception.service';
import {faDove} from '@fortawesome/free-solid-svg-icons/faDove';
import {
  faCat,
  faDog,
  faMars,
  faVenus,
  faCalendar,
  faCommentMedical, faPlus, faPen
} from '@fortawesome/free-solid-svg-icons';
import {faOtter} from '@fortawesome/free-solid-svg-icons/faOtter';
import {faSyringe} from '@fortawesome/free-solid-svg-icons/faSyringe';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {formatDate} from '@angular/common';



@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  gotClient: Client;
  pets: Pet[];
  newPets: Pet[];
  receptions: Reception[];
  newReceptions: Reception[];
  selectedReception: Reception;
  selectedPet: string;
  foundPet: Pet;
  faCat = faCat;
  faDog = faDog;
  faBird = faDove;
  faOtter = faOtter;
  faMars = faMars;
  faVenus = faVenus;
  faClock = faCalendar;
  idx = '';
  show = false;
  faCommentMedical = faCommentMedical;
  faPlus = faPlus;
  faSyringe = faSyringe;
  message = '';
  faPen = faPen;

  constructor(private route: ActivatedRoute,
              private clientService: ClientService, private petService: PetService, private receptionService: ReceptionService) {
  }

  ngOnInit(): void {
    this.route.params.pipe
    (switchMap((params: Params) => {
      return this.clientService.getById(params['id']);
    })).subscribe((client: Client) => {
      this.gotClient = client;
      this.petService.getAll().subscribe(pets => {
        this.pets = pets;
        this.newPets = this.pets.filter(pets => pets.idClient === this.gotClient.id);
      });
    });
  }
  selectPet($event) {
    this.selectedPet = $event.target.id;
    this.foundPet = this.newPets.find(pet => pet.name == this.selectedPet.trim());
    this.receptionService.getAllReception().subscribe(receptions => {
      this.receptions = receptions;
      this.newReceptions = this.receptions.filter(receptions => receptions.petID == this.foundPet.id);
      if (this.newReceptions.length == undefined || this.newReceptions.length ==0){
        this.message='Приемов не найдено'
      }else
        {
        this.message =''
      }
    });
  }

  toggler($event) {
    this.show = !this.show;
    this.idx = $event.target.id;
    if (this.show == true&&this.idx) {
      document.getElementById(this.idx + '_toggle').className = 'displayBlock';
    } else {
      document.getElementById(this.idx + '_toggle').className = 'displayNone';
    }
    this.selectedReception = this.newReceptions.find(reception => reception.id == $event.target.id.trim());
  }

  savePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const documentDefinition = {
      content: [{
        text: 'Прием ' + formatDate(this.selectedReception.date, 'dd.MM.yyyy HH:mm', 'ru'),
        bold: true,
        fontSize: 20,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
        {text: 'Клиент ',
        bold: true,
        fontSize: 18,
        margin: [0, 10, 0, 20]
        },
        {
          columns: [[{
            text: 'Ф.И.: '+this.gotClient.surname + ' ' + this.gotClient.name},
            {text: 'Телефон: +7' + this.gotClient.phone},
            {text: 'Адрес: ' + this.gotClient.address}]
          ]
        }, {
          text: 'Питомец',
          bold: true,
          fontSize: 18,
          margin: [0, 20, 0, 20]
        },
        {
          columns: [[{
            text: 'Кличка: ' + this.foundPet.name
          },
            {text: 'Вид: ' + this.foundPet.type},
            {text: 'Пол: ' + this.foundPet.gender},
            {text: 'Возраст: ' + this.foundPet.age},
            {text: 'Вес: ' + this.foundPet.weight,
            },
          ]]
        },
        {
          columns: [[{
            text: 'Симптомы: '+ this.selectedReception.symptoms,

            margin: [0, 20, 0, 20]
          },
            {text: 'Диагнозы: ' + this.selectedReception.diagnosis,

              margin: [0, 20, 0, 20] },
            {
              text:'Назначения: ' + this.selectedReception.appointment,

              margin: [0, 20, 0, 20]
            }
          ]]
        },
        {
          text: 'Использованные материалы: ' +this.selectedReception.materials,

          margin: [0, 20, 0, 10]
        },
        {
            text: 'Оказанные услуги: ' +this.selectedReception.services,

          margin: [0, 10, 0, 0]
        },
        {text: 'Подпись врача ________________',
          margin: [0,150, 0, 0]
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).download(this.gotClient.surname + ' '
      +this.gotClient.name+' '
      + formatDate(this.selectedReception.date, 'dd.MM.yyyy HH.mm', 'ru')
      +".pdf");
  }
}
