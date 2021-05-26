import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { mimeType } from '../../shared/mime-type.validator';
import { ImageService } from '../../shared/image.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.scss']
})
export class ViewPhotoComponent implements OnInit {

  id;
  customer;
  isLoading: boolean = false;
  imagePreview: any = null;
  imageSource: any;
  private customerPhotoSub: Subscription;
  
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
	this.setCustomerPhoto();
  }
  
  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }
  
  setCustomerPhoto(){
	 this.customerPhotoSub = this.customerService.requestedCustomer().subscribe((customer: any) => {
     this.customer = customer;
     this.id = this.customer._id;
		
	 var image = this.customer.photo;
	 
	 if (image){
		 this.imagePreview = this.getImage(image);
	 }else{
		 this.imagePreview = null;
		 window.alert("No Photo");
	 }
     
  });
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }
  
  DeletePhoto(){
	  this.customerService.deleteCustomerPhoto(this.id);
  }
  
  clearImage(){
	  this.imagePreview = null;
	  window.location.reload();
  }
  
  ngOnDestroy(){
	  if(this.customerPhotoSub){
		  this.customerPhotoSub.unsubscribe();
	  }
  }
}
