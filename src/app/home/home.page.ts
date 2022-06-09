import { filter, takeUntil } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Unicorn } from '../core/models/unicorn.model';
import { UnicornService } from '../core/services/unicorns.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {

  unicorns$: Observable<Unicorn[]>;
  atLeastOneMaleAndOneFemale = false;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly unicornService: UnicornService,
    private readonly router: Router
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
  }

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
      takeUntil(this.onDestroy$),
      filter(unicorns => !!unicorns)
    ).subscribe((unicorns) => {
      this.atLeastOneMaleAndOneFemale = this.unicornService.atLeastOneMaleAndOneFemale(unicorns);
    });
  }
}
