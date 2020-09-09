import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormLoqueseaService } from './form-loquesea.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-form-loquesea',
  templateUrl: './form-loquesea.component.html',
  styleUrls: ['./form-loquesea.component.scss'],
})
export class FormLoqueseaComponent implements OnInit {

  form: FormGroup;
  pedido: string;
  tiempoEntrega: string;
  metodoDePago: string;
  lugarDeComercio: any;
  lugarDeEntrega: any;

  constructor(private formService: FormLoqueseaService, private router: Router) { }

  ngOnInit() {
    this.form = this.formService.crearForm();

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && e.url === '/pedirloquesea') {
        this.updateForm();
      }
    }
    );
  }

  updateForm() {
    if (this.formService.getPedido().value) {
      this.pedido = this.formService.getPedido().value.displayText;
    }
    if (this.formService.getTiempoDeEntrega().value) {
      this.tiempoEntrega = this.formService.getTiempoDeEntrega().value.displayText;
    }
    if (this.formService.getMetodoDePago().value) {
      this.metodoDePago = this.formService.getMetodoDePago().value.displayText;
    }
    if (this.formService.getLugarDeComercio().value) {
      console.log(this.formService.getLugarDeComercio().value);
      this.lugarDeComercio = this.formService.getLugarDeComercio().value.displayText;
    }
    if (this.formService.getLugarDeEntrega().value) {
      console.log(this.formService.getLugarDeEntrega().value);
      this.lugarDeEntrega = this.formService.getLugarDeEntrega().value.displayText;
    }
  }

  getPedidoErrores() {
    return this.formService.getPedido() &&
      this.formService.getPedido().touched &&
      this.formService.getPedido().errors
      ? this.formService.getPedido().errors : null;
  }

  getTiempoDeEntregaErrores() {
    return this.formService.getTiempoDeEntrega() &&
      this.formService.getTiempoDeEntrega().touched &&
      this.formService.getTiempoDeEntrega().errors
      ? this.formService.getTiempoDeEntrega().errors : null;
  }

  getMetodoDePagoErrores() {
    return this.formService.getMetodoDePago() &&
      this.formService.getMetodoDePago().touched &&
      this.formService.getMetodoDePago().errors
      ? this.formService.getMetodoDePago().errors : null;
  }

  getLugarDeComercioErrores() {
    return this.formService.getLugarDeComercio() &&
      this.formService.getLugarDeComercio().touched &&
      this.formService.getLugarDeComercio().errors
      ? this.formService.getLugarDeComercio().errors : null;
  }

  getLugarDeEntregaErrores() {
    return this.formService.getLugarDeEntrega() &&
      this.formService.getLugarDeEntrega().touched &&
      this.formService.getLugarDeEntrega().errors
      ? this.formService.getLugarDeEntrega().errors : null;
  }

  irAMiPedido() {
    this.formService.irAMiPedido();
  }

  irALugarDeEntrega() {
    this.formService.irALugarDeEntrega();
  }

  irALugarDeComercio() {
    this.formService.irALugarDeComercio();
  }

  irATiempoDeEntrega() {
    this.formService.irTiempoDeEntrega();
  }

  irAMetodoDePago() {
    this.formService.irAMetodoDePago();
  }

  placeOrder() {
    this.formService.validateAllFormFields(this.form);
    console.log(this.form.valid);
    if (this.form.valid) {
      this.formService.placeOrder(this.form.value);
    }
  }

}
