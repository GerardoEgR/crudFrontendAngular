import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = false;
  private isAmount =  false;
  private isError =  false;
  private isValid =  true;


  constructor() { }

  startLoading() {
    this.isLoading = true;
  }

  stoptLoading() {
    this.isLoading = false;
  }

  getStatusLoading() {
    return this.isLoading;
  }

  startAmount() {
    this.isAmount = true;
  }
  stopAmount() {
    this.isAmount = false;
  }
  getStatusAmount() {
    return this.isAmount;
  }

  startError() {
    this.isError = true;
  }
  stopError() {
    this.isError = false;
  }
  getStatusError() {
    return this.isError;
  }

  startValid() {
    this.isValid = true;
  }
  stopValid() {
    this.isValid = false;
  }
  getStatusValid() {
    return this.isValid;
  }
}
