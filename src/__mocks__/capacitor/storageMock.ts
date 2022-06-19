import {Storage} from '@ionic/storage';

class FakeStorage {
  data: { [key: string]: string } = {};

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

  public remove(key: string): Promise<any> {
    delete this.data[key];
    return Promise.resolve();
  }

  public clear() {
    this.data = { };
    return Promise.resolve();
  }
}

export const storageMock = new FakeStorage() as unknown as Storage;
