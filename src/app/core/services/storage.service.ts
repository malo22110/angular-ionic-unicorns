import { NgxSerializerService } from '@witty-services/ngx-serializer';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { CoreServiceModule } from '../core-service.module';
import { Unicorn } from '../models/unicorn.model';


@Injectable({
  providedIn: CoreServiceModule
})
export class StorageService {

  constructor(
    private readonly serializer: NgxSerializerService,
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
  public setInArray(STORAGE_KEY: string, entry: any): Promise<any> {
    return this.get(STORAGE_KEY).then(result => {
      if (!result) {
        return this.storage.set(STORAGE_KEY, [entry]);
      }

      result.unshift(entry);
      return this.storage.set(STORAGE_KEY, result);
    });
  }

  public async get(STORAGE_KEY: string): Promise<any> {
    return this.storage.get(STORAGE_KEY);
  }
}
