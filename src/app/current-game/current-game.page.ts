import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedAppStateService } from '../services/shared-app-state.service';
import { FireStoreService } from '../services/firestore.service';

interface HoleCard {
  title: string;
  subtitle: string;
  subtitle2: string;
  scoreList: PlayerScore[];
}
interface PlayerScore {
  playerName: string,
  strokes: number
}
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
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public formData: any;

  // save and load this data, but remake the object from the class with the totaling method
  public holeCardList: HoleCard[] = [];
  public totalsCard = [];

  constructor(
    private appState: SharedAppStateService,
    private dbService: FireStoreService,
    private router: Router
  ){  
    if (this.router.getCurrentNavigation().extras.state) {
        const state = this.router.getCurrentNavigation().extras.state;
        this.formData = state;
      }
  }

  ngOnInit() {
    this.createHoleCards();
    this.createTotalsCard();
  }

  createHoleCards(){
    for (let i = 0; i < 9; i++){
      const parArr = this.getParArr();
      const holeCard:HoleCard = {
        title: `Hole ${i+1}`,
        subtitle: `Par ${parArr[i].par}`,
        subtitle2: `Yards ${parArr[i].yards}`,
        scoreList: []
      }
      this.formData.playersList.forEach((player:any)=>{
        const playerScore: PlayerScore = {
          playerName: `${player.first_name} ${player.last_name}`,
          strokes: 0
        };
        holeCard.scoreList.push(playerScore);
      });
      this.holeCardList.push(holeCard);
    }
  }

  private getParArr(): any[] {
    const CourseID:number = JSON.parse(localStorage.getItem('GOLFDATA_selectedCourseID'));
    const CourseList:any[] = JSON.parse(localStorage.getItem('GOLFDATA_courseList'));
    const parArr = [];
    switch(CourseID){
      case 18300:{
        CourseList[0].details.holes.forEach((hole:any)=>{
          const thing = {par: hole.teeBoxes[0].par, yards: hole.teeBoxes[0].yards}
          parArr.push(thing);
        });
        break;
      }
      case 11819:{
        CourseList[1].details.holes.forEach((hole:any)=>{
          const thing = {par: hole.teeBoxes[0].par, yards: hole.teeBoxes[0].yards}
          parArr.push(thing);
        });
        break;
      }
      case 19002:{
        CourseList[2].details.holes.forEach((hole:any)=>{
          const thing = {par: hole.teeBoxes[0].par, yards: hole.teeBoxes[0].yards}
          parArr.push(thing);
        });
        break;
      }
    }
    return parArr;
  }

  createTotalsCard(){
    this.formData.playersList.forEach((player:any) => {
      const playerTotals = new PlayerTotals(`${player.first_name} ${player.last_name}`, [0,0,0,0,0,0,0,0,0]);
      this.totalsCard.push(playerTotals);
    })
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
