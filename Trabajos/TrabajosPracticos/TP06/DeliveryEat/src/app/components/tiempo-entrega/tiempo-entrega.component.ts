import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FormLoqueseaService } from '../form-loquesea/form-loquesea.service';


@Component({
  selector: 'app-tiempo-entrega',
  templateUrl: './tiempo-entrega.component.html',
  styleUrls: ['./tiempo-entrega.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiempoEntregaComponent),
      multi: true
    }]
})
export class TiempoEntregaComponent implements OnInit, ControlValueAccessor {

  onChange: any;
  onTouch: any;
  value: any;
  selected: any;
  showPedidoProgramado = false;
  date: any;
  time: any;
  form: FormGroup;


  constructor(private formBuilder: FormBuilder, private datePicker: DatePicker, private formService: FormLoqueseaService) { }

  ngOnInit() {
    this.value = {
      entregar: 'lap'
    };
    this.form = this.formBuilder.group({
      entregar: 'lap'
    });
  }

  pickADate() {
    this.datePicker.show({
      minDate: new Date(),
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.date = date;
        this.getDateControl().setValue(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  pickATime() {
    this.datePicker.show({
      minDate: new Date(),
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.time = date;
        this.getTimeControl().setValue(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  formatDate(date: Date) {
    return date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '';
  }

  formatTime(date: Date) {
    console.log(date.getMinutes());
    console.log(date);
    return date ? `${date.getHours()}:${this.formatMinutes(date.getMinutes().toString())}` : '';
  }

  formatMinutes(minutes: string) {
   return minutes.length === 1 ? `0${minutes}` : minutes;
  }

  valueChange({ detail: { value } }) {
    console.log(value);
    if (value === 'lap') {
      this.value = {
        entregar: 'lap'
      };
      this.showPedidoProgramado = false;
      this.date = null;
      this.time = null;
      this.form = this.formBuilder.group({
        entregar: 'lap'
      });
    } else {
      this.value = {
        entregar: 'ppp'
      };
      this.form = this.formBuilder.group({
        entregar: 'ppp',
        date: this.formBuilder.control(null, [Validators.required]),
        time: this.formBuilder.control(null, [Validators.required]),
      });
      this.showPedidoProgramado = true;
    }
  }


  getDateControl() {
    return (this.form.get('date') as FormControl);
  }

  getDateError() {
    return this.getDateControl().touched && this.getDateControl().errors
    ? this.getDateControl().errors : null;
  }

  getTimeErrors() {
    return this.getTimeControl().touched && this.getTimeControl().errors
    ? this.getTimeControl().errors : null;
  }

  getTimeControl() {
    return (this.form.get('time') as FormControl);
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
    this.formService.validateAllFormFields(this.form);
    if (this.form.valid) {
      if (this.value.entregar === 'lap') {
        const formValue = this.form.value;
        formValue.displayText = 'Lo antes posible';
        this.formService.agregarTiempoDeEntrega(formValue);
      } else {
        const formValue = this.form.value;
        formValue.displayText = `Programado para ${this.formatDate(this.date)} ${this.formatTime(this.time)}`;
        this.formService.agregarTiempoDeEntrega(formValue);
      }
    }
  }

}
