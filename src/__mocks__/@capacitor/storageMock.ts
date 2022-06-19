import {Storage} from '@ionic/storage';

class FakeStorage extends Storage {
  data: { [key: string]: string } = {};

  constructor() {
    super({ });
  }

  public create() {
    return Promise.resolve(this);
  }

  public get(key: string) {
    const item = this.data[key];
    return Promise.resolve(item);
  }

  public set(key: string, value: string) {
    this.data[key] = value;

    return Promise.resolve();
  }

  public clear() {
    this.data = { };
    return Promise.resolve();
  }
}

export const storageMock = new FakeStorage();
