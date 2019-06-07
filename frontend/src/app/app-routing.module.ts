import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path:'', redirectTo:'register', pathMatch:'full' },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: MainPageComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'callback', component: CallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
