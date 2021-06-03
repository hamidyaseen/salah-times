import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secondbar',
  templateUrl: './secondbar.component.html',
  styleUrls: ['./secondbar.component.scss']
})
export class SecondbarComponent implements OnInit {

  appName = 'Salam Time Importer';
  constructor() { }

  ngOnInit(): void {
  }

}
