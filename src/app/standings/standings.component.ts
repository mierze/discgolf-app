import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import * as data from '../../data/mock';
import { Router } from '@angular/router'
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  data: any
  test: FirebaseListObservable<any>
  constructor(public http: Http, public router: Router, public db: AngularFireDatabase) { }

  goToProfile(id) {
    this.router.navigate(['/profile', id]);
  }
  ngOnInit() {
    this.data = data.data
    this.test = this.db.list('/rounds')
    // console.log(this.test)
  }
  formData() {
    for (let p of this.data) {
      console.log(p)
    }
  }
  doSomething(r) {
    return JSON.stringify(r)
  }
  getScore(score, par, handicap) {
    let net = score - par + handicap
    if (net === 0) return 'E'
    if (net > 0) return '+' + net
    else return net
  }

}
