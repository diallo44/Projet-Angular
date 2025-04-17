import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tagKey = 'tags';
  private noteKey = 'notes';

  getTags(): Tag[] {
    const data = localStorage.getItem(this.tagKey);
    return data ? JSON.parse(data) : [];
  }

  saveTags(tags: Tag[]): void {
    localStorage.setItem(this.tagKey, JSON.stringify(tags));
  }

  getNotes(): Note[] {
    const data = localStorage.getItem(this.noteKey);
    const rawNotes = data ? JSON.parse(data) : [];
    return rawNotes.map((n: any) => new Note(n)); // reconstruire Note
  }

  saveNotes(notes: Note[]): void {
    localStorage.setItem(this.noteKey, JSON.stringify(notes));
  }
}
