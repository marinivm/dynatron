import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerModel } from '../../shared/models/customer.model';
import { MatRow, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../shared/services/customer.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatIcon,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerComponent implements OnInit {

  constructor(protected service: CustomerService, protected router: Router, protected cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.GetCustomers();
    this.GetSessionData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); 
  }

  //#region Declarations

  searchTerm: string = '';
  columns: string[] = ['id', 'firstName', 'lastName', 'email', 'control'];
  pagesize: number = 10;

  listCustomers: CustomerModel[] = [];
  filteredCustomers: CustomerModel[] = [];

  dataSource = new MatTableDataSource<CustomerModel>([]);
  dataSource2: CustomerModel[] = [];
  lastCreated: number = 0;
  lastUpdated: number = 0;

  editId: number = 0;
  editCustomer: CustomerModel = new CustomerModel();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //#endregion

  //#region UserEvents
  OnFilterKeyUp() {
    console.log('up')
    this.FilterList();
  }

  OnCleanFilterClick() {
    this.CleanFilter();
  }

  OnAddCustomerClick() {
    this.router.navigate(['customer/new']);
  }

  OnEditClick(id: number) {
    this.editId = id;
    this.SetEditCustomer();
  }

  OnCancelEditClick() {
    this.editId = 0;
    this.SetEditCustomer();
  }

  OnSaveEditClick() {
    this.Save();
  }
  //#endregion

  //#region Functions
  GetSessionData() {
    var lastCreatedId = sessionStorage.getItem('lastcreated');
    if (lastCreatedId != null) this.lastCreated = Number(lastCreatedId);

    var lastUpdatedId = sessionStorage.getItem('lastupdated');
    if (lastUpdatedId != null) this.lastUpdated = Number(lastUpdatedId);
  }

  SetDataSource() {
    this.dataSource.data = this.filteredCustomers;
  }

  CleanFilter() {
    this.searchTerm = '';
    this.FilterList();
  }

  FilterList() {
    console.log(this.searchTerm);
    if (this.searchTerm == '') {
      console.log(1);
      this.filteredCustomers = this.listCustomers;
    }
    else {
      console.log(this.listCustomers);
      this.filteredCustomers = this.listCustomers.filter(x =>
        x.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        || x.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || x.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.SetDataSource();
  }

  SetEditCustomer() {
    if (this.editId == 0) this.editCustomer = new CustomerModel();
    else {
      var item = this.listCustomers.find(x => x.id == this.editId) as CustomerModel;
      this.editCustomer.id = item.id;
      this.editCustomer.firstName = item.firstName;
      this.editCustomer.lastName = item.lastName;
      this.editCustomer.email = item.email;
    }
  }

  UpdateCustomer() {
    console.log('update');
    sessionStorage.setItem('lastupdated', this.editCustomer.id.toString());
    var item = this.listCustomers.find(x => x.id == this.editId) as CustomerModel;
    
    item.lastUpdate = this.editCustomer.lastUpdate;
    item.firstName = this.editCustomer.firstName;
    item.lastName = this.editCustomer.lastName;
    item.email = this.editCustomer.email;
    
    this.editId = 0;
    this.SetEditCustomer();
    this.GetSessionData();
  }

  //#endregion

  //#region Data
  GetCustomers() {
    this.service.List().subscribe({
      next: (data: CustomerModel[]) => {
        this.listCustomers = data;
        this.filteredCustomers = this.listCustomers;
        this.SetDataSource();
      }
    })
  }

  Save() {
    this.service.Update(this.editCustomer).subscribe({
      next: () => {
        console.log('atualizou');
        
        this.UpdateCustomer();
      },
      error: err => {
        alert('Something went wrong. Try again later or contact support.');
      }
    });
  }
  //#endregion
}
