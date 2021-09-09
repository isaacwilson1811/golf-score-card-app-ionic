import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public data: any;

  public cardList = [
    {
      title:'Hole 1',
      subtitle: 'Par 3',
      scoreList: [
        {playerName:'Jim Bob', strokes: 4},
        {playerName:'Anna Grahm', strokes: 2},
        {playerName:'Steve Dave', strokes: 3}
      ]
    },
    {
      title:'Hole 2',
      subtitle: 'Par 3',
      scoreList: [
        {playerName:'Jim Bob', strokes: 1},
        {playerName:'Anna Grahm', strokes: 3},
        {playerName:'Steve Dave', strokes: 5}
      ]
    }
  ]

  constructor(private router: Router){  
    if (this.router.getCurrentNavigation().extras.state) {
        const state = this.router.getCurrentNavigation().extras.state;
        this.data = state;
      }
  }

  ngOnInit() {
  }

}
