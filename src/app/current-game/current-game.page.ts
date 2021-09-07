import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public data: any;

  constructor(private router: Router){  
    if (this.router.getCurrentNavigation().extras.state) {
        const state = this.router.getCurrentNavigation().extras.state;
        this.data = state;
      }
  }

  ngOnInit() {
  }

}
