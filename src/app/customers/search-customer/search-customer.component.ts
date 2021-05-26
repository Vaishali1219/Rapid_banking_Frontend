import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mimeType } from '../../shared/mime-type.validator';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {
  id;
  customer = null;
  isLoading: boolean = false;
  customerDataSub: Subscription;
  imagePreview: any = null;
  imageSource: any;
  cardImage: any = null;
  constructor(private customerService: CustomerService, private imageService: ImageService) { }
  
  ngOnInit(): void {
	
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
	this.getCustomer();
  }
  
  getCustomer(){
	  this.customerDataSub = this.customerService.requestedCustomer().subscribe((customer: any) => {
        this.customer = customer;
		this.id = this.customer._id;
		this.imagePreview = this.getImage(this.customer.photo);
		this.cardImage = this.imagePreview.changingThisBreaksApplicationSecurity
  });
  }
  
  resetForm(form: NgForm) {
	this.customer = null;
	this.imagePreview = null;
	this.cardImage = null;
    form.reset();
	window.location.reload();
  }
  
  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }
  
  onDeleteCustomer(){
	  this.customerService.deleteCustomer(this.id);
  }
  
  ngOnDestroy(){
	  if(this.customerDataSub){
		  this.customerDataSub.unsubscribe();
	  }
  }
}
