import {Directive, HostListener, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Directive({
  selector: '[jasperoTouchFormOnHover]'
})
export class TouchFormOnHoverDirective {
  @Input('jasperoTouchFormOnHover') jasperoTouchFormOnHover: FormGroup;

  @HostListener('mouseenter')
  enter() {
    this._markFormGroupTouched(this.jasperoTouchFormOnHover);
  }

  private _markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control && control.controls) {
        if (Array.isArray(control.controls)) {
          control.controls.forEach(c => this._markFormGroupTouched(c));
        } else {
          for (const key in control.controls) {
            if (control.controls.hasOwnProperty(key)) {
              control.controls[key].markAsTouched();
            }
          }
        }
      }
    });
  }
}
