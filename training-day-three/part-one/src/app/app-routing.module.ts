import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { GroupComponent } from './pages/group/group.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'groups', component: GroupComponent
  },
  {
    path: 'my-profile', component: MyprofileComponent
  },

  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
