import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client, Diagnosis, Materials, Pet, Reception, Services} from '../shared/interfaces';
import {ClientService} from '../shared/services/client.service';
import {PetService} from '../shared/services/pet.service';
import {SettingsService} from '../shared/services/settings.service';
import {ReceptionService} from '../shared/services/reception.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {faCat, faMars, faMinus, faVenus} from '@fortawesome/free-solid-svg-icons';
import {faDog} from '@fortawesome/free-solid-svg-icons/faDog';
import {faDove} from '@fortawesome/free-solid-svg-icons/faDove';
import {faHorse} from '@fortawesome/free-solid-svg-icons/faHorse';
import {faOtter} from '@fortawesome/free-solid-svg-icons/faOtter';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  pets: Pet[];
  newPets: Pet[];
  clients: Client[];
  formExistClient: FormGroup;
  formPet: FormGroup;
  clientForm: FormGroup;
  isNewClient = false;
  isNewPet = false;
  clientsForCheck: Client[];
  newClientsForCheck: Client;
  receptionForm: FormGroup;
  allDiagnosis: Diagnosis[];
  allServices: Services[];
  allMaterials: Materials[];
  message = '';
  messageSuccess ='';
  public selectedClientSurname: string;
  public selectedPetName: string;
  faCat = faCat;
  faDog = faDog;
  faBird = faDove;
  faOtter = faOtter;
  faMars = faMars;
  faVenus = faVenus;
  faMinus = faMinus;



  constructor(private clientService: ClientService,
              private petService: PetService,
              private settingsService: SettingsService,
              private receptionService: ReceptionService) {
  }

  ngOnInit() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
    });

    this.settingsService.getAllDiagnosis().subscribe(diagnosis => {
      this.allDiagnosis = diagnosis;
    });

    this.settingsService.getAllServices().subscribe(services => {
      this.allServices = services;
    });

    this.settingsService.getAllMaterials().subscribe(materials => {
      this.allMaterials = materials;
    });


    this.formExistClient = new FormGroup({
        client: new FormControl('', Validators.required),
        pet: new FormControl('', Validators.required)
      }
    );
    console.log(this.formExistClient.controls);

    this.receptionForm = new FormGroup({
      symptoms: new FormControl('', Validators.required),
      diagnosis: new FormArray([], Validators.required),
      services: new FormArray([], Validators.required),
      materials: new FormArray([], Validators.required),
      appointment: new FormControl('', Validators.required)
    });


  }

  showPet($event) {
    this.selectedClientSurname = $event.target.options[$event.target.options.selectedIndex].text;
    this.selectedClientSurname = this.selectedClientSurname.replace(/[0-9]/g, '');
    console.log(this.selectedClientSurname)
    this.petService.getAll().subscribe(pets => {
      this.pets = pets;
      this.newPets = this.pets.filter(pets => pets.idClient === this.formExistClient.value.client);
    });

  }

  addPet() {
    this.isNewPet = true;
    this.formPet = new FormGroup({
      petName: new FormControl('', Validators.required),
      petAge: new FormControl('', Validators.required),
      petWeight: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required),
      petGender: new FormControl('', Validators.required)
    });

  }


  addNewClient() {
    this.isNewClient = true;
    this.clientForm = new FormGroup({
      clientName: new FormControl('', Validators.required),
      clientSurname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });

  }

  submit() {


    if (this.isNewClient == true) {
      console.log('1 ветка');
      if (this.clientForm.invalid) {
        return;
      }
      const client: Client = {
        surname: this.clientForm.value.clientSurname,
        name: this.clientForm.value.clientName,
        phone: this.clientForm.value.phone,
        address: this.clientForm.value.address
      };
      this.clientService.getAll().subscribe(clients => {

        this.clientsForCheck = clients;
        if (this.clientsForCheck.length != 0) {
          this.clientService.create(client).subscribe((response) => {

            const pet: Pet = {
              age: this.formPet.value.petAge,
              gender: this.formPet.value.petGender,
              name: this.formPet.value.petName,
              type: this.formPet.value.petType,
              weight: this.formPet.value.petWeight,
              idClient: response.id
            };
            this.petService.create(pet).subscribe((response) => {
              const reception: Reception = {
                date: new Date(),
                clientSurname: this.clientForm.value.clientSurname + ' ' + this.clientForm.value.clientName,
                petID: response.id,
                petName: this.formPet.value.petName,
                symptoms: this.receptionForm.value.symptoms,
                diagnosis: this.receptionForm.value.diagnosis,
                materials: this.receptionForm.value.materials,
                services: this.receptionForm.value.services,
                appointment: this.receptionForm.value.appointment
              };


              this.receptionService.createReception(reception).subscribe(() => {

                this.receptionForm.reset(), this.formPet.reset();
                this.clientForm.reset();
              });
            });
          });

        } else {
          this.newClientsForCheck = this.clientsForCheck.find(clientsForCheck =>
            clientsForCheck.surname == client.surname &&
            clientsForCheck.name == client.name &&
            clientsForCheck.phone == client.phone &&
            clientsForCheck.address === client.address
          );

          if (this.newClientsForCheck === undefined) {
            this.clientService.create(client).subscribe((response) => {

              const pet: Pet = {
                age: this.formPet.value.petAge,
                gender: this.formPet.value.petGender,
                name: this.formPet.value.petName,
                type: this.formPet.value.petType,
                weight: this.formPet.value.petWeight,
                idClient: response.id
              };
              this.petService.create(pet).subscribe((response) => {
                const reception: Reception = {
                  date: new Date(),
                  clientSurname: this.clientForm.value.clientSurname + ' ' + this.clientForm.value.clientName,
                  petID: response.id,
                  petName: this.formPet.value.petName,
                  symptoms: this.receptionForm.value.symptoms,
                  diagnosis: this.receptionForm.value.diagnosis,
                  materials: this.receptionForm.value.materials,
                  services: this.receptionForm.value.services,
                  appointment: this.receptionForm.value.appointment
                };


                this.receptionService.createReception(reception).subscribe(() => {

                  this.receptionForm.reset(), this.formPet.reset();
                  this.clientForm.reset();
                  this.messageSuccess = "Клиент успешно добавлен"
                  this.isNewClient = false
                });
              });
            });

          } else {
            return this.message = 'Клиент уже существует';
          }

        }

      });
    } else if (this.isNewPet == true) {
      console.log('2 ветка');
      const pet: Pet = {
        age: this.formPet.value.petAge,
        gender: this.formPet.value.petGender,
        name: this.formPet.value.petName,
        type: this.formPet.value.petType,
        weight: this.formPet.value.petWeight,
        idClient: this.formExistClient.value.client
      };

      this.petService.create(pet).subscribe(response => {

        const reception2: Reception = {
          date: new Date(),
          clientSurname: this.selectedClientSurname,
          petID: response.id,
          petName: this.formPet.value.petName,
          symptoms: this.receptionForm.value.symptoms,
          diagnosis: this.receptionForm.value.diagnosis,
          materials: this.receptionForm.value.materials,
          services: this.receptionForm.value.services,
          appointment: this.receptionForm.value.appointment
        };


        this.receptionService.createReception(reception2).subscribe(() => {

          this.receptionForm.reset(), this.formPet.reset();
          this.formExistClient.reset();
          this.messageSuccess = 'Питомец успешно создан'
        });
      });

    } else {
      console.log('3 ветка');
      const reception3: Reception = {
        date: new Date(),
        clientSurname: this.selectedClientSurname,
        petID: this.formExistClient.value.pet,
        petName: this.selectedPetName,
        symptoms: this.receptionForm.value.symptoms,
        diagnosis: this.receptionForm.value.diagnosis,
        materials: this.receptionForm.value.materials,
        services: this.receptionForm.value.services,
        appointment: this.receptionForm.value.appointment
      };


      this.receptionService.createReception(reception3).subscribe(() => {

        this.receptionForm.reset(),
          this.formExistClient.reset();
        this.messageSuccess = "Запись приема успшено создана"
        this.isNewPet = false;
      });

    }


  }


  addDiagnosis() {
    const control = new FormControl('', Validators.required);
    (this.receptionForm.get('diagnosis') as FormArray).push(control);


  }

  addMaterials() {
    const control = new FormControl('', Validators.required);
    (this.receptionForm.get('materials') as FormArray).push(control);


  }


  addServices() {

    const control = new FormControl('', Validators.required);
    (this.receptionForm.get('services') as FormArray).push(control);
  }

  clientFormFalse() {
    this.isNewClient = false;
    this.isNewPet = false;
  }


  petFormFalse() {
    this.isNewPet = false;
  }

  selectedPet($event) {
    this.selectedPetName = $event.target.options[$event.target.options.selectedIndex].text


  }

  removeDiagnosis(i) {
    (this.receptionForm.get('diagnosis') as FormArray).removeAt(i);
  }

  removeMaterial(i) {
    (this.receptionForm.get('materials') as FormArray).removeAt(i);
  }

  removeService(i) {
    (this.receptionForm.get('services') as FormArray).removeAt(i);
  }

}






