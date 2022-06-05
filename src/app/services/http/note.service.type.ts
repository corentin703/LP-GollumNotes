export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  lastModifiedAt: Date;
  pictures: any[]; // TODO TYPE
};

export type CreateNoteRequest = {
  title: string;
  content: string;
};

export type UpdateNoteRequest = {
  title: string;
  content: string;
};
