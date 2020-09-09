import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormLoqueseaService } from '../form-loquesea/form-loquesea.service';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.component.html',
  styleUrls: ['./mi-pedido.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MiPedidoComponent),
            multi: true
    }]
})
export class MiPedidoComponent implements OnInit, ControlValueAccessor {

  onChange: any;
  onTouch: any;
  value: any;
  error: string;

  constructor(private formService: FormLoqueseaService) { }

  ngOnInit() {
    this.value = {
      texto: '',
      imagen: null
    };
    this.error = null;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  listo() {
    if (this.value.texto || this.value.imagen) {
      this.error = null;
      if (this.value.imagen && !this.value.texto) {
        this.value.displayText = 'Imagen Adjuntada';
      } else {
        this.value.displayText = this.value.texto;
      }

      this.formService.agregarPedido(this.value);
    } else {
      this.error = 'Debe ingresar su pedido';
    }
  }

  selectedFile(file) {
    console.log(file);
    this.value.imagen = file;
  }

}
