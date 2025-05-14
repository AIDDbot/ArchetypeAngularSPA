import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public info(message: string) {
    console.log(message);
  }

  public error(message: string) {
    console.error(message);
  }

  public warn(message: string) {
    console.warn(message);
  }

  public debug(message: string) {
    console.debug(message);
  }
}
