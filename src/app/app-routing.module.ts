import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelectComponent} from './select/select.component';
import {CountryDetailComponent} from './country-detail/country-detail.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '/country', pathMatch: 'full'},
  {path: 'country', component: SelectComponent},
  {path: 'country/:name', component: CountryDetailComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
