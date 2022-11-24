import {Component, Input} from '@angular/core';
import {Note} from "../../interfaces/note";
import {UploadImageService} from "../../../../core/services/upload-image/upload-image.service";

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss']
})
export class NoteListItemComponent {
  // Input variables
  @Input() note: Note | undefined;

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

  constructor(
    private uploadImageService: UploadImageService,
  ) {
  }

  // Method to remove the image from the note
  removeNoteImage(): void {
    this.note!.images = [''];
  }

  // Method to change the color of a note
  setNoteColor(color: string | null): void {
    this.note!.color = color;
  }

  // Method to upload an image to firebase storage
  async uploadImage(files: any): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {
      await this.uploadImageService
        .uploadImage(files.target.files[0])
        .then((downloadUrl) => {
          this.note!.images = [downloadUrl];
          resolve(downloadUrl)
        })
        .catch((error) => rejects(error));
    });
  }
}
