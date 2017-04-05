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
  channel: any
 
  constructor(private goodJobService: GoodJobService, phoenixChannel: PhoenixChannelService) {
     phoenixChannel.socket.connect();
     console.log('Constructed');

     this.channel = phoenixChannel.socket.channel(this.channel_name)
     this. channel.on("update", (msg: any) => this.update(msg) )

     this.channel.join()
     .receive("ok", (messages: any) => console.log("getting stats", messages) )      .receive("error", ({reason}) => console.log("failed join", reason) )
     .receive("timeout", () => console.log("Networking issue. Still waiting...") )

     this.get_update()
  }

  update(statsRaw: any){
    this.stats = statsRaw
    console.log(this.stats)
  }

   get_update(){
    this.channel.push("stats_view", {update: "any"})
  }

}