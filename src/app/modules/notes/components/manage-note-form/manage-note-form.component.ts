import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadImageService} from "../../../../core/services/upload-image/upload-image.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotesService} from "../../services/notes.service";
import {Note} from "../../interfaces/note";
import {GlobalService} from "../../../../core/services/global/global.service";
import {ERROR_TOAST, SUCCESS_TOAST} from "../../../../core/constants/toast.constants";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-manage-note-form',
  templateUrl: './manage-note-form.component.html',
  styleUrls: ['./manage-note-form.component.scss']
})
export class ManageNoteFormComponent implements OnInit {
  // Input Variables
  @Input() note: Note | undefined;
  @Input() manageType: 'Create' | 'Update' = 'Create';

  // Output Variables
  @Output() noteSaved: EventEmitter<Note>;
  @Output() cancel: EventEmitter<void>;

  // Components variables
  description = '';
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
  noteForm: FormGroup;
  loading = false;

  constructor(
    private uploadImageService: UploadImageService,
    private notesService: NotesService,
    private globalService: GlobalService,
    private authService: AuthService
  ) {
    this.noteSaved = new EventEmitter<Note>();
    this.cancel = new EventEmitter<void>();

    this.noteForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      color: new FormControl(null, []),
      images: new FormControl([''], []),
      user_uid: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    console.log('Note', this.note);
    if (this.note) {
      this.noteForm.patchValue(this.note);
    }
  }

  // Method to upload an image to firebase storage
  async uploadImage(files: any): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {
      await this.uploadImageService
        .uploadImage(files.target.files[0])
        .then((downloadUrl) => {
          this.getControl('images')?.setValue([downloadUrl]);
          resolve(downloadUrl)
        })
        .catch((error) => rejects(error));
    });
  }

  // Method to get a control from the FormGroup
  getControl(controlName: string): AbstractControl | null {
    return this.noteForm.get(controlName);
  }

  // Method to change the color of a note
  setNoteColor(color: string | null): void {
    this.getControl('color')?.setValue(color);
  }

  // Method to remove the image from the note
  removeNoteImage(): void {
    this.getControl('images')?.setValue(['']);
  }

  // Method to clear the note form
  clearNoteForm(): void {
    this.noteForm.patchValue({
      id: null,
      title: '',
      description: '',
      color: null,
      images: ['']
    });
    this.cancel.emit();
  }

  // Method to save a note
  saveNote(): Promise<Note> {
    return new Promise<Note>(async (resolve, rejects) => {
      const note: Note = this.noteForm.getRawValue();
      delete note.id;
      this.loading = true;
      this.noteForm.get('user_uid')?.setValue(this.authService.getUser()?.uid);
      this.noteForm.disable();

      await this.notesService.store(this.noteForm.getRawValue()).subscribe((noteSaved) => {
        console.log('Note saved successfully', noteSaved);
        this.loading = false;
        this.noteForm.enable();
        this.clearNoteForm();
        this.globalService.showToast(SUCCESS_TOAST, 'Note saved', 'The note was saved successfully!.');
        this.noteSaved.emit(noteSaved);
        resolve(noteSaved);
      }, (error) => {
        console.error('Error saving note', error);
        this.loading = false;
        this.noteForm.enable();
        this.globalService.showToast(ERROR_TOAST, 'Error saving note', 'An error occurred while saving the note, please try again.');
        rejects(error);
      })
    });
  }
}
