import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../../accounts/account.model';
import { Customer } from '../../customers/customer.model';
import { CustomerService } from '../../customers/customer.service';
import { AccountService } from '../../accounts/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit-account',
  templateUrl: './credit-account.component.html',
  styleUrls: ['./credit-account.component.scss']
})
export class CreditAccountComponent implements OnInit {
  customer: any = null;
  
  acc: any = null;
  
  credit_amount: number = null;
  
  credit_account_form: FormGroup;

  private accountDataSub: Subscription;
  private Acc: Subscription;
  
  constructor(private customerService: CustomerService, private accountService: AccountService) { }

  ngOnInit(): void {
	this.credit_account_form = new FormGroup({
      'account_number': new FormControl(null, [ Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
	  'account_holder': new FormControl({value: null, disabled: true}),
	  'amount': new FormControl(null)
    });
  }
  
  displayCustomer(val){
	  var key = "accountNumber";
	  var pair = parseInt(val);
	  this.acc = val;
	  this.customerService.getCustomerId(key, pair);
	  this.setAccountHolder();
  }
  
  setAccountHolder(){
	  this.Acc = this.customerService.requestedCustomer().subscribe((customer: any) => {
	  this.customer = customer.first_name + " " + customer.last_name;
	  });
	   this.credit_account_form.setValue({
			  'account_number': this.acc,
			  'account_holder': this.customer,
			  'amount': this.credit_amount
		  });
  }
  
  setAmount(val){
	  this.credit_amount = val;
  }
  
  
  onCreditFunds(){
	  if (this.credit_account_form.invalid) {
      return;
    }
    
    this.accountService.creditFunds(
	  this.credit_account_form.value.account_number,
	  this.credit_account_form.value.amount
    );
    this.credit_account_form.reset();
  }
  
  ngOnDestroy(){
	  if(this.Acc){
		  this.Acc.unsubscribe();
	  }
  }

}
