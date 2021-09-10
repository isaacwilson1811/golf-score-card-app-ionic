import { SharedAppStateService } from '../services/shared-app-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Player {
  order: string,
  first_name: string,
  last_name: string,
  hdcp: string,
  scores?: playerScore[]
}
interface playerScore {
  hole: number,
  strokes: number
}

@Component({
  selector: 'app-new-score-card',
  templateUrl: './new-score-card.page.html',
  styleUrls: ['./new-score-card.page.scss'],
})
export class NewScoreCardPage implements OnInit {

  public selectedCourse: string;
  public numberOfPlayers: string;
  public playerList: Player[];
  public isFormValid = false;
  public submitButtonText = "Get Ready";

  public routerStateData: any;

  public templateData = {
    courseList: undefined,
    selectedCourseID: undefined
  }

  constructor(
    private appState: SharedAppStateService,
    private router: Router
  ) {
    // if (this.router.getCurrentNavigation().extras.state) {
    //   const state = this.router.getCurrentNavigation().extras.state;
    //   this.routerStateData = state;
    //   console.log(this.routerStateData);
    //   this.selectedCourse = `${this.routerStateData.selectedCourseID}`
    // }
  }

  ngOnInit() {
    this.templateData.courseList = this.appState.get("courseList");
    this.templateData.selectedCourseID = `${this.appState.get("selectedCourseID")}`;
    if(!this.templateData.courseList){
      this.router.navigate(['home']);
    }
  }

  validateFormData(): void {
    if(this.templateData.selectedCourseID && this.numberOfPlayers){
      let validPlayerCount = 0;
      this.playerList.forEach( player => {
        if(player.first_name && player.last_name && player.hdcp){
          validPlayerCount ++;
        }
      })
      if(validPlayerCount === this.playerList.length){
        this.isFormValid = true;
        this.submitButtonText = "Start Golfing!"
      } else {
        this.isFormValid = false;
        this.submitButtonText = "Get Ready";
      }
    }
  }

  onChangeNumPlayers() {
    const pNum = Number(this.numberOfPlayers);

    if(!this.playerList){
      this.playerList = [];
      for(let i = 0; i < pNum; i++) {
        this.playerList.push({order:`${i+1}`,first_name:'',last_name:'',hdcp:''});
      }
      return;
    }
    const newList = [];
    for(let i = 0; i < pNum; i++){
      if(this.playerList[i]){
        newList.push(this.playerList[i]);
      }
      else {
        newList.push({order:`${i+1}`,first_name:'',last_name:'',hdcp:''});
      }
    }
    this.playerList = newList.slice(0);
  }

  onStartGolfing(){
    const scoreCardData = {
      golfCourseID: this.templateData.selectedCourseID,
      playersList: [...this.playerList],
    }
    scoreCardData.playersList.forEach(player=>{
      player.scores = [];
      for(let i = 1; i < 10; i++){
        player.scores.push({hole:i,strokes:0})
      }
    })
    this.sendDataToGame(scoreCardData);
  }

  sendDataToGame(obj:any){
    this.router.navigate(['current-game'], {
      state: obj
    });
  }
}
