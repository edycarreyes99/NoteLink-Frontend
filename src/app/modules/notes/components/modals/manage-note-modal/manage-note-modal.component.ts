import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Note} from "../../../interfaces/note";
import {NotesService} from "../../../services/notes.service";
import {GlobalService} from "../../../../../core/services/global/global.service";
import {ERROR_TOAST, SUCCESS_TOAST} from "../../../../../core/constants/toast.constants";

@Component({
  selector: 'app-manage-note-modal',
  templateUrl: './manage-note-modal.component.html',
  styleUrls: ['./manage-note-modal.component.scss']
})
export class ManageNoteModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public modalData: { manageType: 'Update' | 'Delete', note: Note | undefined },
    private notesService: NotesService,
    private globalService: GlobalService,
    private matDialogRef: MatDialogRef<ManageNoteModalComponent>
  ) {
  }

  // Method to manage a note
  async deleteNote(): Promise<Note> {
    return new Promise<Note>(async (resolve, rejects) => {
      await this.notesService.delete(`${this.modalData.note?.id}`)
        .subscribe({
          next: (deletedNote: Note) => {
            console.log('Note deleted successfully', deletedNote);
            this.globalService.showToast(SUCCESS_TOAST, 'Note deleted', 'Note deleted successfully!.');
            this.matDialogRef.close(deletedNote);
            resolve(deletedNote);
          },
          error: (error) => {
            console.error('Error removing Note:', error);
            this.globalService.showToast(ERROR_TOAST, 'Error removing Note', 'An error occurred while removing the Note. Please try again later.');
            rejects(error);
          }
        });
    });
  }
}
