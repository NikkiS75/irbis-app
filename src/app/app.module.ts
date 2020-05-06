import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { ReportPageComponent } from './report-page/report-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientCreateComponent } from './client-create/client-create.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,

    MainLayoutComponent,
    LoginPageComponent,
    ReceptionPageComponent,
    ClientsPageComponent,
    SettingsPageComponent,
    ReportPageComponent,
    ClientPageComponent,
    ClientCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
