import { Injectable } from '@angular/core';
import { Account } from './account.model';
import { Customer } from '../customers/customer.model';
import { Transaction } from '../transactions/transaction.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UiService } from '../ui.service';

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
	
  accountInfoRequested = new Subject<{account: Account, customer: Customer}>();
  fromAccountCustomer = new Subject<{customer: Customer}>();
  toAccountCustomer = new Subject<{customer: Customer}>();
  transactionLogsRequested = new Subject<{ transactions: Transaction[] }>();
  
  logs: Transaction[] = [];
  
  account: Account;
  customer: Customer;
  id: any;

  constructor(private http: HttpClient, private router: Router, private uiService: UiService) { }
  
  requestedAccount() {
    return this.accountInfoRequested.asObservable();
  }
  
  requestFromAccountHolder(){
	  return this.fromAccountCustomer.asObservable();
  }
  
  requestToAccountHolder(){
	  return this.toAccountCustomer.asObservable();
  }
  
  requestLogs(){
	  return this.transactionLogsRequested.asObservable();
  }
  
  addAccount(id: string, category: any, balance: number) {
    const accountData = {
		category: category,
		balance: balance
	}
	
    this.http.post<{ msg: string, account_number: number, account_balance: number, account_type: string }>(BACKEND_URL + "create-account/" + id, accountData).subscribe(responseData => {
      var accountDetails = {
		  msg: responseData.msg,
		  account_number: responseData.account_number,
		  account_balance: responseData.account_balance,
		  account_type: responseData.account_type
	  };
	  this.uiService.openSnackBar(accountDetails.msg, null);
	  //window.alert(accountDetails.msg);
	  window.location.reload();
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
		window.location.reload();
    });
  }
  
  getAccount(accountNumber: string){
	let params = new HttpParams().set("accountNumber", accountNumber);
   this.http.get<{ account: Account, customer: Customer }>(BACKEND_URL + "account", {'params': params}).subscribe(res => {
	   this.accountInfoRequested.next({account: res.account, customer: res.customer});
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
		this.router.navigate(['home']);
    });
  }
  
  getLogs(){
	  this.http.get<{ transactions: any }>(BACKEND_URL + "transaction-logs").subscribe(res => {
	  this.logs = res.transactions;
	  this.transactionLogsRequested.next({ transactions: [...this.logs]});
    }, error => {
		this.uiService.openSnackBar(error.error, null);
		//window.alert(error.error);
       this.router.navigate(['home']);
    });
  }
  
  deleteAccount(accountNumber: string){
	let params = new HttpParams().set("accountNumber", accountNumber);
   this.http.delete<{ msg: string }>(BACKEND_URL + "delete-account", {'params': params}).subscribe(res => {
	   this.uiService.openSnackBar(res.msg, null);
	   //window.alert(res.msg);
	   window.location.reload();
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
		window.location.reload();
    });
  }
  
  getFromCustomer(key: string, val: any) {
  let params = new HttpParams().set(key, val);
   this.http.get<{ id: any, customer: any }>(BACKEND_URL + "get-customer", {'params': params}).subscribe(res => {
	  this.fromAccountCustomer.next(res.customer);
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
		window.location.reload();
    });
  }
  
  getToCustomer(key: string, val: any) {
  let params = new HttpParams().set(key, val);
   this.http.get<{ id: any, customer: any }>(BACKEND_URL + "get-customer", {'params': params}).subscribe(res => {
	  this.toAccountCustomer.next(res.customer);
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
		window.location.reload();
    });
  }
  
  transferFunds(ac1: number, ac2: number, amount: number){
	  const fundTransferData = {
		ac1: ac1,
		ac2: ac2,
		amount: amount
	}
	
    this.http.patch<{ msg: string }>(BACKEND_URL + "fund-transfer", fundTransferData).subscribe(responseData => {
	  this.uiService.openSnackBar(responseData.msg, null);
	  //window.alert(responseData.msg);
	  window.location.reload();
    }, error => {
		this.uiService.openSnackBar(error.error.msg, null);
		//window.alert(error.error.msg);
		window.location.reload();
    });
  }
  
  creditFunds(ac: number, amount: number){
	  const creditData = {
		ac: ac,
		amount: amount
	}
	
    this.http.patch<{ msg: string }>(BACKEND_URL + "credit-amount", creditData).subscribe(responseData => {
	  this.uiService.openSnackBar(responseData.msg, null);
	  //window.alert(responseData.msg);
	  window.location.reload();
    }, error => {
		this.uiService.openSnackBar(error.error.msg, null);
		//window.alert(error.error.msg);
		window.location.reload();
    });
  }
  
  debitFunds(ac: number, amount: number){
	  const debitData = {
		ac: ac,
		amount: amount
	}
	
    this.http.patch<{ msg: string }>(BACKEND_URL + "debit-amount", debitData).subscribe(responseData => {
	  this.uiService.openSnackBar(responseData.msg, null);
	  //window.alert(responseData.msg);
	  window.location.reload();
    }, error => {
		this.uiService.openSnackBar(error.error.msg, null);
		//window.alert(error.error.msg);
		window.location.reload();
    });
  }
  
  
}
