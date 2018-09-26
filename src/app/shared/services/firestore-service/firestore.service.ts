import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Select} from '@ngxs/store';
import {AuthState} from '../../state/auth.state';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements OnInit, OnDestroy {
  @Select(AuthState.uid) $uid: Observable<string>;
  uidSubscription: Subscription;
  uid: string;
  constructor(public db: AngularFirestore) {

  }

  ngOnInit() {
    this.uidSubscription = this.$uid.subscribe((data) => this.uid = data);
  }

  ngOnDestroy() {
    this.uidSubscription.unsubscribe();
  }
  getAllProducts() {
    return this.db.collection(`products`).ref
      .where('isListable', '==', true)
      .where('isDeleted', '==', false)
      .get();
  }

  setFavorite(favorite: string[]) {
    return this.db.collection('people').doc(this.uid).set({favorite: favorite}, {merge: true});
  }

}
