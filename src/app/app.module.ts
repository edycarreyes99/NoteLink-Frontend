import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NotesModule} from "./modules/notes/notes.module";
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatLineModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { NavbarComponent } from './core/components/navbar/navbar.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotesModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatLineModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
