import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyserviceService} from '../myservice.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: MyserviceService, private router: Router) {
  }

  myForm: FormGroup;

  countryArray: any;
  error;

  ngOnInit() {
    this.myForm = this.fb.group({
      countryname: ['', Validators.required],
    });
    this.service.getCountriesArray().subscribe(res => {
        this.countryArray = res;
        console.log(this.countryArray);
      }, error => {
        this.error = error;
        console.log(this.error);
        if (this.error.Message) {
          this.errorHandling('Message', this.error.Message);
        } else {
          this.errorHandling('Error', this.error.Error);
        }
      }// -----------Error Handling
    );

  }

  onSubmit() {
    console.log(this.myForm.value);
    this.router.navigate(['country', this.myForm.value.countryname]);
  }

  gettingCountryNameArray() {
    console.log('in country');
  }

  // -----Displaying Swal popup on error getting from api------
  errorHandling(value, Error) {
    Swal.fire({
      title: value,
      text: Error,
      allowEscapeKey: false,
      allowOutsideClick: false,
      // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
    }).then(function(value) {
      location.reload();
    });
  }


}
