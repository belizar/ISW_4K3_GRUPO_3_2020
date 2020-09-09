import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { cardNumberValid } from '../validators/validators';
import { FormLoqueseaService } from '../form-loquesea/form-loquesea.service';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MetodoPagoComponent),
      multi: true
    }]
})
export class MetodoPagoComponent implements OnInit, ControlValueAccessor {

  value: any;
  showTarjeta = false;
  model: any;
  metodoForm: FormGroup;
  vencValido = true;

  constructor(private fb: FormBuilder, private formService: FormLoqueseaService) { }

  ngOnInit() {
    this.value = {
      metodo: 'cash'
    };
    this.metodoForm = this.fb.group({
      cash: this.fb.control(0, [Validators.required, Validators.min(0)])
    });
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  valueChange({ detail: { value } }) {
    console.log(value);
    if (value === 'cash') {
      this.value = {
        metodo: 'cash'
      };
      this.showTarjeta = false;
      this.metodoForm = this.fb.group({
        cash: this.fb.control(0, [Validators.required, Validators.min(0)])
      });
    } else {
      this.value = {
        metodo: 'tarjeta',
      };
      this.metodoForm = this.fb.group({
        cardNumber: this.fb.control(null, [Validators.required, Validators.pattern(/^4/), cardNumberValid]),
        vencimientoMes: this.fb.control(null, [Validators.required, Validators.max(12), Validators.min(1)]),
        vencimientoAnio: this.fb.control(null, [Validators.required, Validators.pattern(/\d{2}/)]),
        titular: this.fb.control(null, [Validators.required]),
        cvc: this.fb.control(null, [Validators.required, Validators.pattern(/[0-9]{3}/)])
      });
      this.showTarjeta = true;
    }
  }

  getCardNumberControl() {
    return (this.metodoForm.get('cardNumber') as FormControl);
  }

  getCardNumberError() {
    return this.getCardNumberControl() && this.getCardNumberControl().touched && this.getCardNumberControl().errors
      ? this.getCardNumberControl().errors : null;
  }

  getVencimientoMesControl() {
    return (this.metodoForm.get('vencimientoMes') as FormControl);
  }

  getVencimientoMesError() {
    return this.getVencimientoMesControl() && this.getVencimientoMesControl().touched && this.getVencimientoMesControl().errors
      ? this.getVencimientoMesControl().errors : null;
  }


  getVencimientoAnioControl() {
    return (this.metodoForm.get('vencimientoAnio') as FormControl);
  }

  getVencimientoAnioError() {
    return this.getVencimientoAnioControl() && this.getVencimientoAnioControl().touched && this.getVencimientoAnioControl().errors
      ? this.getVencimientoAnioControl().errors : null;
  }

  getCvcControl() {
    return (this.metodoForm.get('cvc') as FormControl);
  }

  getCvcError() {
    return this.getCvcControl() && this.getCvcControl().touched && this.getCvcControl().errors
      ? this.getCvcControl().errors : null;
  }

  getTitularControl() {
    return (this.metodoForm.get('titular') as FormControl);
  }

  getTitularError() {
    return this.getTitularControl() && this.getTitularControl().touched && this.getTitularControl().errors
      ? this.getTitularControl().errors : null;
  }

  combinacionVencimientoValida() {
    const mes = this.getVencimientoMesControl().value;
    const anio = this.getVencimientoAnioControl().value;
    const today = new Date();

    if (mes >= today.getMonth() + 1 && anio >= today.getFullYear().toString().slice(2,4)) {
      return true;
    }

    return false;
  }

  listo() {
    this.formService.validateAllFormFields(this.metodoForm);
    this.vencValido = this.combinacionVencimientoValida();

    if (this.vencValido && this.metodoForm.valid) {
      if (this.value.metodo === 'tarjeta') {
        const formValue = this.metodoForm.value;
        formValue.displayText = `VISA ${formValue.cardNumber}`;
        this.formService.agregarMetodoDePago(formValue);
      } else {
        const formValue = this.metodoForm.value;
        formValue.displayText = `$ ${formValue.cash}`;
        this.formService.agregarMetodoDePago(formValue);
      }
    }
  }
}
