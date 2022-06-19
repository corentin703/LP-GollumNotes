import {IEntity} from '@app/contracts/services/entities/entity';

export type Note = {
  title: string;
  content: string;
  createdAt?: Date;
  lastModifiedAt?: Date;
  pictures?: any[]; // TODO TYPE
} & IEntity;
