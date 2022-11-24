import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNoteModalComponent } from './manage-note-modal.component';

describe('ManageNoteModalComponent', () => {
  let component: ManageNoteModalComponent;
  let fixture: ComponentFixture<ManageNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNoteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
