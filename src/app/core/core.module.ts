import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreServiceModule } from './core-service.module';
import { NgxSerializerModule } from '@witty-services/ngx-serializer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreServiceModule,
    SharedModule,
    NgxSerializerModule.forRoot({
      normalizerConfiguration: {
        denormalizeNull: true,
        normalizeNull: true
      }
    }),
  ],
  providers: [],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
