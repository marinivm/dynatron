import { Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { NewCustomerComponent } from './pages/customer/new-customer/new-customer.component';

export const routes: Routes = [
    {
        path: 'customer/new',
        component: NewCustomerComponent,         
    },
    {
        path: 'customer',
        component: CustomerComponent,         
    },
    {
        path: '',
        component: CustomerComponent,         
    },
];
