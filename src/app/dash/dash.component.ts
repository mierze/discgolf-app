import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import 'rxjs/add/operator/first';
import {Observable} from 'rxjs/Observable'
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  rounds$: FirebaseListObservable<any>
  roundsFirst: Observable<any[]>
  players$: FirebaseObjectObservable<any>
  playersFirst: Observable<any>
  coursesFirst: Observable<any>
  courses$: FirebaseObjectObservable<any>
  player: FirebaseObjectObservable<any>
  playerModel: any = {
    "handicap": 0, //generated
    "id": "", //entered
    "name": "", //generated
    "payout": 20, //generated
    "score": 57 //entered
  }
  round: any = {
    "birdie": 0, //generated , last week plus num this week
    "course": "Pipeline", //entered (id)
    "par": null, //generated
    "players": [], //entered
    "pot": null, //generated
    "sse": null, //generated
    "week": null, //entered
    "birdiePoolHit": null
  }
  score: any
  week: any
  rounds: any[]
  players: any
  courses: any
  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
    this.week = {
      course: '',
      sse: '',
      par: '',
      pot: '',
      birdie: ''
    }
    this.score = {
      id: '',
      score: '',
      handicap: '',
      name: ''
    }
    this.rounds$ = this.db.list('/rounds')
    this.roundsFirst = this.rounds$.first()
    this.roundsFirst.subscribe(rounds => { this.rounds = rounds; console.log('here\n', this.rounds) });
    this.players$ = this.db.object('/players')
    this.playersFirst = this.players$.first()
    this.playersFirst.subscribe(players => { this.players = players; console.log('here\n', this.players) });

    this.courses$ = this.db.object('/courses')
    this.coursesFirst = this.courses$.first()
    this.coursesFirst.subscribe(courses => { this.courses = courses; console.log('here\n', this.courses) });

    // this.rounds..
  }
  testMe() {
    console.log(this.rounds)
    this.rounds = [{
      "birdie": 0,
      "course": "Tyger",
      "par": 62,
      "players": [{
        "handicap": 0,
        "id": "84105",
        "name": "Justin Peeler",
        "score": 54
      }, {
          "handicap": 0,
          "id": "77821",
          "name": "Ian Fredrickson",
          "score": 57
        }, {
          "handicap": 0,
          "id": "74317",
          "name": "Benjamin Gossett",
          "score": 59
        }, {
          "handicap": 0,
          "id": "88805",
          "name": "Michael Gossett",
          "score": 62
        }, {
          "handicap": 0,
          "id": "85048",
          "name": "David Galloway",
          "score": 62
        }, {
          "handicap": 0,
          "id": "97586",
          "name": "Owen Camp",
          "score": 62
        }, {
          "handicap": 0,
          "id": "79063",
          "name": "Brett Stetson",
          "score": 64
        }, {
          "handicap": 0,
          "id": "cross-keller",
          "name": "Cross Keller",
          "score": 64
        }, {
          "handicap": 0,
          "id": "41792",
          "name": "Bob Ley",
          "score": 64
        }, {
          "handicap": 0,
          "id": "91243",
          "name": "Ryan Knapp",
          "score": 66
        }, {
          "handicap": 0,
          "id": "kenny-miller",
          "name": "Kenny Miller",
          "score": 67
        }, {
          "handicap": 0,
          "id": "john-rooney",
          "name": "John Rooney",
          "score": 68
        }, {
          "handicap": 0,
          "id": "scott-hawkins",
          "name": "Scott Hawkins",
          "score": 69
        }, {
          "handicap": 0,
          "id": "michael-pye",
          "name": "Michael Pye",
          "score": 71
        }],
      "pot": 0,
      "sse": 55,
      "week": 1
    }, {
        "birdie": 8,
        "course": "Pipeline",
        "par": 60,
        "players": [{
          "handicap": 0,
          "id": "84105",
          "name": "Justin Peeler",
          "payout": 20,
          "score": 57
        }, {
            "handicap": 0,
            "id": "justin-gross",
            "name": "Justin Gross",
            "payout": 10,
            "score": 57
          }, {
            "handicap": 0,
            "id": "79063",
            "name": "Brett Stetson",
            "score": 58
          }, {
            "handicap": 0,
            "id": "kenny-miller",
            "name": "Kenny Miller",
            "score": 58
          }, {
            "handicap": 0,
            "id": "97586",
            "name": "Owen Camp",
            "score": 65
          }, {
            "handicap": 0,
            "id": "eddie-schrieferr",
            "name": "Eddie Schrieferr",
            "score": 68
          }],
        "pot": 30,
        "sse": 55,
        "week": 2
      }, {
        "birdie": 22,
        "course": "Tyger",
        "pot": 45,
        "sse": 55,
        "week": 3
      }]
    if (this.rounds.length) {
      this.rounds$.remove()
      var $ = this
      for (let r of $.rounds) {
        // setTimeout(function() {
        $.rounds$.push(r)
        // }, 1000)
      }
    }
  }
  getKey(r) {
    console.log(r.$key)
    console.log(r.course)
    this.rounds$.update('2', { 'course': 'Tygerss' })
  }
  addPlayer() {
    this.round.players.push(this.getPlayerModel())
  }
  getPlayerModel() {
    return {
      "handicap": '', //generated
      "id": '', //entered
      "name": '', //generated
      "payout": '', //generated
      "score": '' //entered
    }
  }
  addScore() {
    // take in id, score
    let round = {
      course: 'Tyger',
      week: 3,
      par: 62,
      sse: 55
    }
    let newPlayer = {

    }
    // let sc = {name: ''}
    this.player = this.db.object(`/players/${this.score.id}`)
    //subscribe won't work
    this.player.subscribe(snapshot => {
      console.log(JSON.stringify(snapshot))
      newPlayer = snapshot
      this.score.name = `${snapshot.firstName} ${snapshot.lastName}`
      newPlayer['rounds'].push({ score: 58, week: round.week, par: round.par, course: round.course })
      this.player.update(newPlayer)
    });

    // take in complete player section
    // get the player from /players
    // -- update their rounds / handicap / all
  }
  emitValue(val) {
    console.log(val)
  }
  fetchPlayerInfo(p) {
    if (!this.players[p.id]) return
    p.handicap = this.players[p.id].handicap
    p.name = `${this.players[p.id].firstName} ${this.players[p.id].lastName}`

  }
  fetchCourseInfo(r) {
    if (!this.courses[r.course]) return
    r.par = this.courses[r.course].par
    r.sse = this.courses[r.course].sse

  }
}
