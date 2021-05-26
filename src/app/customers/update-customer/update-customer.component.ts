import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit, OnDestroy {
  id;
  customer;
  maxDate;
  age;
  dob;
  update_form: FormGroup;
  gender = [{ code: 0, sex: "Male"}, {code: 1, sex: "Female"}, {code: 2, sex: "Others"}];
  private customerDataSub: Subscription;
  
  constructor(private customerService: CustomerService, private router: Router) { }
  
  ngOnInit(): void {
	this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	this.update_form = new FormGroup({
      'first_name': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'last_name': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'email': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'birthdate': new FormControl(null),
	  'sex': new FormControl(null),
	  'phone': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'address': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'city': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'state': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
	  'country': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
    });
	
  }
  
  findCustomer(form: NgForm){
	  if (form.invalid) {
      return;
    }
	var key = form.value.find_value;
	var pair = form.value.val;
	this.customerService.getCustomerId(key, pair);
	this.setFormValues();
  }
  
  setFormValues(){
	  this.customerDataSub = this.customerService.requestedCustomer().subscribe((customer: any) => {
        this.customer = customer;
		this.id = this.customer._id;
		if (this.customer.sex === 0){
			var s = this.gender[0];
		} else if (this.customer.sex === 1) {
			var s = this.gender[1];
		} else {
			var s = this.gender[2];
		}
		console.log(s);
		this.update_form.setValue({
              'first_name': this.customer.first_name,
			  'last_name': this.customer.last_name,
			  'email': this.customer.email,
			  'birthdate': new Date(this.customer.dob),
			  'sex': s,
			  'phone': this.customer.phone,
			  'address': this.customer.address,
			  'city': this.customer.city,
			  'state': this.customer.state,
			  'country': this.customer.country
          });
      });
  }
  
  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }
  
  clearForm(){
	  this.update_form.reset();
  }
  
  onUpdateCustomer() {
	if (this.update_form.invalid) {
      return;
    }
    var diff_ms = Date.now() - this.update_form.value.birthdate.getTime();
    var age_dt = new Date(diff_ms);
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);
    this.customerService.updateCustomer(
	  this.id,
      this.update_form.value.first_name,
      this.update_form.value.last_name,
      this.update_form.value.email,
      this.update_form.value.birthdate,
      age,
      this.update_form.value.sex,
      this.update_form.value.phone,
      this.update_form.value.address,
      this.update_form.value.city,
      this.update_form.value.state,
      this.update_form.value.country
    );
    this.update_form.reset();
  }
  
  ngOnDestroy(){
	  if(this.customerDataSub){
		  this.customerDataSub.unsubscribe();
	  }
  }
}
