import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { Subscription } from 'rxjs';
import { ImageService } from '../../shared/image.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  customers: Customer[] = [];
  isLoading: boolean = false;
  imagePreview: any;
  imageSource: any;
  private customersDataSub: Subscription;
  totalCustomers: number;
  customersPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  selected = null;
  selectedOption = "asc";
  customer: any;
  
  constructor(private customerService: CustomerService, private imageService: ImageService) { }

  ngOnInit(): void {
	
  }
  
  fetchCustomers(){
	this.customerService.getAllCustomers(this.customersPerPage, this.currentPage, this.selected, this.selectedOption);
	this.customersDataSub = this.customerService.getCustomers().subscribe((customerData: { customers: Customer[], customerCount: number }) => {
		this.isLoading = false;
        this.totalCustomers = customerData.customerCount;
        this.customers = customerData.customers;
	});
  }

  getLength() {
    return this.totalCustomers;
  }

  ngOnDestroy() {
	if(this.customersDataSub){
		this.customersDataSub.unsubscribe();
	}
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.customersPerPage = pageData.pageSize;
	this.customerService.getAllCustomers(this.customersPerPage, this.currentPage, this.selected, this.selectedOption);
  }

  onChange() {
	this.customerService.getAllCustomers(this.customersPerPage, this.currentPage, this.selected, this.selectedOption);
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }

}
