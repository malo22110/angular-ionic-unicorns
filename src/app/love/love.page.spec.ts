import { NgxSerializerModule } from '@witty-services/ngx-serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LovePage } from './love.page';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../core/services/storage.service';
import { UnicornService } from '../core/services/unicorns.service';

describe('LovePage', () => {
  let component: LovePage;
  let fixture: ComponentFixture<LovePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LovePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        NgxSerializerModule.forRoot()
      ],
      providers: [
        Storage,
        StorageService,
        UnicornService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
