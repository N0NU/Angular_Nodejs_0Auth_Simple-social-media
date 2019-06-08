import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpostDialogComponent } from './editpost-dialog.component';

describe('EditpostDialogComponent', () => {
  let component: EditpostDialogComponent;
  let fixture: ComponentFixture<EditpostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
