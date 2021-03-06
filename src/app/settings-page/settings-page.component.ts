import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Diagnosis, Materials, Services} from '../shared/interfaces';
import {SettingsService} from '../shared/services/settings.service';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  active = 1;
  diagnosisForm: FormGroup
  materialForm: FormGroup
  serviceForm: FormGroup
  allDiagnosis: Diagnosis[]
  allMaterials: Materials[]
  allServices: Services[];
  faMinus = faMinus;


  constructor( private settingsService: SettingsService) { }

  ngOnInit(): void {

    this.settingsService.getAllDiagnosis().subscribe(diagnosis =>{
      this.allDiagnosis = diagnosis
    })
    this.settingsService.getAllMaterials().subscribe(materials =>{
      this.allMaterials = materials
    })
    this.settingsService.getAllServices().subscribe(services =>{
      this.allServices = services
    })


    this.diagnosisForm = new FormGroup({
      diagnosisTitle: new FormControl('', Validators.required)
    })
    this.materialForm = new FormGroup({
      materialTitle: new FormControl('', Validators.required)
    })
    this.serviceForm = new FormGroup({
      serviceTitle: new FormControl('', Validators.required)
    })
  }


  diagnosisSubmit() {
    const diagnosis: Diagnosis = {
      title:this.diagnosisForm.value.diagnosisTitle
    }
    this.settingsService.createDiagnosis(diagnosis).subscribe(()=>{
      this.diagnosisForm.reset()
      this.settingsService.getAllDiagnosis().subscribe(diagnosis =>{
        this.allDiagnosis = diagnosis
      })
    })
  }

  materialSubmit() {
    const material: Materials = {
      title:this.materialForm.value.materialTitle
    }
    this.settingsService.createMaterial(material).subscribe(()=>{
      this.materialForm.reset()
      this.settingsService.getAllMaterials().subscribe(materials =>{
        this.allMaterials = materials
      })
    })
  }

  servicesSubmit() {
    const service: Services = {
      title:this.serviceForm.value.serviceTitle
    }
    this.settingsService.createService(service).subscribe(()=>{
      this.serviceForm.reset()
      this.settingsService.getAllServices().subscribe(services =>{
        this.allServices = services
      })
    })
  }


  removeDiagnosis(id:string) {
    this.settingsService.removeDiagnosis(id).subscribe(()=>{
      this.allDiagnosis = this.allDiagnosis.filter(diagnosis => diagnosis.id !== id)
    })
  }

  removeMaterial(id:string) {
    this.settingsService.removeMaterials(id).subscribe(()=>{
      this.allMaterials = this.allMaterials.filter(material => material.id !== id)
    })
  }

  removeService(id: string) {
    this.settingsService.removeServices(id).subscribe(()=>{
      this.allServices = this.allServices.filter(service => service.id !== id)
    })
  }
}
