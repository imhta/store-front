import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable()
export class PwaService {
  constructor(private swUpdate: SwUpdate) {


    swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();
      }
    });
  }

  askUserToUpdate() {
    return false;
  }

//   window.addEventListener('beforeinstallprompt', event => {
//   this.promptEvent = event;
// });

}
