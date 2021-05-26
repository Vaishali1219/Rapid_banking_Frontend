import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPhotoComponent } from './link-photo.component';

describe('LinkPhotoComponent', () => {
  let component: LinkPhotoComponent;
  let fixture: ComponentFixture<LinkPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
