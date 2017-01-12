import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {FileUpload} from 'primeng/components/fileupload/fileupload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  images: any[] = [];
  pastedFileType: string;
  canPaste: boolean = true;
  dialogVisible: boolean = false;
  totalRecords: number = 0;
  randomImageUrl: string = '';
  @ViewChild('FileUpload') fileUpload: FileUpload;

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  @HostListener('document:paste', ['$event'])
  handleKeyboardEvent(event: ClipboardEvent) {
    if (this.canPaste) {
      this.canPaste = false;
      this.dialogVisible = true;
      Object
        .keys(event.clipboardData.items)
        .forEach(key => {
          if (event.clipboardData.items[key].kind === 'file') {
            this.pastedFileType = event.clipboardData.items[key].type.split('/').pop();
            let blob = event.clipboardData.items[key].getAsFile();
            this.uploadPasted(blob, this.pastedFileType);
          }
        });
    }

  }

  onUpload($event) {
    console.log($event);
    console.log(this.fileUpload);
    this.getLazyImages();
  }

  uploadPasted(file, type) {
    let formData = new FormData();
    formData.append('file', file, 'pastedFile.' + type);

    this.http
      .post('/upload', formData)
      .map(response => response.json())
      .subscribe(() => {
        this.canPaste = true;
        this.dialogVisible = false;
        this.getLazyImages();
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

  onBeforeUpload(event) {
    console.log(event);
  }
}
