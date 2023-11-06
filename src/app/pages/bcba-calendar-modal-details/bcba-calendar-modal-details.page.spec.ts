import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BcbaCalendarModalDetailsPage } from './bcba-calendar-modal-details.page';

describe('BcbaCalendarModalDetailsPage', () => {
  let component: BcbaCalendarModalDetailsPage;
  let fixture: ComponentFixture<BcbaCalendarModalDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BcbaCalendarModalDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BcbaCalendarModalDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
