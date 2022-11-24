import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  // Input variables
  @Input() sidenavOpened = false;

  // Method to open or close the sidenav
  openCloseSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

}
