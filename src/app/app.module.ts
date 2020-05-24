import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReceptionPageComponent } from './reception-page/reception-page.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ClientCreateComponent } from './client-create/client-create.component';

import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/services/auth.guard';
import {AuthInterceptor} from './shared/auth.interceptor';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {SearchPipe} from './shared/search.pipe';
import {SearchClientPipe} from './shared/search-client.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EditPageComponent } from './edit-page/edit-page.component';

registerLocaleData(ruLocale, 'ru')
const INTERCEPTOR_PROVIDER: Provider ={
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}
const maskConfig: Partial<IConfig> = {
  validation: false,
};

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainLayoutComponent,
    LoginPageComponent,
    ReceptionPageComponent,
    ClientsPageComponent,
    SettingsPageComponent,
    ClientPageComponent,
    ClientCreateComponent,
    SearchPipe,
    SearchClientPipe,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, AuthGuard, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
