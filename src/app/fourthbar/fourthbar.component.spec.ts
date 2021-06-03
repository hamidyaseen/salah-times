import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthbarComponent } from './fourthbar.component';

describe('FourthbarComponent', () => {
  let component: FourthbarComponent;
  let fixture: ComponentFixture<FourthbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
