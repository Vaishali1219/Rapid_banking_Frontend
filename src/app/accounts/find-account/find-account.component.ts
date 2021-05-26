import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../account.model';
import { Customer } from '../../customers/customer.model';
import { CustomerService } from '../../customers/customer.service';
import { AccountService } from '../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-account',
  templateUrl: './find-account.component.html',
  styleUrls: ['./find-account.component.scss']
})
export class FindAccountComponent implements OnInit, OnDestroy {
  
  cust: any;
  acc: any;
  account_number: string;
  account_detail_form: FormGroup;
  private accountDataSub: Subscription;
  
  constructor(private customerService: CustomerService, private accountService: AccountService) { }

  ngOnInit(): void {
	this.account_detail_form = new FormGroup({
      'name': new FormControl({value:null, disabled: true}),
	  'account_number': new FormControl({value:null, disabled: true}),
	  'account_category': new FormControl({value:null, disabled: true}),
	  'balance': new FormControl({value:null, disabled: true}),
	  'phone': new FormControl({value:null, disabled: true}),
	  'address': new FormControl({value:null, disabled: true}),
	  'city': new FormControl({value:null, disabled: true}),
	  'state': new FormControl({value:null, disabled: true}),
	  'country': new FormControl({value:null, disabled: true}),
	  'created': new FormControl({value:null, disabled: true})
    });
  }
  
  findAccount(form: NgForm){
	   if (form.invalid) {
      return;
    }
	this.account_number = form.value.account_number;
	this.accountService.getAccount(this.account_number.toString());
	this.setFormValues();
  }
  
  setFormValues(){
	  this.accountDataSub = this.accountService.requestedAccount().subscribe((data: {account: Account, customer: Customer}) => {
        this.cust = data.customer;
		this.acc = data.account;
		var name = this.cust.first_name + " " + this.cust.last_name;
		var created = new Date(this.acc.createdAt).toString().replace(/T.*/,'').split('-').reverse().join('-');
		this.account_detail_form.setValue({
			  'name': name,
			  'account_number': this.acc.accountNumber,
			  'account_category': this.acc.category.cat_desc,
			  'balance': this.acc.balance,
			  'phone': this.cust.phone,
			  'address': this.cust.address,
			  'city': this.cust.city,
			  'state': this.cust.state,
			  'country': this.cust.country,
			  'created': created
          });
	  });
  }
  
  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }
  
  onDeleteAccount(){
	  this.accountService.deleteAccount(this.acc.accountNumber);
  }
  
  ngOnDestroy(){
	  if(this.accountDataSub){
		 this.accountDataSub.unsubscribe();
	  }
  }
}
