import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MyserviceService} from '../myservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: MyserviceService) {
  }
  gettingTotal: any;
  error;
  results: any;
  page = 0;
  ngOnInit() {
    this.gettingTotal = 0;
    let param = {};
    this.route.params.subscribe(params => {
        console.log(params);
        param = params;
      }
    );
    this.service.getSingleCountryDetails(param).subscribe(res => {
        console.log(res);
        this.results = res;
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

  pageChanged(event) {
    this.page = event;
    console.log(event);
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
