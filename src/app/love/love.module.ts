import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LovePageRoutingModule } from './love-routing.module';

import { LovePage } from './love.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LovePageRoutingModule,
    SharedModule
  ],
  declarations: [LovePage]
})
export class LovePageModule { }
