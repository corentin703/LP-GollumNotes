import {Picture} from '@app/entities/Picture';

export type PictureUpdate = {
  noteId: string;
  pictureId?: string;
  picture?: Picture;
  crudAction: 'create' | 'delete';
};

export type PicturesByNotesDictionary = { [key: string]: Picture[] };
