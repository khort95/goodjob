import { Component, Injectable } from '@angular/core';
import { NgModule, OnInit, Input}      from '@angular/core';
import { StatsData } from './data-class';
import { GoodJobService } from './good-job.service';
import { PhoenixChannelService } from './phoenix.channels.service'

@Component({
  selector: 'live-stats',
  templateUrl: 'app/template/stats.html'
})

@Injectable()
export class GoodStats{
  stats: StatsData = {active_count: 0, requests: 0, users: 0, jobs: 0, companies: 0} 
  socket: any
  channel_name: string = "stats_channel:phils_secret_stats_page_pls_dont_look"
 
  constructor(private goodJobService: GoodJobService, phoenixChannel: PhoenixChannelService) {
     phoenixChannel.socket.connect();
     console.log('Constructed');

     let channel = phoenixChannel.socket.channel(this.channel_name)
     channel.on("update", (msg: any) => this.update(msg) )

     channel.join()
     .receive("ok", (messages: any) => console.log("catching up", messages) )      .receive("error", ({reason}) => console.log("failed join", reason) )
     .receive("timeout", () => console.log("Networking issue. Still waiting...") )
  }

  update(statsRaw: any){
    this.stats = statsRaw
    console.log(this.stats)
  }

}