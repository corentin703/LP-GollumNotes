import {Picture} from '@app/entities/Picture';
import {faker} from '@faker-js/faker';

export const makePicture = (): Picture => ({
  id: faker.datatype.uuid(),
  contentType: 'application/png',
});

