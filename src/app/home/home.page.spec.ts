import { NgxSerializerModule } from '@witty-services/ngx-serializer';
import { StorageService } from '../core/services/storage.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UnicornService } from '../core/services/unicorns.service';
import { SharedModule } from '../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';
import { Storage } from '@ionic/storage-angular';
import { HomeTestPage } from './home.page.test';
import { of } from 'rxjs';
import { UnicornMock } from '../core/models/unicorn.mock';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let page: HomeTestPage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage
      ],
      imports: [
        RouterTestingModule,
        NgxSerializerModule.forRoot(),
        IonicModule.forRoot(),
        SharedModule
      ],
      providers: [
        UnicornService,
        StorageService,
        Storage
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    page = new HomeTestPage(fixture);
  }));

  describe('INIT', () => {

    it('should call watchUnicorns', () => {
      const spy = spyOn(component as any, 'watchUnicorns');
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should not display unicorns list', () => {
      fixture.detectChanges();

      expect(page.unicornsList).toBeFalsy();
    });

    it('should display empty message', () => {
      fixture.detectChanges();

      expect(page.emptyState).toBeTruthy();
    });

    it('should display unicorns list', () => {
      spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').and.returnValue(of([UnicornMock.unicornMockObj]));
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(page.unicornsList).toBeTruthy();
    });

    it('should display unicorn name', () => {
      spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').and.returnValue(of([UnicornMock.unicornMockObj]));
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(page.getUnicornName(0).nativeElement.textContent.trim()).toEqual(UnicornMock.unicornMockObj.name);
    });

    it('should display unicorn gender', () => {
      spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').and.returnValue(of([UnicornMock.unicornMockObj]));
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(page.getUnicornGender(0).nativeElement.textContent.trim()).toEqual(UnicornMock.unicornMockObj.gender);
    });

    it('should display unicorn age', () => {
      spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').and.returnValue(of([UnicornMock.unicornMockObj]));
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(page.getUnicornAge(0).nativeElement.textContent.trim()).toEqual(`Age: ${UnicornMock.unicornMockObj.age}`);
    });

    it('should not display love button', () => {
      spyOn(TestBed.inject(UnicornService), 'atLeastOneMaleAndOneFemale').and.returnValue(false);
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(page.btnMakeLove).toBeFalsy();
    });

    it('should display love button', () => {
      spyOn(TestBed.inject(UnicornService), 'atLeastOneMaleAndOneFemale').and.returnValue(true);
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(page.btnMakeLove).toBeFalsy();
    });

    it('should call onClickNavigateToCreatePage', () => {
      const spy = spyOn(component, 'onClickNavigateToCreatePage');
      fixture.detectChanges();
      page.btnCreate.nativeElement.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });


    describe('#watchUnicorns', () => {
    it('should set atLeastOneMaleAndOneFemale false', () => {
      spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').and.returnValue(of([UnicornMock.unicornMockObj]));
      spyOn(TestBed.inject(UnicornService), 'atLeastOneMaleAndOneFemale').and.returnValue(false);
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.atLeastOneMaleAndOneFemale).toEqual(false);
    });

    it('should set atLeastOneMaleAndOneFemale true', () => {
      spyOn(TestBed.inject(UnicornService), 'getAllUnicorns').and.returnValue(of([UnicornMock.unicornMockObj]));
      spyOn(TestBed.inject(UnicornService), 'atLeastOneMaleAndOneFemale').and.returnValue(true);
      fixture.detectChanges();
      component.ionViewWillEnter();
      fixture.detectChanges();

      expect(component.atLeastOneMaleAndOneFemale).toEqual(true);
    });
  });
});
