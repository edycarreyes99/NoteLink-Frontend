import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNoteFormComponent } from './manage-note-form.component';

describe('ManageNoteFormComponent', () => {
  let component: ManageNoteFormComponent;
  let fixture: ComponentFixture<ManageNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNoteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
