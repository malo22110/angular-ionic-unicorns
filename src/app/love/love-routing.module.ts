import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LovePage } from './love.page';

const routes: Routes = [
  {
    path: '',
    component: LovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LovePageRoutingModule {}
