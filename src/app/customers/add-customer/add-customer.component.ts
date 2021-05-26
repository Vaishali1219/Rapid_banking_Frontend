import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  maxDate;
  age;
  dob;
  isLoading: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onAddCustomer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    var diff_ms = Date.now() - form.value.birthdate.getTime();
    var age_dt = new Date(diff_ms);
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);

    this.customerService.createCustomer(
      form.value.first_name,
      form.value.last_name,
      form.value.email,
      form.value.birthdate,
      age,
      form.value.sex,
      form.value.phone,
      form.value.address,
      form.value.city,
      form.value.state,
      form.value.country
    );
    form.reset();
  }
  
  clearForm(form: NgForm){
	  form.reset();
  }

  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }
}
