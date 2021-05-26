import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  maxDate;
  age;
  dob;
  isLoading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
	this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  
  findCustomer(form: NgForm){}
  
  resetForm(form: NgForm) {
    form.reset();
  }
  
  onUpdateCustomer(form: NgForm) {}

}
