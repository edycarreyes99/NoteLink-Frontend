import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotesRoutingModule} from './notes-routing.module';
import {NotesViewComponent} from './components/notes-view/notes-view.component';
import {ManageNoteFormComponent} from './components/manage-note-form/manage-note-form.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatMenuModule} from "@angular/material/menu";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NotesService} from "./services/notes.service";
import {NoteListComponent} from './components/note-list/note-list.component';
import {NoteListItemComponent} from './components/note-list-item/note-list-item.component';
import {NgxMasonryModule} from "ngx-masonry";
import {ManageNoteModalComponent} from './components/modals/manage-note-modal/manage-note-modal.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    NotesViewComponent,
    ManageNoteFormComponent,
    NoteListComponent,
    NoteListItemComponent,
    ManageNoteModalComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TextFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    NgxMasonryModule,
    MatDialogModule
  ],
  providers: [
    NotesService,
    ManageNoteModalComponent
  ],
  entryComponents: [
    ManageNoteModalComponent
  ]
})
export class NotesModule {
}
