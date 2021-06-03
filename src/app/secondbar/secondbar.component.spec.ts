import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondbarComponent } from './secondbar.component';

describe('SecondbarComponent', () => {
  let component: SecondbarComponent;
  let fixture: ComponentFixture<SecondbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
