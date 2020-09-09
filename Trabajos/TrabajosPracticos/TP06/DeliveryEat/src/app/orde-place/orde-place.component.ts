import { Component, OnInit } from '@angular/core';
import {  take } from 'rxjs/operators';
import { interval } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orde-place',
  templateUrl: './orde-place.component.html',
  styleUrls: ['./orde-place.component.scss'],
})
export class OrdePlaceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    interval(3000).pipe(
      take(1),
    ).subscribe( () => {
      this.router.navigate(['home']);
    });
  }

}
