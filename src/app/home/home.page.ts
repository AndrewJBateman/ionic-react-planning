import { Component } from '@angular/core';
import { FakeHttpService } from '../services/fake-http.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fakeHttp: FakeHttpService,
    private toastCtrl: ToastController
  ) {}

  getSuccess() {
    this.fakeHttp.getSuccess().subscribe(res => {
      console.log('getSuccess: ', res);
      this.showToast(res['msg']);
    });
  }

  getFailed() {
    this.fakeHttp.getFailed().subscribe(res => {
      console.log('getFailed: ', res);
    })
  }

  getRetryFailed() {
    this.fakeHttp.getRetryFailed().subscribe(res => {
      console.log('getRetryFailed: ', res);
    })
  }

  getAuthFailed() {
    this.fakeHttp.getAuthFailed().subscribe(res => {
      console.log('getAuthFailed: ', res);
    })
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
