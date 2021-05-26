import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../customers/customer.service';
import { AccountService } from '../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  id;
  customer;
  account_addition_form: FormGroup;
  category = [{ cat_code: 0, cat_desc: "SB"}, {cat_code: 1, cat_desc: "CA"}];
  private customerDataSub: Subscription;
  
  constructor(private customerService: CustomerService, private accountService: AccountService) { }
  
  ngOnInit(): void {
	this.account_addition_form = new FormGroup({
      'customer_id': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'category': new FormControl(null),
	  'balance': new FormControl(null)
    });
	this.account_addition_form.controls['customer_id'].disable();
	this.account_addition_form.controls['category'].disable();
	this.account_addition_form.controls['balance'].disable();
  }
  
  findCustomer(form: NgForm){
	  if (form.invalid) {
      return;
    }
	var key = form.value.find_value;
	var pair = form.value.val;
	let searchData = {};
	searchData[key] = pair;
	this.customerService.getCustomerId(key, pair);
	this.setFormValues();
  }
  
  setFormValues(){
	  this.customerDataSub = this.customerService.requestedCustomer().subscribe((customer: any) => {
        this.customer = customer;
		this.id = this.customer._id;
	
		this.account_addition_form.controls['category'].enable();
	    this.account_addition_form.controls['balance'].enable();
		
		this.account_addition_form.setValue({
              'customer_id': this.customer._id,
			  'category': null,
			  'balance': null
          });
      });
  }
  
  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }
  
  onAddAccount() {
	if (this.account_addition_form.invalid) {
      return;
    }
	var cat = {
		code: this.account_addition_form.value.category,
		desc: this.category[this.account_addition_form.value.category].cat_desc
	}
	
    this.accountService.addAccount(
	  this.id,
      cat,
      parseInt(this.account_addition_form.value.balance)
    );
    this.account_addition_form.reset();
  }
  
  ngOnDestroy(){
	  if(this.customerDataSub){
		  this.customerDataSub.unsubscribe();
	  }
	  
  }

}
