import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Museum } from '../models/museum';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MuseumsService {
  museums: Observable<Museum[]>;

  constructor(public mev: AngularFireDatabase) {

    this.museums = this.mev.list('museums').valueChanges();
    // this.mev.collection('meviz').valueChanges();

  }

  getMuseums() {
    return this.museums;
  }


}

