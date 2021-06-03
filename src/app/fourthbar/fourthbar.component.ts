import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fourthbar',
  templateUrl: './fourthbar.component.html',
  styleUrls: ['./fourthbar.component.scss']
})
export class FourthbarComponent implements OnInit
{
  isExpanded = false;
  enabledSearch = false;
  constructor() { }

  ngOnInit(): void {
  }

  enableSearch(): void {
    this.enabledSearch = !this.enabledSearch;
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}
