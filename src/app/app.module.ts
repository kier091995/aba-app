import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { PostProviderService } from './providers/post-provider.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [PostProviderService, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AppVersion],
  bootstrap: [AppComponent],
})
export class AppModule {}
