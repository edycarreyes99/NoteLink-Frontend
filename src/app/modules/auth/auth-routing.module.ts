import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginViewComponent} from "./components/login-view/login-view.component";
import {NoAuthenticatedGuard} from "../../core/guards/no-authenticated/no-authenticated.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent,
    canActivate: [NoAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
