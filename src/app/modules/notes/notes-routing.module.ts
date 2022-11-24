import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotesViewComponent} from "./components/notes-view/notes-view.component";
import {AuthenticatedGuard} from "../../core/guards/authenticated/authenticated.guard";

const routes: Routes = [
  {
    path: '',
    component: NotesViewComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule {
}
