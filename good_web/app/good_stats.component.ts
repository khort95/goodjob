import { Component } from '@angular/core';
import { NgModule, OnInit, Input}      from '@angular/core';
import { StatsData } from './data-class';
import { GoodJobService } from './good-job.service';

declare var Socket: any;  // there is no typescript version of the package available so we cannot use a compile time import

declare var Phoenix: any;

@Component({
  selector: 'settings',
  templateUrl: 'app/template/settings-page.html'
})

export class GoodStats implements OnInit{
  stats: StatsData 
 
  constructor(private goodJobService: GoodJobService) {
  }

  ngOnInit(){
  }

  connect(channel_name: string){
     
  }
}