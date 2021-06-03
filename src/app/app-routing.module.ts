import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'salah-times/home', component: HomeComponent },
  //{ path: 'salah-times/dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'salah-times/importer', pathMatch: 'full' },
  { path: '**', redirectTo: 'salah-times/importer', pathMatch: 'full' }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
