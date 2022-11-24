import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesViewComponent } from './components/notes-view/notes-view.component';
import { ManageNoteFormComponent } from './components/manage-note-form/manage-note-form.component';
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


@NgModule({
  declarations: [
    NotesViewComponent,
    ManageNoteFormComponent
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
    MatProgressBarModule
  ],
  providers: [NotesService]
})
export class NotesModule { }
