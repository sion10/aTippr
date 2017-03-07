//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdSnackBar } from '@angular/material';
//Models
import { RankingModelAll } from '../models/ranking';
//Services
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'RankingDetail',
  templateUrl: './rankingdetail.component.html',
  styleUrls: ['./rankingdetail.component.scss'],
  providers: [MdSnackBar]
})
export class RankingDetailComponent implements OnInit {

  private rankingmodel: RankingModelAll[];
  private preloadingDone: boolean;

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private rankingService: RankingService,
  ){}

  ngOnInit(): void {

  }

}