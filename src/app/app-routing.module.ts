import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { GetAccountComponent } from './accounts/get-account/get-account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionLogComponent } from './transactions/transaction-log/transaction-log.component';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: WelcomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer_info', component: CustomerInfoComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/:account_number', component: GetAccountComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions-log', component: TransactionLogComponent },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
