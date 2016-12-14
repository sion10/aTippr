//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { TeamsModel } from '../../models/teams';
//Service
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'Admin_Teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [MdSnackBar],
})
export class AdminTeamsComponent implements OnInit {

    private flagfile: File;
    private teamsmodel = new TeamsModel('', '', '', '');
    private teamsmodelOV: TeamsModel[];

  constructor(
    private snackBar: MdSnackBar,
    private teamsservice: TeamsService,
  ){}

  selectFile(event): void {
    this.flagfile = event.srcElement.files[0];
  }

  doCreateTeam(): void {
    /*if(this.teamsmodel.flag == null || this.teamsmodel.flag == undefined){
      this.snackBar.open('Bitte eine Flagge hochladen!')
      return;
    }
    this.teamsmodel.flagname = this.flagfile.name;
    this.teamsservice.set(this.teamsmodel, this.base64)
        .subscribe(data => { this.getAllTeams(); });*/
  }

  getAllTeams(): void {
    /*this.teamsservice.getAll()
        .subscribe( teams => { this.teamsmodelOV = teams });*/
  }

  delTeam(team): void {
    /*this.teamsservice.del(team)
        .subscribe(data => { this.getAllTeams(); });*/
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}