import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps/maps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLoqueseaComponent } from './form-loquesea/form-loquesea.component';
import { MiPedidoComponent } from './mi-pedido/mi-pedido.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { TiempoEntregaComponent } from './tiempo-entrega/tiempo-entrega.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { Camera } from '@ionic-native/camera/ngx';
import { CardNumberMaskDirective } from './directives/card-number-mask.directive';
import { CvcMaskDirective } from './directives/cvc-mask.directive';
import { VencMaskDirective } from './directives/venc-mask.directive';

const components = [
  MapsComponent,
  FormLoqueseaComponent,
  MiPedidoComponent,
  MetodoPagoComponent,
  TiempoEntregaComponent,
  FilePickerComponent,
];

@NgModule({
  declarations: [components, CardNumberMaskDirective, CvcMaskDirective, VencMaskDirective],
  exports: [components],
  providers: [DatePicker, Geolocation, Camera],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
  ]
})
export class ComponentsModule { }
