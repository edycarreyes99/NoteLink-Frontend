import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes.service";
import {Note} from "../../interfaces/note";
import {GlobalService} from "../../../../core/services/global/global.service";
import {ERROR_TOAST} from "../../../../core/constants/toast.constants";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  // Component variables
  notes: Note[] = [];

  constructor(
    private noteService: NotesService,
    private globalService: GlobalService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.getNotes();
  }

  // Method to get all notes
  async getNotes(): Promise<Note[]> {
    return new Promise<Note[]>(async (resolve, rejects) => {
      await this.noteService.index().subscribe((notes) => {
        this.notes = notes;
        console.log('Notes fetched are:', this.notes);
        resolve(notes);
      }, (error) => {
        console.error('Error fetching notes:', error);
        this.globalService.showToast(ERROR_TOAST, 'Error fetching notes', 'An error occurred while fetching notes. Please try again later.');
        rejects(error);
      })
    });

  }

}
