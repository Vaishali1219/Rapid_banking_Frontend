import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../../accounts/account.model';
import { Customer } from '../../customers/customer.model';
import { CustomerService } from '../../customers/customer.service';
import { AccountService } from '../../accounts/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-statement-enquiry',
  templateUrl: './statement-enquiry.component.html',
  styleUrls: ['./statement-enquiry.component.scss']
})
export class StatementEnquiryComponent implements OnInit, OnDestroy {
  
  displayedColumns: string[] = ['slno', 'time', 'narration', 'credit', 'debit', 'balance'];
  dataSource = new MatTableDataSource<any>();
  
  transactions: any;
  accountDetailsObtained: Boolean = false;
  account: any;
  customer: any;
  account_number: any;
  table_data: any[] = [];
  account_detail_form: FormGroup;
  private accData: Subscription;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private customerService: CustomerService, private accountService: AccountService) { }

  ngOnInit(): void {
	  this.account_detail_form = new FormGroup({
      'name': new FormControl({value:null, disabled: true}),
	  'account_number': new FormControl({value:null, disabled: true}),
	  'account_category': new FormControl({value:null, disabled: true}),
	  'balance': new FormControl({value:null, disabled: true})
	  })
  }
  
  findAccount(form: NgForm){
	   if (form.invalid) {
      return;
    }
	this.account_number = form.value.account_number;
	this.accountService.getAccount(this.account_number.toString());
	this.getAccountDetails();
  }
  
  getAccountDetails(){
	  this.accData = this.accountService.requestedAccount().subscribe((data: {account: any, customer: any}) => {
        this.account = data.account;
		this.customer = data.customer;
		this.accountDetailsObtained = true;
		var name = this.customer.first_name + " " + this.customer.last_name;

		this.account_detail_form.setValue({
			  'name': name,
			  'account_number': this.account.accountNumber,
			  'account_category': this.account.category.cat_desc,
			  'balance': this.account.balance
		});
		
		  
		  this.transactions = this.account.transactions;
		  //this.transactions.reverse();
		  this.table_data = [];
		  var temp = {};
		  var cr = "";
		  var dr = "";
		
		  for (var i=0; i<this.transactions.length; i++){
			  if(this.transactions[i].transType == 0){
				  cr = " ";
				  dr = this.transactions[i].amount;
			  } else{
				  cr = this.transactions[i].amount;
				  dr = " ";
			  }
			  temp= {
				  slno: i+1,
				  time: this.transactions[i].time,
				  narration: "Funds Transfer",
				  credit: cr,
				  debit: dr,
				  balance: this.transactions[i].balanceAfter
			  }
			  this.table_data.push(temp);
			  temp = {};
		  }
		  this.dataSource.data = this.table_data;
	  });
  }
  
  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  ngOnDestroy(){
	  if(this.accData){
		  this.accData.unsubscribe();
	  }
  }
}
