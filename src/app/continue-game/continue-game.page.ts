import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../services/firestore.service'

class PlayerTotals {
  constructor(name:string, strokesList: number[]){
    this.name = name;
    this.strokesList = strokesList;
    this.totalStrokes = 0;
  }
  name: string
  strokesList: number[]
  totalStrokes: number;
  calcTotalStrokes() {
    this.totalStrokes = this.strokesList.reduce((acc, cur) => {
      return acc + cur}, 0);
  }
}

@Component({
  selector: 'app-continue-game',
  templateUrl: './continue-game.page.html',
  styleUrls: ['./continue-game.page.scss'],
})
export class ContinueGamePage implements OnInit {

  holeCardList: any[];
  totalsCard: any[] = [];

  constructor(private dbService: FireStoreService) { }

  ngOnInit() {
    this.grabThatData();
  }

  grabThatData(){
    this.holeCardList = JSON.parse(sessionStorage.getItem('holeCardList'));
    const playerTotalsArrayDumb = JSON.parse(sessionStorage.getItem('totalsCard'));
    playerTotalsArrayDumb.forEach((thing:any)=>{
      const newThing = new PlayerTotals(thing.name, [...thing.strokesList])
      this.totalsCard.push(newThing); // now it's smart again and has calculation methods
    })
    this.totalsCard.forEach((whocaresaboutgolf)=>{
      whocaresaboutgolf.calcTotalStrokes();
    });
    sessionStorage.removeItem('holeCardList');
    sessionStorage.removeItem('totalsCard');
  }

  calcTotals(playerName:string, hole:number, value:number, ):void {
    this.totalsCard.forEach((player:any)=>{
      if (player.name === playerName){
        player.strokesList[hole] = value;
        player.calcTotalStrokes();
      }
    });
  }

  saveData() {
    const normalObject = JSON.parse(JSON.stringify(this.totalsCard));
    const DTO = { holeCardList: this.holeCardList, totalsCard: normalObject };
    this.dbService.saveData(DTO);
  }

}
