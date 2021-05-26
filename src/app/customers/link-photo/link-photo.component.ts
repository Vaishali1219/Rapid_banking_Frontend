import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { mimeType } from '../../shared/mime-type.validator';
import { ImageService } from '../../shared/image.service';
import { CustomerService } from '../customer.service';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-link-photo',
  templateUrl: './link-photo.component.html',
  styleUrls: ['./link-photo.component.scss']
})
export class LinkPhotoComponent implements OnInit {

  id;
  customer;
  imagePreview: any = null;
  imageSource: any;
  form: FormGroup;
  private customerPhotoSub: Subscription;
  
  constructor(private customerService: CustomerService, private imageService: ImageService, private uiService: UiService) { }

  ngOnInit(): void {
	this.form = new FormGroup({
      'photo': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
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
	 
	 if(customer.photo){
		 var image = this.customer.photo;
		 this.imagePreview = this.getImage(image);
	 }else{
		 this.imagePreview = null;
		 this.uiService.openSnackBar("No Photo Available Please Upload", null);
		 //window.alert("No Photo Available Please Upload");
	 }
	
  });
  }
  
  onUpdatePhoto(){
    this.customerService.updateCustomerPhoto(this.id, this.form.value.photo);
	this.form.reset();
	this.imagePreview = null;
  }
  
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ photo: file });
    this.form.get('photo').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }
  
  ngOnDestroy(){
	  if(this.customerPhotoSub){
		  this.customerPhotoSub.unsubscribe();
	  }
  }
}
