import {IEntity} from '@app/contracts/services/entities/entity';
import {Picture} from '@app/entities/Picture';

export type Note = {
  title: string;
  content: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
  pictures: Picture[];
} & IEntity;
