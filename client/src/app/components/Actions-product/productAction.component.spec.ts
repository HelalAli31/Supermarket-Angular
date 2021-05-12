import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productActionsComponent } from './productAction.component';

describe('productActionsComponent', () => {
  let component: productActionsComponent;
  let fixture: ComponentFixture<productActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [productActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(productActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
