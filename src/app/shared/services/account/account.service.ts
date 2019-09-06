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
  firstInResponse: any = [];
  lastInResponse: any = [];
  constructor(private afs: AngularFirestore) {
    this.nameFilter$ = new BehaviorSubject(null);
    this.pageFilter$ = new BehaviorSubject(null);
    this.items$ = combineLatest(this.nameFilter$, this.pageFilter$).pipe(
      switchMap(([name, pageFilter]) =>
        (this.accountCollection = this.afs.collection<UserAccount>(
          'users',
          ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (name) {
              query = query.where('name', '==', name);
            }
            query.orderBy('name', 'desc');
            if (pageFilter === 1) {
              query.startAfter(this.lastInResponse);
            }
            if (pageFilter === 0) {
              query.startAt(this.firstInResponse);
            }
            query.limit(10);
            return query;
          }
        ))
          .snapshotChanges()
          .pipe(
            map(actions => {
              if (actions.length) {
                this.firstInResponse = actions[0].payload.doc;
                this.lastInResponse = actions[actions.length - 1].payload.doc;
              }

              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
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
  updateAccount({
    id,
    account
  }: {
    id: string;
    account: IUserAccount;
  }): Promise<void> {
    return this.afs.doc<UserAccount>(`users/${id}`).set(account);
  }
  createAccount(input: { id: string; account: IUserAccount }): Promise<void> {
    return this.afs.doc(`users/${input.id}`).set(input.account);
  }
}
