import { Component, OnInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  Geocoder,
  GeocoderResult,
  Marker,
  GoogleMapsEvent,
  CameraPosition,
  ILatLng,
  LatLng
} from '@ionic-native/google-maps';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormLoqueseaService } from '../form-loquesea/form-loquesea.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapsComponent),
      multi: true
    }]
})
export class MapsComponent implements OnInit, ControlValueAccessor {

  map: GoogleMap;
  map2: GoogleMap;
  loading: any;
  searchAddress: string;
  onChange: any;
  currentPosition: any;
  position: any;
  onTouch: any;
  marker: Marker;
  from: string;

  constructor(
    public loadingCtrl: LoadingController,
    private detector: ChangeDetectorRef,
    private form: FormLoqueseaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.from = params.from;
    });

    this.loadMap();
    this.currentPosition = {
      address: null,
      position: null
    };
  }

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas1');
    this.setInitialLocation();


    this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe((params: any[]) => {
      this.setCurrentLocation(params[0].target);
    });

    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
      this.setCurrentAddress(params[0].target);
    });
  }

  setCurrentAddress(position) {
    Geocoder.geocode({
      position
    }).then((results: GeocoderResult[]) => {
      if (results && results[0]) {
        this.searchAddress = `${results[0].thoroughfare} ${results[0].subThoroughfare}, ${results[0].adminArea}, ${results[0].country}`;
        this.currentPosition.address = this.searchAddress;
        // console.log(this.marker.getPosition());
        this.currentPosition.position = this.marker.getPosition();
        this.detector.detectChanges();
      }
    });
  }

  setCurrentLocation(location) {
    const latLng = new LatLng(location.lat, location.lng);
    this.marker.setPosition(latLng);
  }

  setInitialLocation() {
    this.map.getMyLocation().then((location) => {

      this.marker = this.map.addMarkerSync({
        position: location.latLng
      });

      const position: CameraPosition<ILatLng> = {
        target: this.marker.getPosition(),
        zoom: 16
      };

      this.map.moveCamera(position).then();
    });
  }


  async buscar(event) {
    this.loading = await this.loadingCtrl.create({
      message: 'Espere por favor...'
    });
    await this.loading.present();
    this.map.clear();

    // Address -> latitude,longitude
    Geocoder.geocode({
      'address': this.searchAddress
    })
      .then((results: GeocoderResult[]) => {
        console.log(results);
        this.loading.dismiss();

        if (results.length > 0) {
          let marker: Marker = this.map.addMarkerSync({
            'position': results[0].position,
            'title': JSON.stringify(results[0].position)
          });
          this.map.moveCamera({
            'target': marker.getPosition(),
            'zoom': 17
          });

          this.position = results[0].position;
          this.onChange(this.position);
        } else {
          alert("Not found");
        }
      });
  }

  listo() {
    this.currentPosition.displayText = this.currentPosition.address;
    if (this.from === 'comercio') {
      this.form.agregarDireccionDeBusqueda(this.currentPosition);
    } else {
      this.form.agregarDireccionDeEntrega(this.currentPosition);
    }

  }

}
