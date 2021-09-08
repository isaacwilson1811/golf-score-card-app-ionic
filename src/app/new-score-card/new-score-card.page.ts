import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  validateFormData(): void {
    if(this.selectedCourse && this.numberOfPlayers){
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
      golfCourseID: this.selectedCourse,
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
