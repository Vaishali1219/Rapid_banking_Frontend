
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SearchCustomerComponent } from './customers/search-customer/search-customer.component';
import { AllCustomersComponent } from './customers/all-customers/all-customers.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';
import { LinkPhotoComponent } from './customers/link-photo/link-photo.component';
import { ViewPhotoComponent } from './customers/view-photo/view-photo.component';
import { FindAccountComponent } from './accounts/find-account/find-account.component';
import { FundTransferComponent } from './transactions/fund-transfer/fund-transfer.component';
import { StatementEnquiryComponent } from './transactions/statement-enquiry/statement-enquiry.component';
import { GetAccountStatementComponent } from './transactions/get-account-statement/get-account-statement.component';
import { AddAccountComponent } from './accounts/add-account/add-account.component';

import { MatTabsModule } from '@angular/material/tabs';
import { CreditAccountComponent } from './transactions/credit-account/credit-account.component';
import { DebitAccountComponent } from './transactions/debit-account/debit-account.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionLogComponent } from './transactions/transaction-log/transaction-log.component';
import { GetAccountComponent } from './accounts/get-account/get-account.component';
import { ExcelService } from './excel.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent,
    CustomersComponent,
    AccountsComponent,
    TransactionsComponent,
    SearchCustomerComponent,
    AllCustomersComponent,
    CustomerDetailComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    CustomerInfoComponent,
    LinkPhotoComponent,
    ViewPhotoComponent,
    FindAccountComponent,
    FundTransferComponent,
    StatementEnquiryComponent,
    GetAccountStatementComponent,
    AddAccountComponent,
    CreditAccountComponent,
    DebitAccountComponent,
    TransactionLogComponent,
    GetAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
	AppRoutingModule,
    NgxPaginationModule,
    MaterialModule,
	SharedModule,
	MatTabsModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
