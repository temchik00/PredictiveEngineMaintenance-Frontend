import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCycleModalComponent } from './add-cycle-modal.component';

describe('AddCycleModalComponent', () => {
  let component: AddCycleModalComponent;
  let fixture: ComponentFixture<AddCycleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCycleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCycleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
