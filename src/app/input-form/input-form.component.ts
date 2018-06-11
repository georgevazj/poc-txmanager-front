import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { HyperledgerService } from '../hyperledger.service';
import { Request } from '../models';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  text = 'El contrato trabajara con las cantidades introducidas y se mostraran las transacciones en la pagina de inicio.'

  request: Request = {a:'', b:''}
  submitted = false;

  header = 'Request';

  constructor(private service: HyperledgerService) { }

  get diagnostic() {
    return JSON.stringify(this.request);
  }

  onSubmit() {
    this.submitted = true;
    console.log('REQUEST: ' + this.request);
    this.service.postTx(this.request).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

}
