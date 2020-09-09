

import { AbstractControl, ValidatorFn } from '@angular/forms';


export function cardNumberValid(): ValidatorFn {
  return (control: AbstractControl): {
    [key: string]: any
  } | null => {
    const strValue: string = control.value;
    return strValue.replace(/\s/, '').trim().length === 16 ? null : { cardNumber: 'Nº no válido'};
  };
}

export function vencimientoValid(): ValidatorFn {
  return (control: AbstractControl): {
    [key: string]: any
  } | null => {
    const strValue: string = control.value;
    return strValue.replace(/\s/, '').trim().length === 16 ? null : { cardNumber: 'Nº no válido'};
  };
}



