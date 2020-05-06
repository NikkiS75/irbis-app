import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ReceptionPageComponent} from './reception-page/reception-page.component';
import {ClientsPageComponent} from './clients-page/clients-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {ReportPageComponent} from './report-page/report-page.component';
import {ClientPageComponent} from './client-page/client-page.component';
import {ClientCreateComponent} from './client-create/client-create.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'reception', component: ReceptionPageComponent},
      {path: 'client-create', component: ClientCreateComponent},
      {path: 'clients', component: ClientsPageComponent},
      {path: 'settings', component: SettingsPageComponent},
      {path: 'reports', component: ReportPageComponent},
      {path: 'client/:id', component: ClientPageComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
