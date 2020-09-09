import { Component, OnInit, forwardRef, ViewChild, ElementRef, AfterViewChecked, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Subject, fromEvent } from 'rxjs';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilePickerComponent),
    multi: true
  }]
})
export class FilePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  value: any;
  fileName: string;
  private subject = new Subject<any>();
  src: any;
  MB5 = 5242880;
  error = null;

  @Output()
  onSelected = new EventEmitter<any>();

  onChange = (value: any) => { };

  onTouched = () => { };


  constructor(
    private actionSheetController: ActionSheetController,
    private camera: Camera
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.filePickerRef.nativeElement, 'change')
      .subscribe(event => this.chooseFile(event));
    this.subject.subscribe(() => {
      this.filePickerRef.nativeElement.click();
    });
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Adjuntar archivo',
        handler: () => {
          this.openFileDialog();
        }
      }, {
        text: 'Tomar una foto',
        handler: () => {
          this.uploadPhoto();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }

  openFileDialog() {
    this.filePickerRef.nativeElement.click();
  }

  chooseFile(event) {
    const file = event.target.files[0];
    this.error = null;
    if (file.length < this.MB5) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = e => this.src = reader.result;
      reader.readAsDataURL(file);
      this.onSelected.emit(file);
    } else {
      this.error = 'Hasta 5 MB';
    }
  }

  uploadPhoto() {
    const options: CameraOptions = {
      quality: 60,
      targetWidth: 800,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(options)
      .then((imageData: string) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.src = base64Image;
        this.onSelected.emit(base64Image);
      }, error => {
        // Handle error
      });
  }


}
