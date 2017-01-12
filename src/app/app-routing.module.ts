import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UploadComponent} from './upload/upload.component';
import {BrowseComponent} from './browse/browse.component';

export const routes: Routes = [
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'upload',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
