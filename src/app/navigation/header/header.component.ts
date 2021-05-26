import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentChecked, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() title: string;

  account_number: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  
  findAccount(form: NgForm){
	this.account_number = form.value.account_number;
	//console.log(this.account_number);
	this.router.navigate(['accounts', this.account_number]);
  }
  
  resetForm(form: NgForm) {
    form.reset();
	window.location.reload();
  }

  ngOnChanges() {
    
  }
  

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    
  }

  ngOnDestroy() {
    
  }
}
