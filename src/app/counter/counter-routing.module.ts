import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter.component';

const routes: Routes = [
  { path: 'counter', component: CounterComponent }
];

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterRoutingModule { }
