import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormLoqueseaService } from '../components/form-loquesea/form-loquesea.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  orders: Array<any>;

  constructor(private router: Router, private formService: FormLoqueseaService) {

  }

  ngOnInit(): void {
    this.formService.emitOrders.subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

  hacerUnPedido() {
    this.router.navigate(['pedirloquesea']);
  }

}
