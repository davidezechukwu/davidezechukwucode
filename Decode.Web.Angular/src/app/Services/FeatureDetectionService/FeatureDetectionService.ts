import { Injector, Injectable } from '@angular/core';

@Injectable()
/* do not subclass from superservice*/
export class FeatureDetectionService {
  SpeedTestUrl: string = "/visuals/assets/images/speedTest.jpg";
  constructor(
    protected Injector: Injector
  ) {

  }

  IsOnLowSpeedConnection(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var speedTest = {
        ImageUrl: this.SpeedTestUrl,
        DownloadSizeInBytes: 877799,
        Duration: 0,
        BitsLoaded: 0,
        SpeedBps: 0,
        SpeedKbps: 0,
        SpeedMbps: 0,
        StartTime: 0,
        EndTime: 0
      }

      var download = new Image();
      download.onload = function (ev: Event) {        
        speedTest.EndTime = (new Date()).getTime();
        speedTest.Duration = (speedTest.EndTime - speedTest.StartTime) / 1000;
        speedTest.BitsLoaded = speedTest.DownloadSizeInBytes * 8;
        speedTest.SpeedBps = speedTest.BitsLoaded / speedTest.Duration;
        speedTest.SpeedKbps = speedTest.SpeedBps / 1024;
        speedTest.SpeedMbps = speedTest.SpeedKbps / 1024;
        resolve(speedTest.SpeedMbps < 15)
      };

      download.onerror = function () {
        resolve(true);        
      }

      speedTest.StartTime = (new Date()).getTime();
      var nonce = "?nonce =" + speedTest.StartTime;
      download.src = speedTest.ImageUrl + nonce;
    });
  }
}
