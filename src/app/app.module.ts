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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {NgxMasonryModule} from "ngx-masonry";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {NoteLinkHttpInterceptor} from "./core/http/interceptors/notelink-http-interceptor.service";

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMasonryModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoteLinkHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
