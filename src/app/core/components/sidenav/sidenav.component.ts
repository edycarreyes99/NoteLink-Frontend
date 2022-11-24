import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  // Component variables
  sidenavOpened = true;

  // Method to open or close the sidenav
  openCloseSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

}
