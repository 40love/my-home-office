import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { }

  login(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.username, credentials.password);
  }

  postLoginEvent(){
    this.afStore.collection('users').ref.where('email', '==', localStorage.getItem('loggedIn')).get().then(x => {
      if (x.size === 1) {
        x.forEach(r => {
          r.ref.collection('event').get().then(d => {
            d.forEach(de => {
              de.ref.delete();
            });
            this.postNewEvent('logged in');
          });
        });
      }
    });
  }

  logout() {
    this.postNewEvent('logged out');
    return this.afAuth.auth.signOut();
  }

  postNewEvent(event: string) {
    this.afStore.collection('users').ref.where('email', '==', localStorage.getItem('loggedIn')).get().then(x => {
      if (x.size === 1) {
        x.forEach(r => {
          r.ref.collection('event').doc(new Date().getTime().toString()).set({
            event: event
          });
        });
      }
    });
  }
}
