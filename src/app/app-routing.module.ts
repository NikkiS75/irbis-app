import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ReceptionPageComponent} from './reception-page/reception-page.component';
import {ClientsPageComponent} from './clients-page/clients-page.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {ClientPageComponent} from './client-page/client-page.component';
import {ClientCreateComponent} from './client-create/client-create.component';
import {AuthGuard} from './shared/services/auth.guard';
import {EditPageComponent} from './edit-page/edit-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'reception', component: ReceptionPageComponent, canActivate: [AuthGuard]},
      {path: 'client-create', component: ClientCreateComponent, canActivate: [AuthGuard]},
      {path: 'clients', component: ClientsPageComponent, canActivate: [AuthGuard]},
      {path: 'settings', component: SettingsPageComponent, canActivate: [AuthGuard]},
      {path: 'client/:id', component: ClientPageComponent, canActivate: [AuthGuard]},
      {path: 'client/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
