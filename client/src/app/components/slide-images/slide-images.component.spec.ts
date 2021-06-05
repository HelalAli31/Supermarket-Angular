import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideImagesComponent } from './slide-images.component';

describe('SlideImagesComponent', () => {
  let component: SlideImagesComponent;
  let fixture: ComponentFixture<SlideImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
