import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ImporterComponent } from './importer.component';

const routes: Routes = [
  { path: 'salah-times/importer', component: ImporterComponent }
];

@NgModule({
  declarations: [ImporterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class ImporterRoutingModule { }
