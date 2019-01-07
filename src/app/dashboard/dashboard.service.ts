import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getCurrentUser() {
    return this.afStore.collection('users').ref.where('email', '==', localStorage.getItem('loggedIn')).get();
  }

  addRequest(req) {
    this.postNewEvent('request added');
    return this.afStore.collection('requests').add(req);
  }

  getRequests() {
    return this.afStore.collection('requests').ref.get();
  }

  changeRequestStatus(req) {
    this.postNewEvent('request updated');
    return this.afStore.collection('requests').doc(req.id).update(req);
  }

  deleteRequest(req) {
    this.postNewEvent('request deleted');
    return this.afStore.collection('requests').doc(req.id).delete();
  }

  postNewEvent(eventS: string) {
    this.afStore.collection('users').ref.where('email', '==', localStorage.getItem('loggedIn')).get().then(x => {
      if (x.size === 1) {
        x.forEach(r => {
          r.ref.collection('event').doc(new Date().getTime().toString()).set({
            event: eventS
          });
        });
      }
    });
  }

}
