import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

// ToDo: use app token to add app name to the log
// ToDo: add timestamp to the log
// ToDo: add emoji based on log level

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
