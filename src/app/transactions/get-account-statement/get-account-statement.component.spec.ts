import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAccountStatementComponent } from './get-account-statement.component';

describe('GetAccountStatementComponent', () => {
  let component: GetAccountStatementComponent;
  let fixture: ComponentFixture<GetAccountStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAccountStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
