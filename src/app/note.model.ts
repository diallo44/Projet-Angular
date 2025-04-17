export class Note {
  id: number = 0;
  title: string = '';
  content: string = '';
  tagIds: number[] = [];
  createdAt: Date;

  constructor(data?: Partial<Note>) {
    if (data) Object.assign(this, data);
    this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
  }

  summarize(): string {
    return this.title + ' - ' + this.content.slice(0, 50);
  }
}
