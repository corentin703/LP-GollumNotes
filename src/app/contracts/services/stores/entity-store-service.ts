import {Observable} from 'rxjs';
import {IEntity} from '@app/contracts/services/entities/entity';
import {Payload} from '@app/services/http/common.type';

export interface IEntityStoreService<TEntity extends IEntity, TCreateModel, TUpdateModel> {
  getAll(): Observable<TEntity[]>;
  getById(id: string): Observable<TEntity | null>;
  create(body: TCreateModel): Observable<Payload<TEntity>>;
  update(id: string, body: TUpdateModel): Observable<Payload<TEntity>>;
  delete(id: string): Observable<Payload<void>>;
}
