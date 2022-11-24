import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ERROR_TOAST, INFO_TOAST, SUCCESS_TOAST, WARNING_TOAST} from "../../constants/toast.constants";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private toast: ToastrService,
    private router: Router
  ) {
  }

  // Method to show a toast
  showToast(type: string, title: string, message: string): void {
    const toastSettings: Partial<IndividualConfig> = {
      timeOut: 7000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    };

    if (type === SUCCESS_TOAST) {
      this.toast.success(`${message}`, `${title}`, toastSettings);
    } else if (type === ERROR_TOAST) {
      this.toast.error(`${message}`, `${title}`, toastSettings);
    } else if (type === WARNING_TOAST) {
      this.toast.warning(`${message}`, `${title}`, toastSettings);
    } else if (type === INFO_TOAST) {
      this.toast.info(`${message}`, `${title}`, toastSettings);
    }
  }

  // Method to clear all the toasts in the screen
  clearAllToast(): void {
    this.toast.clear();
  }

  // Method to navigate to other routes
  async navigate(ruta: string, params?: any, relativeTo?: ActivatedRoute): Promise<boolean> {
    return this.router.navigate([`/${ruta}`], {
      queryParams: params ? params : {},
      relativeTo
    });
  }
}
