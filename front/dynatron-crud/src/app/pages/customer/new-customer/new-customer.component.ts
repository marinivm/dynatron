import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../../shared/services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { CustomerModel } from '../../../shared/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class NewCustomerComponent implements OnInit {

  //#region Declarations
  isFormValid: boolean = false;
  customer: CustomerModel = new CustomerModel();
  //#endregion

  constructor(protected service: CustomerService, protected router: Router) { }

  ngOnInit() {
  }

  //#region UserEvents
  OnSaveClick() {
    this.Save();
  }

  OnCleanClick() {
    this.CleanForm();
  }

  OnFieldInput() {
    this.ValidateForm();
  }
  //#endregion

  //#region Data
  Save() {
    this.service.Create(this.customer).subscribe({
      next: (data: number) => {
        if(data == 0){
          alert('Customer already exists');
        }else{
          sessionStorage.setItem('lastcreated', data.toString());
          this.router.navigate(['customer']);
        }        
      },
      error: err => {
        alert('Something went wrong. Try again later or contact support.');
      }
    });
  }
  //#endregion

  //#region Functions
  ValidateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.isFormValid = (this.customer.firstName.trim().length >= 3
      && this.customer.lastName.trim().length >= 3
      && emailRegex.test(this.customer.email));

  }

  CleanForm() {
    this.customer = new CustomerModel();
  }
  //#endregion

}
