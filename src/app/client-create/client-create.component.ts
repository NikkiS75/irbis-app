import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  isClientCreated = true;
  isPetCreated = true;
  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    if (this.isClientCreated) {
      this.form = new FormGroup({
          client: new FormControl(null)
        }
      );
    } else {
      this.form = new FormGroup(
        {
          name: new FormControl(null, Validators.required),
          surname: new FormControl(null, Validators.required),
          phone: new FormControl(null, Validators.required),
          address: new FormControl(null, Validators.required)
        });

    }

  }
}





