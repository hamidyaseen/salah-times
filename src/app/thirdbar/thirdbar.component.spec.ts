import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdbarComponent } from './thirdbar.component';

describe('ThirdbarComponent', () => {
  let component: ThirdbarComponent;
  let fixture: ComponentFixture<ThirdbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
