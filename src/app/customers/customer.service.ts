import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from './customer.model';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UiService } from '../ui.service';

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  customerInfoRequested = new Subject<{customer: Customer}>();
  customersListInfo = new Subject<{ customers: Customer[], customerCount: number }>();
  customerPhotoUpdated = new Subject<any>();
  
  private allCustomers: Customer[] = [];
  private TotalCustomers: number;
  
  customer: Customer;
  id: any;
  
  //constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  constructor(private http: HttpClient, private uiService: UiService) {}
  
  requestedCustomer() {
    return this.customerInfoRequested.asObservable();
  }
  
  getCustomers(){
	  return this.customersListInfo.asObservable();
  }

  createCustomer(first_name: string, last_name: string, email: string, dob: Date, age: number, sex: number, phone: string, address: string, city: string, state: string, country: string) {
    const customerData: any = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      dob: dob,
      age: age,
      sex: sex,
      phone: phone,
      address: address,
      city: city,
      state: state,
      country: country
    }

    this.http.post<{ msg: string, customer: any }>(BACKEND_URL + "register", customerData).subscribe(response => {
      
      const customer = {
          id: response.customer._id,
          first_name: response.customer.first_name,
          last_name: response.customer.last_name,
          email: response.customer.email,
          phone: response.customer.phone,
          address: response.customer.address,
          city: response.customer.city,
          state: response.customer.state,
          country: response.customer.country,
          photo: response.customer.photo,
          accounts: response.customer.accounts
      }
      //window.alert(response.msg);
	  this.uiService.openSnackBar(response.msg, null);
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
        window.location.reload();  
      });
  }
  
  
 // 'name', 'dob', 'email', 'phone', 'address', 'city', 'state', 'country'
 
 updateCustomer(id: string, first_name: string, last_name: string, email: string, dob: Date, age: number, sex: number, phone: string, address: string, city: string, state: string, country: string) {
   let customerData = {
     first_name: first_name,
	 last_name: last_name,
	 email: email,
     dob: dob,
     age: age,
	 sex: sex,
     phone: phone,
     address: address,
     city: city,
     state: state,
     country: country
   };
   this.http.patch<{ customer: any }>(BACKEND_URL + "customers/" + id, customerData).pipe(map(response => {
     return {
       customer: {
         first_name: response.customer.first_name,
		 last_name: response.customer.last_name,
		 email: response.customer.email,
		 dob: response.customer.dob,
		 age: response.customer.age,
		 sex: response.customer.sex,
		 phone: response.customer.phone,
		 address: response.customer.address,
		 city: response.customer.city,
		 state: response.customer.state,
		 country: response.customer.country
        }
      };
    })).subscribe(res => {
      let updatedCustomer = res;
    }, error => {
		this.uiService.openSnackBar(error.error.error, null);
		//window.alert(error.error.error);
		window.location.reload();
	});
 }

  getCustomerId(key: string, val: any) {
  let params = new HttpParams().set(key, val);
   this.http.get<{ id: any, customer: any }>(BACKEND_URL + "get-customer", {'params': params}).subscribe(res => {
      this.customer = res.customer;
	  this.customerInfoRequested.next(res.customer);
    }, error => {
		window.alert(error.error.error);
		window.location.reload();
    });
  }
  
  getAllCustomers(customersPerPage: number, currentPage: number, selected?: string, selectedOption?: string) {
    const queryParams = `?limit=${customersPerPage}&skip=${currentPage}&sortBy=${selected}:${selectedOption}`;
    this.http.get<{ customers: Customer[], customersCount: number }>(BACKEND_URL + "customers" + queryParams).pipe(map(customerData => {
      return {
        customers: customerData.customers.map(customer => {
          var _id = customer._id;
          var first_name =  customer.first_name;
		  var last_name =  customer.last_name;
		  var email = customer.email;
          var dob = customer.dob;
          var age = customer.age;
          var sex = customer.sex;
          var phone = customer.phone;
          var address = customer.address;
          var city = customer.city;
          var state = customer.state;
          var country = customer.country;
		  var photo = customer.photo;
          let customerInfo = {
            _id: _id,
            first_name: first_name,
		    last_name: last_name,
		    email: email,
		    dob: dob,
		    age: age,
		    sex: sex,
		    phone: phone,
		    address: address,
		    city: city,
		    state: state,
		    country: country,
			photo: photo
          }

          return customerInfo;
        }),
        maxCustomers: customerData.customersCount
      };
    })).subscribe(response => {
      this.allCustomers = response.customers;
      this.TotalCustomers = response.maxCustomers;
      this.customersListInfo.next({ customers: [...this.allCustomers], customerCount: this.TotalCustomers });
    }, error => {
		window.location.reload();
    });

    return { customers: [...this.allCustomers], customerCount: this.TotalCustomers };
  }

updateCustomerPhoto(id: string, image: File) {
    const picData = new FormData();
    picData.append("photo", image);

    this.http.post<{ msg: string, customer: Customer}>(BACKEND_URL + "customers/" + id + "/photo", picData).pipe(map(response => {
      return {
		msg: response.msg,
        customer: response.customer
	  }
	  
    })).subscribe(res => {
      this.customerPhotoUpdated.next(res.customer.photo);
	  this.uiService.openSnackBar(res.msg, null);
	  //window.alert(res.msg);
    }, error => {
      this.uiService.openSnackBar(error.error.error, null);
      //window.alert(error.error.error);
	  window.location.reload();
    });
  }
  
 deleteCustomerPhoto(id: string){
	 this.http.delete<{ msg: string, customer: Customer}>(BACKEND_URL + "customers/" + id + "/photo").subscribe(res => {
	   this.uiService.openSnackBar(res.msg, null);
	   //window.alert(res.msg);
	   window.location.reload();
    }, error => {
	  this.uiService.openSnackBar(error.error.error, null);
      //window.alert(error.error.error);
	  window.location.reload();
    });
 }
 
 deleteCustomer(id: string){
	 this.http.delete<{ msg: string }>(BACKEND_URL + "delete-customers/" + id).subscribe(res => {
	   this.uiService.openSnackBar(res.msg, null);
	   //window.alert(res.msg);
	   window.location.reload();
    }, error => {
	  this.uiService.openSnackBar(error.error.error, null);
      //window.alert(error.error.msg);
	  window.location.reload();
    });
 }
  
}
