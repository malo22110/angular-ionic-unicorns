import { NgxSerializerService } from '@witty-services/ngx-serializer';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { CoreServiceModule } from '../core-service.module';
import { Unicorn } from '../models/unicorn.model';

const STORAGE_KEY = 'unicorns';

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
   * store a unicorn in application storage.
   * handle first submission with "if !result" guard.
   *
   * @param unicorn
   * @returns ionic-storage promise<any>
   */
  public addUnicorn(unicorn: Unicorn) {
    return this.getAllUnicorns().then(result => {
      if (!result) {
        return this.storage.set(STORAGE_KEY, [unicorn]);
      }

      result.unshift(unicorn);
      return this.storage.set(STORAGE_KEY, result);
    });
  }

  public async getAllUnicorns(): Promise<Unicorn[]> {
    return this.storage.get(STORAGE_KEY);
  }
}
