import { Component, OnInit } from '@angular/core';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {RequestOptions, URLSearchParams, Http} from '@angular/http';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  images: any[];
  totalRecords: number = 0;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  getLazyImages(event?: LazyLoadEvent) {
    let requestOptions = new RequestOptions();
    let searchParams = new URLSearchParams();

    if (event && event.first) {
      searchParams.append('offset', String(event.first));
    } else {
      searchParams.append('offset', '0');
    }

    if (event && event.rows) {
      searchParams.append('limit', String(event.rows));
    } else {
      searchParams.append('limit', '18');
    }

    requestOptions.search = searchParams;

    this.http
      .get('/all', requestOptions)
      .map(response => response.json())
      .subscribe(response => {
        this.images = response.images;
        this.totalRecords = response.totalRecords;
      });
  }

  getRandom() {
    this.http
      .get('/random')
      .map(response => response.json())
      .subscribe(response => {
        if (response.length > 0) {
          window.location.href = '/images/' + response[0].fileName;
        }
      });
  }
}
