import { Injectable } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EnLine } from './enLine';

interface xDate extends Date {
  isValid(): boolean;
}

(Date as unknown as xDate).isValid = function(): boolean {
    // If the date object is invalid it
    // will return 'NaN' on getTime() 
    // and NaN is never equal to itself.
    return this.getTime() === this.getTime();
}

@Injectable({
  providedIn: 'root'
})
export class AnalyserService {

  private LineSubject = new Subject<EnLine[]>();
  public Lines$ = this.LineSubject.asObservable();
  //private yesdayLineSubject = new Subject<string>();
  //private previousLine$ = this.yesdayLineSubject.asObservable();

  //if (lineText?.indexOf('\"') < 0)
          //  this.yesdayLineSubject.next(lineText);
          //this.todayLineSubject.next(lineText); 
  //lines$ = combineLatest([this.previousLine$, this.currentLine$]).pipe(
  //  tap(strings => {
  //    console.log(strings);
  //  }),
  //  map(([preLine, theLine]) => {
  //        //split is a bit secure, in the sense, if can not split still array is not undefine/invalid
  //    let theLineCols = theLine?.replace(/(\t|\s)/ig, ';')?.split(';');
  //    if (theLine?.indexOf('\"') >= 0) {
  //      let preLineCols = preLine.replace(/(\t|\s)/ig, ';')?.split(';');
  //      theLineCols.forEach((colText: string, index: number) => {
  //        if (colText === '\"')
  //          theLineCols[index] = preLineCols?.[index]; 
  //        });
  //    }

  //    theLineCols.forEach(columnText => {
  //      console.log(columnText);
  //    });
  //  })
  //);
  constructor() { }

  private replaceYesterdayTime(preLineCols: string[], lineCols: string[]) {   
      lineCols.forEach((colText: string, index: number) => {
        if (colText === '\"')
          lineCols[index] = preLineCols?.[index];
      });
  }

  private testColumn(lines: EnLine[], index: number): number
  {
    if (lines?.length >= 4 && lines?.[0].lineColums?.length >= index) {
      if (lines[0].lineColums[index].length <= 2 && parseInt(lines[0].lineColums[index]) !== NaN &&
        parseInt(lines[1].lineColums[index]) !== NaN && parseInt(lines[2].lineColums[index]) !== NaN
        && parseInt(lines[3].lineColums[index]) !== NaN) {
        let row0Col = parseInt(lines[0].lineColums[index]);
        let row1Col = parseInt(lines[1].lineColums[index]);
        let row2Col = parseInt(lines[2].lineColums[index]);
        let row3Col = parseInt(lines[3].lineColums[index]);
        if (row0Col === row1Col && row1Col === row2Col && row2Col === row3Col)
          return 1;

        if (row0Col + 1 === row1Col && row1Col + 1 === row2Col && row2Col + 1 === row3Col)
          return 2;
      }
      else if (lines[0].lineColums[index].length > 5) {
        try {
          let date0 = Date.parse(lines[0].lineColums[index]);
          let date1 = Date.parse(lines[1].lineColums[index]);
          let date2 = Date.parse(lines[2].lineColums[index]);
          let date3 = Date.parse(lines[3].lineColums[index]);
          if (isNaN(date0) || isNaN(date1) || isNaN(date2) || isNaN(date3))
            return 0;
          return 3;
        }
        catch (x ) {
          return 0;
        }        
      }       
    }
    return 0;   
  }
  public analyse(txt: string): void
  {
    // considering text : string | undefined. So in case undefined, lines could be undefined
    // and return in 
    let lines = txt?.split('\n');
    if (!lines || !this.doesFirstDataLineValid(lines)) {
      console.log('Invalid First data row');
        return;
      }
      let lineNumber = 0;
      let linesOfColumns: EnLine[] = [];
    let preLine: string[] = [];
    let aText: RegExpMatchArray | null;
    
      lines.forEach((lineText, index: number) => {
        lineText = lineText?.trim();
        if (lineText.length > 0) {
          let lineCols = lineText.replace(/(\t|\s)/ig, ';').split(';');
          let lineNewCols: string[] = [];
          lineCols.forEach((colText: string, index: number) => {

            if (colText === '\"' && preLine.length > 0) {
              let sametime = (index >= 0 && index < preLine.length) ? preLine[index] : '==';
              lineCols[index] = sametime;
              lineNewCols.push(sametime);
            }
            else if (colText === 'am' || colText === 'AM') { ; }
            else if ((colText === 'pm' || colText === 'PM') && index > 1) { //only PM
              let time = lineCols[index - 1]?.split(/(:|\.|-)/ig);
              if (time && time.length >= 3) {
                  lineNewCols.pop();
                  lineNewCols.push(`${parseInt(time[0]) + 12}:${time[2]}`);
              }
            }  // be care full match returns null also
            else if ((aText = colText.match(/(\d)+(\:|\.|-)(\d)+(?=am)/i)) !== null && (aText?.length! >= 1)) {
              let aTime = aText[0].split(/(:|\.|-)/ig);
              lineNewCols.push(`${aTime?.[0]}:${aTime?.[2]}`);             
            }
            else if ((aText = colText.match(/(\d)+(\:|\.|-)(\d)+(?=pm)/i)) !== null && (aText?.length! >= 1)) {
              let aTime = aText[0].split(/(:|\.|-)/ig);
              lineNewCols.push(`${parseInt(aTime?.[0]) + 12}:${aTime?.[2]}`);
            }
            else
              lineNewCols.push(colText);
          });  //this.replaceYesterdayTime(preLineCols, lineCols);

          //after traversing the lineCols and single change in line of \" character, just save back as preLine
          preLine = lineCols;
          linesOfColumns.push({ lineNumber: ++lineNumber, lineColums: lineNewCols });
        }
        else
          console.log('Text line of length '+lineText.length);
      });

    this.LineSubject.next(linesOfColumns);
    //linesOfColumns.forEach(lineColum => console.log(lineColum.lineColums));

    let columnZero = this.testColumn(linesOfColumns, 0);
    let columnOne = this.testColumn(linesOfColumns, 1);
    let columnTwo = this.testColumn(linesOfColumns, 2);
  }

    //lines is defined as undefined but it could undefined
  private doesFirstDataLineValid(lines: string[]): boolean {

    for (let i = 0; i < lines?.length; i++) {
      lines[i] = lines[i]?.trim();
      if (lines[i]?.length > 0){
        if (lines[i]?.indexOf('\"') >= 0)
          return false;
        else
          return true;
      }
    }
    
    return false;
  }
}
