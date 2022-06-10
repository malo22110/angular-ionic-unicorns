import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { CoreServiceModule } from '../core-service.module';
import { Unicorn } from '../models/unicorn.model';
import { EUnicornGender } from '../enums/unicorn-gender.enum';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSerializerService } from '@witty-services/ngx-serializer';

@Injectable({
  providedIn: CoreServiceModule
})
export class UnicornService {

  static ressource = 'unicorns';

  constructor(
    private readonly storageService: StorageService,
    private readonly serializer: NgxSerializerService
  ) { }

  public getAllUnicorns(): Observable<Unicorn[]> {
    return from(this.storageService.get(UnicornService.ressource)).pipe(
      map(elem => this.serializer.deserializeAll(Unicorn, !!elem ? elem : []))
    );
  }

  public addUnicorn(unicorn): Promise<Unicorn[]> {
    return this.storageService.setInArray(UnicornService.ressource, unicorn);
  }

  public atLeastOneMaleAndOneFemale(unicorns: Unicorn[]): boolean {
    return !!unicorns?.find((unicorn) => unicorn.gender === EUnicornGender.male)
      && !!unicorns?.find((unicorn) => unicorn.gender === EUnicornGender.female);
  }
}
