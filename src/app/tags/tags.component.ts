import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, FormsModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  loaded = false;
  tags: Tag[] = [];
  editing: Tag | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    if (!this.loaded) {
      this.tags = this.storageService.getTags();
      this.loaded = true;
    }
  }

  dialogAddTag() {
    const name = window.prompt("Nom de la nouvelle étiquette :");
    if (name && name.trim() !== '') {
      const newTag: Tag = {
        id: Date.now(),
        name: name.trim(),
        color: '#000000'
      };
      this.tags.push(newTag);
      this.storageService.saveTags(this.tags);
    }
    return false;
  }

  deleteTag(tag: Tag) {
    const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer le tag "${tag.name}" ?`);
    if (!confirmDelete) return;
  
    this.tags = this.tags.filter(t => t.id !== tag.id);
    this.storageService.saveTags(this.tags);
  }
  

  openTagEditor(tag: Tag) {
    this.editing = { ...tag };
  }

  saveTag() {
    if (this.editing) {
      if (this.editing.id === 0) {
        this.editing.id = Date.now();
        this.tags.push(this.editing);
      } else {
        const index = this.tags.findIndex(t => t.id === this.editing!.id);
        if (index !== -1) {
          this.tags[index] = this.editing;
        }
      }
      this.storageService.saveTags(this.tags);
      this.editing = null;
    }
  }

  cancelEditing() {
    this.editing = null;
  }
}
