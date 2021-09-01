// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import  *  as Environment  from './IEnvironment';

export const environment: Environment.IEnvironment = {

  IsProduction: false,

  DefaultLanguage: {
    ISO639_1_Code: 'en',
    LanguageName: 'English',
    NativeName: 'English',
    IsRTL: false,    
  },

  RootApiPath: {
    ServicePath: "http://51.132.20.176:3000/api/"
  },

  YandexApiPath: {
    ServicePath: "https://translate.yandex.net/api/v1.5/tr.json/translate?options=1&key=",
    APIKey: "trnsl.1.1.20190127T224241Z.040e5504a137903c.00d979ccac1d7f7281a7fdfb14366b1c272c78eb"
  },

  DefaultBackgroundVideo: {
    VideoUrl: "/visuals/assets/videos/sample3.mp4",    
  },

  HomePageBackgroundVideo: {
    VideoUrl: "/visuals/assets/videos/sample1.mp4",
    
  },

  ContactUsPageBackgroundVideo: {
    VideoUrl: "/visuals/assets/videos/sample2.mp4",    
  },

  Visuals: {
    PageAnimationSpeed: 888,
    DisableAnimations: false,
    ShowBackgroundVideo: true
  }
};
