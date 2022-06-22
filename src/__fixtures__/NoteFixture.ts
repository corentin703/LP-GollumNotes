import {Note} from '@app/entities/Note';
import {faker} from '@faker-js/faker';

export const makeNote = (): Note => ({
  id: faker.datatype.uuid(),
  title: faker.word.noun(),
  content: faker.lorem.text(),
  createdAt: new Date(),
});


