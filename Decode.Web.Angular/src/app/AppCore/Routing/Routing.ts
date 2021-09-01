import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import HomePage from '../../Pages/HomePage/HomePage';
import ContactUsPage from '../../Pages/ContactUsPage/ContactUsPage';
import HTTP404Page from '../../Pages/HTTP404Page/HTTP404Page';

export const RootRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },  
  { path: 'contactus', component: ContactUsPage },
  { path: '**', component: HTTP404Page }
];

@NgModule({
  imports: [RouterModule.forRoot(RootRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
