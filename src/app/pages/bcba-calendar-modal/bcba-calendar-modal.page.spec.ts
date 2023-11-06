import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BcbaCalendarModalPage } from './bcba-calendar-modal.page';

describe('BcbaCalendarModalPage', () => {
  let component: BcbaCalendarModalPage;
  let fixture: ComponentFixture<BcbaCalendarModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BcbaCalendarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BcbaCalendarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
