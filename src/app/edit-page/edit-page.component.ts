import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ClientService} from '../shared/services/client.service';
import {switchMap} from 'rxjs/operators';
import {Client, Pet} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faCat, faDog, faDove, faMars, faOtter, faVenus} from '@fortawesome/free-solid-svg-icons';
import {PetService} from '../shared/services/pet.service';



@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  formClient: FormGroup;
  formPet: FormGroup;
  faCat = faCat;
  faDog = faDog;
  faBird = faDove;
  faOtter = faOtter;
  faMars = faMars;
  faVenus = faVenus;
  paramId: string
  client: Client
  pet:Pet
  message= ''
  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private petService: PetService) { }

  ngOnInit(): void {
    this.route.params.pipe
    (switchMap((params: Params) => {
      this.paramId = params['id']
      return this.clientService.getById(this.paramId);
    })).subscribe((client: Client) => {
      this.client=client
      if (client.name !== undefined){
      this.formClient = new FormGroup({
        clientName: new FormControl(client.name, Validators.required),
        clientSurname: new FormControl(client.surname, Validators.required),
        phone: new FormControl(client.phone, Validators.required),
        address: new FormControl(client.address, Validators.required)
      });}
      else {
        this.petService.getById(this.paramId).subscribe((pet: Pet) => {
          this.pet =pet
          this.formPet = new FormGroup({
            petName: new FormControl(pet.name, Validators.required ),
            petAge: new FormControl(pet.age, Validators.required),
            petWeight: new FormControl(pet.weight, Validators.required),
          });
        })
      }
    });
  }

  submit() {
    if (this.formClient){
      this.clientService.update({
        id:this.client.id,
        surname: this.formClient.value.clientSurname,
        name: this.formClient.value.clientName,
        phone: this.formClient.value.phone,
        address: this.formClient.value.address
      }).subscribe(()=> {
        this.message = 'Данные клиента успешно изменены'
      })
  }else
    {
    this.petService.update({
    id: this.pet.id,
    name: this.formPet.value.petName,
    age: this.formPet.value.petAge,
    weight: this.formPet.value.petWeight,
    gender: this.pet.gender,
    type: this.pet.type,
    idClient: this.pet.idClient}
    ).subscribe(()=>{
      this.message = 'Данные питомца успешно изменены'
    })
    }}
}
