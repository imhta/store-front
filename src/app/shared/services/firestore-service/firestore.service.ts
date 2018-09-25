import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(public db: AngularFirestore) {
  }

  getAllProducts() {
    return this.db.collection(`products`).ref
      .where('isListable', '==', true)
      .where('isDeleted', '==', false)
      .get();
  }
}
