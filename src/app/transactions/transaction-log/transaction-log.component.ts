import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../accounts/account.service';
import { Transaction } from '../transaction.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['slno', 'time', 'from_account_number', 'to_account_number', 'narration', 'amount'];
  dataSource = new MatTableDataSource<any>();
  
  transactions: any[] = [];
  table_data: any[] = [];
  private transactionData: Subscription;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
	 this.accountService.getLogs();
	 this.transactionData = this.accountService.requestLogs().subscribe((transactionsData: { transactions: Transaction[]}) => {
		 this.transactions = transactionsData.transactions;
		 
		 if(this.transactions.length > 0){
			 var temp = {};
			 var narr = " ";
			 
		 
			for (var i=0; i<this.transactions.length; i++){
			  if((this.transactions[i].hasOwnProperty('from_account_number')) & (this.transactions[i].hasOwnProperty('to_account_number'))){
					narr = "Funds Transfer";
				}else if (this.transactions[i].hasOwnProperty('to_account_number')){
					narr = "Credit Amount";
				}else{
					narr = "Debit Amount";
				}
			
			  temp= {
				  slno: i+1,
				  time: this.transactions[i].createdAt,
				  from_account_number: this.transactions[i].from_account_number,
				  to_account_number: this.transactions[i].to_account_number,
				  narration: narr,
				  amount: this.transactions[i].amount
			  }
			  this.table_data.push(temp);
			  temp = {};
		  }
		  this.dataSource.data = this.table_data;
		 }
	 });


}

ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

ngOnDestroy(){
	  if(this.transactionData){
		  this.transactionData.unsubscribe();
	  }
  }

}
