import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AnalyserService } from './analyser.service';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {

  daysCalendar$ = this.analyser.Lines$.pipe(
    tap(lines => console.log(lines.length))
  );
  salahTime = new FormControl('');
  constructor(private analyser: AnalyserService) { }

  ngOnInit(): void {
    this.salahTime.valueChanges.subscribe(txt => this.analyser.analyse(txt));
  }
}
