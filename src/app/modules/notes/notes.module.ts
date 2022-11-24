import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesViewComponent } from './components/notes-view/notes-view.component';
import { ManageNoteFormComponent } from './components/manage-note-form/manage-note-form.component';


@NgModule({
  declarations: [
    NotesViewComponent,
    ManageNoteFormComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
