import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../interfaces/note";
import {UploadImageService} from "../../../../core/services/upload-image/upload-image.service";
import {MatDialog} from "@angular/material/dialog";
import {ManageNoteModalComponent} from "../modals/manage-note-modal/manage-note-modal.component";
import {NotesService} from "../../services/notes.service";
import {GlobalService} from "../../../../core/services/global/global.service";
import {ERROR_TOAST, SUCCESS_TOAST} from "../../../../core/constants/toast.constants";

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss']
})
export class NoteListItemComponent {
  // Input variables
  @Input() note: Note | undefined;

  // Output variables
  @Output() noteManaged: EventEmitter<Note>

  // Component variables
  colors: { name: string, color: string }[] = [
    {name: 'Red', color: 'rgb(242, 139, 130)'},
    {name: 'Orange', color: 'rgb(251, 188, 4)'},
    {name: 'Yellow', color: 'rgb(255, 244, 117)'},
    {name: 'Green', color: 'rgb(204, 255, 144)'},
    {name: 'Blue', color: 'rgb(203, 240, 248)'},
    {name: 'Dark Blue', color: 'rgb(174, 203, 250)'},
    {name: 'Purple', color: 'rgb(215, 174, 251)'},
    {name: 'Pink', color: 'rgb(253, 207, 232)'},
    {name: 'Brown', color: 'rgb(230, 201, 168)'},
    {name: 'Gray', color: 'rgb(232, 234, 237)'},
  ];
  loading = false;

  constructor(
    private uploadImageService: UploadImageService,
    private matDialog: MatDialog,
    private notesService: NotesService,
    private globalService: GlobalService,
  ) {
    this.noteManaged = new EventEmitter<Note>();
  }

  // Method to remove the image from the note
  removeNoteImage(): Promise<void> {
    return new Promise<void>(async () => {
      this.note!.images = [''];
      await this.updateNote();
    });
  }

  // Method to change the color of a note
  async setNoteColor(color: string | null): Promise<void> {
    return new Promise<void>(async () => {
      this.note!.color = color;
      await this.updateNote();
    });
  }

  // Method to upload an image to firebase storage
  async uploadImage(files: any): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {
      await this.uploadImageService
        .uploadImage(files.target.files[0])
        .then(async (downloadUrl) => {
          this.note!.images = [downloadUrl];
          await this.updateNote().then(() => {
            resolve(downloadUrl);
          }).catch((error) => {
            rejects(error);
          });
        })
        .catch((error) => rejects(error));
    });
  }

  // Method to update a note
  updateNote(): Promise<Note> {
    return new Promise<Note>(async (resolve, rejects) => {
      this.loading = true;
      await this.notesService.update(`${this.note!.id}`, this.note!)
        .subscribe({
          next: (updatedNote: Note) => {
            console.log('Note updated successfully', updatedNote);
            this.globalService.showToast(SUCCESS_TOAST, 'Note updated', 'Note updated successfully.');
            this.note = updatedNote;
            this.loading = false;
            this.noteManaged.emit(updatedNote);
            resolve(updatedNote);
          },
          error: (error) => {
            console.error('Error updating note:', error);
            this.globalService.showToast(ERROR_TOAST, 'Error updating note', 'An error occurred while updating the note. Please try again.');
            this.loading = false;
            rejects(error);
          }
        });
    });
  }

  // Method to open the manage note modal
  openManageNoteModal(manageType: 'Delete' | 'Update'): void {
    this.matDialog.open(ManageNoteModalComponent, {
      disableClose: true,
      data: {
        manageType,
        note: this.note,
      }
    }).afterClosed().subscribe({
      next: (note: Note) => {
        if (note) {
          this.noteManaged.emit(note);
        }
      },
      error: (error) => {
        console.error('Error closing modal:', error);
      }
    });
  }
}
