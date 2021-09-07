import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

interface Player {
  order: string,
  first_name: string,
  last_name: string,
  hdcp: string,
  scores?: any[]
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

  validateFormData() {
    if(this.selectedCourse && this.numberOfPlayers && this.playerList){
      let validPlayerCount = 0;
      for(let i = 0; i < this.playerList.length; i++){
        if(this.playerList[i].first_name && this.playerList[i].last_name && this.playerList[i].hdcp){
          validPlayerCount ++;
        }
      }
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
      for(let i = 0; i < pNum; i++){
        const player = {order:`${i+1}`,first_name:'',last_name:'',hdcp:''}
        this.playerList.push(player);
      }
      return;
    }
    console.log(this.playerList.length)
    const newList = [];
    for(let i = 0; i < pNum; i++){
      if(this.playerList[i]){
        newList.push(this.playerList[i]);
      }else {
        const player = {order:`${i+1}`,first_name:'',last_name:'',hdcp:''};
        newList.push(player);
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
        player.scores.push({hole:i,strokes:null})
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
