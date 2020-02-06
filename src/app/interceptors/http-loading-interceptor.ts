import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, pipe, throwError } from 'rxjs';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { retryWhen, delay, take, tap, map, catchError, finalize, switchMap } from 'rxjs/operators';
import { FakeHttpService } from '../services/fake-http.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

	constructor(
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private fakeHttp: FakeHttpService
	) {	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loadingCtrl.getTop().then(hasLoading => {
			if (!hasLoading) {
				this.loadingCtrl.create({
					spinner: 'circular',
					translucent: true
				}).then(loading => loading.present());
			}
		});

		return next.handle(request).pipe(
			catchError(err => {
				if (err instanceof HttpErrorResponse) {
					switch ((<HttpErrorResponse>err).status) {
						case 401:
							return this.handle401Error(request, next);
						default:
							return throwError(err);
					}
				} else {
					return throwError(err);
				}
			}),
			retryWhen(err => {
				let retries = 1;
				return err.pipe(
					delay(1000),
					tap(() => {
						this.showRetryToast(retries)
					}),
					map(error => {
						if (retries++ === 3) {
							throw error;
						}
						return error;
					})
				)
			}),
			catchError(err => {
				console.log('error: ', err);
				this.presentFailedAlert(err.error['msg']);
				return EMPTY;
			}),
			finalize(() => {
				this.loadingCtrl.getTop().then(hasLoading => {
					if (hasLoading) {
						this.loadingCtrl.dismiss();
					}
				});
			})
		);
	}

	async showRetryToast(retryCount) {
		const toast = await this.toastCtrl.create({
			message: `Retry: ${retryCount}/3`,
			duration: 1000
		});
		toast.present();
	}

	async presentFailedAlert(msg) {
		const alert = await this.alertCtrl.create({
			header: 'Oh dear',
			message: msg,
			buttons: ['OK']
		});
		await alert.present();
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		console.log('should refresh token');
		return this.fakeHttp.getToken().pipe(
			switchMap(res => {
				console.log('in switchmap: ', res);
				// store token

				const token = res['token'];
				request = request.clone({
					setParams: {
						token
					}
				});
				return next.handle(request);
			})
		);
	}

}