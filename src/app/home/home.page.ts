import { filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Unicorn } from '../core/models/unicorn.model';
import { UnicornService } from '../core/services/unicorns.service';
import { OnDestroyListener, takeUntilDestroy } from '@paddls/ngx-common';

@OnDestroyListener()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  unicorns$: Observable<Unicorn[]>;
  atLeastOneMaleAndOneFemale = false;


  constructor(
    private readonly unicornService: UnicornService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,

  ) { }

  ionViewWillEnter() {
    this.unicorns$ = this.unicornService.getAllUnicorns();
    this.watchUnicorns();
  }

  onClickNavigateToCreatePage() {
    this.router.navigate(['/', 'create']);
  }

  onClickNavigateToLovePage() {
    this.router.navigate(['/', 'love']);
  }

  private watchUnicorns(): void {
    this.unicorns$.pipe(
      takeUntilDestroy(this),
      filter(unicorns => !!unicorns)
    ).subscribe((unicorns) => {
      this.atLeastOneMaleAndOneFemale = this.unicornService.atLeastOneMaleAndOneFemale(unicorns);
      this.cdr.markForCheck();
    });
  }
}
