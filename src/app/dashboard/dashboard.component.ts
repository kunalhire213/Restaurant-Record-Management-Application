import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  restoData: any;       // variable to store all resto data 

  form!: FormGroup;                     // variable to maintain form
  restaurantObj = new RestaurantData;   // object to store temporary data

  showBtn: boolean = false;     // for display add and update buttons

  searchText: string = '';   // to search data

  constructor(private _fb: FormBuilder, private _api: ApiService, private modal: NgbModal, private configModal: NgbModalConfig) {
    configModal.backdrop = 'static';
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      services: ['', Validators.required]
    })

    this.getAllData();
  }

  // get all data restaurants data from backend
  getAllData() {
    this._api.getAllData().subscribe({
      next: (res: any) => {
        this.restoData = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  // add new restaurant data
  addData() {
    this.restaurantObj.name = this.form.value.name;
    this.restaurantObj.email = this.form.value.email;
    this.restaurantObj.mobile = this.form.value.mobile;
    this.restaurantObj.address = this.form.value.address;
    this.restaurantObj.services = this.form.value.services;

    this._api.postData(this.restaurantObj).subscribe({
      next: (res: any) => {
        alert('Data added Succesfully');
        this.form.reset();
        this.getAllData();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  // method for open the modal to add data
  open(content: any) {
    this.modal.open(content);
  }

  // method to close the modal
  close() {
    this.modal.dismissAll();
    this.restaurantObj.id = 0;
    this.form.reset();
    this.showBtn = false;
  }

  // method for edit fields with existing data
  clickOnEdit(content: any, data: any) {
    this.showBtn = true;
    this.open(content);
    this.restaurantObj.id = data.id;

    this.form.controls['name'].setValue(data.name);
    this.form.controls['email'].setValue(data.email);
    this.form.controls['mobile'].setValue(data.mobile);
    this.form.controls['address'].setValue(data.address);
    this.form.controls['services'].setValue(data.services);
  }

  // method for update existing data
  updateData() {
    this.restaurantObj.name = this.form.value.name;
    this.restaurantObj.email = this.form.value.email;
    this.restaurantObj.mobile = this.form.value.mobile;
    this.restaurantObj.address = this.form.value.address;
    this.restaurantObj.services = this.form.value.services;

    this._api.putData(this.restaurantObj, this.restaurantObj.id).subscribe({
      next: (res: any) => {
        alert('Successfully Updated.');
        this.form.reset();
        this.getAllData();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  // method for delete the data
  deleteData(id: number) {
    if (confirm('Are you sure about this?')) {
      this._api.deleteData(id).subscribe({
        next: (res: any) => {
          alert('Data deleted succesfully');
          this.getAllData();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}