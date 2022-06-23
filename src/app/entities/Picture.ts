import {IEntity} from '@app/contracts/services/entities/entity';

export type Picture = {
  contentType: string;
  blob?: Blob;
  base64?: string;
} & IEntity;
