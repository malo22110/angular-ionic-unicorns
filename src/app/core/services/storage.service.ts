import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { CoreServiceModule } from '../core-service.module';


@Injectable({
  providedIn: CoreServiceModule
})
export class StorageService {

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  /**
   * store a entry in application storage.
   * handle first submission with "if !result" guard.
   *
   * @param unicorn
   * @returns ionic-storage promise<any>
   */
  public setInArray(storageKey: string, entry: any): Promise<any> {
    return this.get(storageKey).then(result => {
      if (!result) {
        return this.storage.set(storageKey, [entry]);
      }

      result.unshift(entry);
      return this.storage.set(storageKey, result);
    });
  }

  public async get(storageKey: string): Promise<any> {
    return this.storage.get(storageKey);
  }
}
