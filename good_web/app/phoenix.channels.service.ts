import { Component, Injectable } from '@angular/core';
import { NgModule, OnInit, Input}      from '@angular/core';
import { StatsData } from './data-class';
import { GoodJobService } from './good-job.service';

declare var Phoenix: any;
declare var Socket: any;  // there is no typescript version of the package available so we cannot use a compile time import

@Injectable()
export class PhoenixChannelService {
  socket: any
 
  constructor(private goodJobService: GoodJobService) {
      
      this.socket = new Phoenix.Socket("ws://localhost:4000/socket", {
          //logger: ((kind: any, msg: any, data: any) => { console.log(`${kind}: ${msg}`, data) }),
          transport: WebSocket
  });

   this.socket.connect();
  }
}