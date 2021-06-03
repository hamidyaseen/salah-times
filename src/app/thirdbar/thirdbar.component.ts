import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thirdbar',
  templateUrl: './thirdbar.component.html',
  styleUrls: ['./thirdbar.component.scss']
})
export class ThirdbarComponent implements OnInit {

  isExpanded = false;

  constructor() { }
  ngOnInit(): void { }
  

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
