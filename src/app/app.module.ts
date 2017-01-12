import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {DataGridModule} from 'primeng/components/datagrid/datagrid';
import {FileUploadModule} from 'primeng/components/fileupload/fileupload';
import {RouterModule} from '@angular/router';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ButtonModule} from 'primeng/components/button/button';
import { UploadComponent } from './upload/upload.component';
import { BrowseComponent } from './browse/browse.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    BrowseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataGridModule,
    FileUploadModule,
    DialogModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
