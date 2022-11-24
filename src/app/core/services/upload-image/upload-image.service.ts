import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private angularFireStorage: AngularFireStorage,
  ) {
  }

  // Method to generate a random name for the image
  private generateImageName(): string {
    const newTime = Math.floor(Date.now() / 1000);
    return `${Math.floor(Math.random() * 20) + newTime}`;
  }

  // Method to upload an image to firebase storage
  async uploadImage(imageData: any): Promise<string> {
    return new Promise<string>(async (resolve, rejects) => {
      const imageName = this.generateImageName();
      const imageRef = this.angularFireStorage.ref(imageName);
      await imageRef.put(imageData).then(() => {
        imageRef.getDownloadURL().subscribe((url) => {
          console.log('Image uploaded successfully:', url);
          resolve(url);
        }, error => {
          console.error('Error getting download url:', error);
          rejects(error);
        });
      }).catch((error) => {
        console.error('Error uploading image to firebase storage:', error);
        rejects(error);
      })
    });
  }
}
