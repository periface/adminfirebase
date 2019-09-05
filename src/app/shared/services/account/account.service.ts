import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IUserAccount, UserAccount } from './models/account.models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accountCollection: AngularFirestoreCollection<UserAccount>;
  /**
   *
   */
  items$: Observable<UserAccount[]>;
  nameFilter$: BehaviorSubject<string | null>;
  pageFilter$: BehaviorSubject<number | null>;
  firstInResponse: UserAccount;
  lastInResponse: UserAccount;
  constructor(private afs: AngularFirestore) {
    this.nameFilter$ = new BehaviorSubject(null);
    this.items$ = combineLatest(this.nameFilter$, this.pageFilter$).pipe(
      switchMap(([name, pageFilter]) =>
        (this.accountCollection = this.afs.collection<UserAccount>(
          'accounts',
          ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (name) {
              query = query.where('name', '==', name);
            }
            query.limit(10);
            query.orderBy('name', 'desc');
            if (pageFilter) {
              query.startAfter(this.lastInResponse);
            }
            return query;
          }
        ))
          .snapshotChanges()
          .pipe(
            map(actions => {
              this.firstInResponse = actions[0].payload.doc.data();
              this.lastInResponse = actions[
                actions.length - 1
              ].payload.doc.data();
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                const doc = a.payload.doc;
                return { id, ...data, doc };
              });
            })
          )
      )
    );
  }
  nextPage() {
    this.pageFilter$.next(1);
  }
  prevPage() {
    this.pageFilter$.next(0);
  }
  getAccount(accountId: string): Observable<UserAccount> {
    return this.afs
      .doc<UserAccount>(`users/${accountId}`)
      .snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return { id, ...data };
        })
      );
  }
  updateAccount(account: IUserAccount) {}
  createAccount(account: IUserAccount) {}
}
