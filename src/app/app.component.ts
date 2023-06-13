import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wheather_forecast';
  weatherSearchForm: FormGroup;
  weatherforecastData: any;
  loader: boolean = false;
  nodataFound :boolean = true;
  constructor(private apiservice: ApiService) {
    this.weatherSearchForm = new FormGroup({
      location: new FormControl('', [Validators.required])
    })
  }

  weatherData() {
    if (this.weatherSearchForm.valid) {
      this.loader = true;
      this.nodataFound = false;
      let weatherformobj = {
        location: this.weatherSearchForm.value.location
      }
      this.apiservice.getforeCastData(weatherformobj.location).subscribe((resp: any) => {
        if(resp.cod == 200) {
          this.weatherforecastData = resp.list.slice(0, 15);
          this.loader = false;
        }
      })
    }
    else {
    }
  }

}
