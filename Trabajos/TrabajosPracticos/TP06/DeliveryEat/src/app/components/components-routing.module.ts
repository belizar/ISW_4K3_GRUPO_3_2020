import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormLoqueseaComponent } from './form-loquesea/form-loquesea.component';
import { MiPedidoComponent } from './mi-pedido/mi-pedido.component';
import { MapsComponent } from './maps/maps.component';
import { TiempoEntregaComponent } from './tiempo-entrega/tiempo-entrega.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';

const routes: Routes = [
  {
    path: '',
    component: FormLoqueseaComponent
  },
  {
    path: 'mi-pedido',
    component: MiPedidoComponent
  },
  {
    path: 'mapa/:from',
    component: MapsComponent
  },
  {
    path: 'tiempoEntrega',
    component: TiempoEntregaComponent
  },
  {
    path: 'metodoPago',
    component: MetodoPagoComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
