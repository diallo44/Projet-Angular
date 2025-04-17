
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.model';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: Note[] = [];
  tags: Tag[] = [];

  newNoteTitle: string = '';
  newNoteContent: string = '';
  selectedTagIds: number[] = [];

  editingNote: Note | null = null;
  showForm = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.notes = this.storageService.getNotes();
    this.tags = this.storageService.getTags();

    if (this.notes.length === 0) {
      const note = new Note({
        id: Date.now(),
        title: 'Note test',
        content: 'Ceci est une note créée automatiquement.',
        tagIds: [],
        createdAt: new Date()
      });
      this.notes.push(note);
      this.storageService.saveNotes(this.notes);
    }
  }

  submitNote() {
    const title = this.newNoteTitle.trim();
    const content = this.newNoteContent.trim();

    if (!title && !content) return;

    let note: Note;

    if (this.editingNote) {
      // Modification
      note = new Note({
        ...this.editingNote,
        title,
        content,
        tagIds: [...this.selectedTagIds],
        createdAt: this.editingNote.createdAt
      });
      this.notes = this.notes.map(n => n.id === note.id ? note : n);
    } else {
      // Création
      note = new Note({
        id: Date.now(),
        title,
        content,
        tagIds: [...this.selectedTagIds],
        createdAt: new Date()
      });
      this.notes.push(note);
    }

    this.storageService.saveNotes(this.notes);
    this.clearForm();
  }

  deleteNote(noteId: number) {
    this.notes = this.notes.filter(n => n.id !== noteId);
    this.storageService.saveNotes(this.notes);
  }

  openEdit(note: Note) {
    this.editingNote = new Note({ ...note });
    this.newNoteTitle = note.title;
    this.newNoteContent = note.content;
    this.selectedTagIds = [...note.tagIds];
  }


  startNewNote() {
    this.clearForm();
    this.showForm = true;
  }
  
  clearForm() {
    this.newNoteTitle = '';
    this.newNoteContent = '';
    this.selectedTagIds = [];
    this.editingNote = null;
    this.showForm = false;
  }
  



 

  getTagName(tagId: number): string {
    const tag = this.tags.find(t => t.id === tagId);
    return tag ? tag.name : '?';
  }
}
