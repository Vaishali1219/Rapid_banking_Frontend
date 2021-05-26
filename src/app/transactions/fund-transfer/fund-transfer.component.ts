import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../../accounts/account.model';
import { Customer } from '../../customers/customer.model';
import { CustomerService } from '../../customers/customer.service';
import { AccountService } from '../../accounts/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {
  from_customer: any = null;
  to_customer: any = null;
  
  frm_acc: any = null;
  to_acc: any = null;
  
  transfer_amount: number = null;
  
  fund_transfer_form: FormGroup;

  private accountDataSub: Subscription;
  private fromAcc: Subscription;
  private toAcc: Subscription;
  
  constructor(private customerService: CustomerService, private accountService: AccountService) { }

  ngOnInit(): void {
	this.fund_transfer_form = new FormGroup({
      'from_account_number': new FormControl(null, [ Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
	  'from_account_holder': new FormControl({value: null, disabled: true}),
	  'to_account_number': new FormControl(null, [ Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
	  'to_account_holder': new FormControl({value: null, disabled: true}),
	  'amount': new FormControl(null)
    });
  }
  
  displayCustomer(val, c){
	  var key = "accountNumber";
	  var pair = parseInt(val);
	  if(c == 0){
		  this.frm_acc = val;
		  this.accountService.getFromCustomer(key, pair);
	  }else{
		  this.to_acc = val;
		  this.accountService.getToCustomer(key, pair);
	  }
	  
	  this.setAccountHolder(c);
  }
  
  setAccountHolder(c){
	  if (c == 0){
		  this.fromAcc = this.accountService.requestFromAccountHolder().subscribe((customer: any) => {
		  this.from_customer = customer.first_name + " " + customer.last_name;
	  });
	  }else{
		  this.toAcc = this.accountService.requestToAccountHolder().subscribe((customer: any) => {
		  this.to_customer = customer.first_name + " " + customer.last_name;
	  });
	  }
	   this.fund_transfer_form.setValue({
			  'from_account_number': this.frm_acc,
			  'from_account_holder': this.from_customer,
			  'to_account_number': this.to_acc,
			  'to_account_holder': this.to_customer,
			  'amount': this.transfer_amount
		  });
  }
  
  setAmount(val){
	  this.transfer_amount = val;
  }
  
  
  onTransferFunds(){
	  if (this.fund_transfer_form.invalid) {
      return;
    }
    
    this.accountService.transferFunds(
	  this.fund_transfer_form.value.from_account_number,
	  this.fund_transfer_form.value.to_account_number,
	  this.fund_transfer_form.value.amount
    );
    this.fund_transfer_form.reset();
  }
  
  ngOnDestroy(){
	  if(this.fromAcc){
		  this.fromAcc.unsubscribe();
	  }
	  
	  if(this.toAcc){
		  this.toAcc.unsubscribe();
	  }
  }

}
