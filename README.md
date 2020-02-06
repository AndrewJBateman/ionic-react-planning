# Ionic Angular Http Interceptor

Ionic-Angular tutorial app to experiment with a Http interceptor service.

## Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

* Http Interceptor to handle requests with a loading indication and retry logic.

* Http interceptors are added to the request pipeline in the providers section of `app.module.ts`.

* All code by Simon Grimm of the [Ionic Academy](https://ionicacademy.com/).

## Screenshots

![Ionic page](./img/error.png)

## Technologies

* [Ionic v5.0.0](https://ionicframework.com/)
* [Angular v8.1.2](https://angular.io/)
* [Ionic/angular v4.7.1](https://www.npmjs.com/package/@ionic/angular) 

## Setup

* To start the server on _localhost://8100_ type: 'ionic serve'

## Code Examples

* helper function to handle a server 401 Unauthorized error

```typescript
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
```

## Features

* Fake http service. Requires further coding to be fully functional.

## Status & To-do list

* Status: Part working

* To-do: There is missing code because it requires a subscription to the Ionic Academy to see the complete code base. I have followed the code shown in the Youtube video - see below.

## Inspiration

* [Simon Grimm, Ionic Academy Tutorial: How to Build an Ionic HTTP Loading Interceptor & Retry Logic](https://www.youtube.com/watch?v=IJWCpa_-MeU)
* [Angular 8 - Basic HTTP Authentication Tutorial & Example](https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example)

## Contact

Repo created by [ABateman](https://www.andrewbateman.org) - feel free to contact me!