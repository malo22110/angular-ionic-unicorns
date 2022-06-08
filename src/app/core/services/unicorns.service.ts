import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { CoreServiceModule } from '../core-service.module';
import { Unicorn } from '../models/unicorn.model';
import { EUnicornGender } from '../enums/unicorn-gender.enum';
import { from, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NgxSerializerService } from '@witty-services/ngx-serializer';

@Injectable({
  providedIn: CoreServiceModule
})
export class UnicornService {

  constructor(
    private readonly storageService: StorageService,
    private readonly serializer: NgxSerializerService
  ) { }

  public getAllUnicorns(): Observable<Unicorn[]> {
    return from(this.storageService.getAllUnicorns()).pipe(
      filter(elem => !!elem),
      map(elem => this.serializer.deserializeAll(Unicorn, elem))
    );
  }

  public atLeastOneMaleAndOneFemale(unicorns: Unicorn[]): boolean {
    return !!unicorns?.find((unicorn) => unicorn.gender === EUnicornGender.male)
      && !!unicorns?.find((unicorn) => unicorn.gender === EUnicornGender.female);
  }
}
