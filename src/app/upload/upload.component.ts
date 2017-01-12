import {Component, OnInit, HostListener} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  canPaste: boolean = true;
  dialogVisible: boolean = false;
  pastedFileType: string;
  uploads: any[] = [];
  constructor(private http: Http) { }

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
    if ($event && $event.xhr) {
      let response = JSON.parse($event.xhr.response);

      this.uploads.push(response);
    }
  }

  uploadPasted(file, type) {
    let formData = new FormData();
    formData.append('file', file, 'pastedFile.' + type);

    this.http
      .post('/upload', formData)
      .map(response => response.json())
      .subscribe((response) => {
        this.canPaste = true;
        this.dialogVisible = false;
        this.uploads.push(response);
      });
  }
}
