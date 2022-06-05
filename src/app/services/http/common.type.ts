export type Payload<TEntity> = {
  data?: TEntity;
  messages?: string[];
  errors?: string[];
};
