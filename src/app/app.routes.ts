import { Routes } from '@angular/router';
import { TransactionListComponent } from './Views/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './Views/transaction-details/transaction-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/transaction-list', pathMatch: 'full' },
    { path: 'transaction-list', component: TransactionListComponent },
    { path: 'transaction-details/:id', component: TransactionDetailsComponent }
];
