import {Component, Input} from '@angular/core';
import {UploadImageService} from "../../../../core/services/upload-image/upload-image.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-note-form',
  templateUrl: './manage-note-form.component.html',
  styleUrls: ['./manage-note-form.component.scss']
})
export class ManageNoteFormComponent {
  // Input Variables
  @Input() note: any;

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

  constructor(
    private uploadImageService: UploadImageService,
  ) {
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
    });
  }

  // Method to upload an image to firebase storage
  async uploadImage(files: any): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {
      await this.uploadImageService
        .uploadImage(files.target.files[0])
        .then((downloadUrl) => {
          this.getControl('images')?.setValue([downloadUrl]);
          console.log('images', this.noteForm.getRawValue());
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
  }

  // Method to save a note
  saveNote(): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {

    });
  }
}
