import { Injectable } from '@angular/core';
import {Note} from "../interfaces/note";
import {CRUD} from "../../../core/http/crud";
import {NOTES_URL} from "../../../core/constants/api-urls/notes.constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotesService extends CRUD<Note, Note[]>{

  constructor(
    protected override http: HttpClient
  ) {
    super(http, NOTES_URL);
  }
}
