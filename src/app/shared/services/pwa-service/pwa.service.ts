import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable()
export class PwaService {
  promptEvent;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {

      if (PwaService.askUserToUpdate()) {
        window.location.reload();
      }
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  static askUserToUpdate() {
    return false;
  }

}
