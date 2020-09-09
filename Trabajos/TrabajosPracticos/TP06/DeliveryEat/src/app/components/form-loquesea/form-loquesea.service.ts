import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormLoqueseaService {

  form: FormGroup;
  orders: Array<any>;

  emitOrders = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.orders = [];
  }

  crearForm() {
    this.form = this.formBuilder.group({
      Pedido: this.formBuilder.control(null, Validators.required),
      DireccionBusqueda: this.formBuilder.control(null, Validators.required),
      DireccionEntrega: this.formBuilder.control(null, Validators.required),
      TiempoEntrega: this.formBuilder.control(null, Validators.required),
      MetodoDePago: this.formBuilder.control(null, Validators.required)
    });

    return this.form;
  }

  agregarPedido(pedido: any) {
    (this.form.get('Pedido') as FormControl).setValue(pedido);
    this.router.navigate(['pedirloquesea']);
  }

  irAMiPedido() {
    this.router.navigate(['mi-pedido']);
  }

  agregarDireccionDeBusqueda(direccion: any) {
    (this.form.get('DireccionBusqueda') as FormControl).setValue(direccion);
    this.router.navigate(['pedirloquesea']);
  }

  agregarDireccionDeEntrega(direccion: any) {
    (this.form.get('DireccionEntrega') as FormControl).setValue(direccion);
    this.router.navigate(['pedirloquesea']);
  }

  agregarMetodoDePago(metodo: any) {
    (this.form.get('MetodoDePago') as FormControl).setValue(metodo);
    this.router.navigate(['pedirloquesea']);
  }

  getPedido() {
    return (this.form.get('Pedido') as FormControl);
  }

  getTiempoDeEntrega() {
    return (this.form.get('TiempoEntrega') as FormControl);
  }

  getMetodoDePago() {
    return (this.form.get('MetodoDePago') as FormControl);
  }

  getLugarDeEntrega() {
    return (this.form.get('DireccionEntrega') as FormControl);
  }

  getLugarDeComercio() {
    return (this.form.get('DireccionBusqueda') as FormControl);
  }

  agregarTiempoDeEntrega(tiempo: any) {
    (this.form.get('TiempoEntrega') as FormControl).setValue(tiempo);
    this.router.navigate(['pedirloquesea']);
  }

  irALugarDeEntrega() {
    this.router.navigate(['mapa', 'entrega']);
  }

  irALugarDeComercio() {
    this.router.navigate(['mapa', 'comercio']);
  }

  irTiempoDeEntrega() {
    this.router.navigate(['tiempoEntrega']);
  }

  irAMetodoDePago() {
    this.router.navigate(['metodoPago']);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  placeOrder(order) {
    order.id = Math.random() * 1000;
    order.id = (order.id as string).slice(0, 8).replace(/./, '');
    this.orders.push(order);
    this.emitOrders.emit(this.orders);
    this.router.navigate(['order-placed']);
  }

}
