import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementEnquiryComponent } from './statement-enquiry.component';

describe('StatementEnquiryComponent', () => {
  let component: StatementEnquiryComponent;
  let fixture: ComponentFixture<StatementEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
