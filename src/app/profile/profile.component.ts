import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute, Router, ParamMap} from '@angular/router'
import * as data from '../../data/mock';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any
  constructor(public http: Http, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    // return this.http.get('http://localhost:3000/api/people/79063')
    //   .map(res => res.json()).subscribe(data => this.user =data)
    let id = this.route.params['value'].id
    this.user = data.data['players'][id]
    // (+) converts string 'id' to a number
    // this.route.paramMap.switchMap((params: ParamMap) => data['players'][params['id']])
    // .subscribe((product) => this.user = product);
    // this.user =
    // console.log(data.data.players)
    // this.user = data.data.players['79063']
  }
  getScore(r) {
    let score = r.score - r.par
    if (score === 0) return 'E'
    if (score > 0) return '+' + score
    else return score
  }
  getLeagueRating(h) {
    return Math.floor(1000+h*9)
  }
}
