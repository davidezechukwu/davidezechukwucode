import * as WebContracts from 'decode.web.contracts.typescript';

export interface IMicroservicePathEnvironment {
  ServicePath: string;
  APIKey?: string
}

export interface IVideoResourceEnvironment {
  VideoUrl: string;
}

export interface IVisualsEnvironment {
  PageAnimationSpeed: number;
  DisableAnimations: boolean;
  ShowBackgroundVideo: boolean;
}

export interface IEnvironment {
  IsProduction: boolean,
  RootApiPath: IMicroservicePathEnvironment,
  YandexApiPath: IMicroservicePathEnvironment,
  DefaultBackgroundVideo: IVideoResourceEnvironment,
  HomePageBackgroundVideo: IVideoResourceEnvironment,
  ContactUsPageBackgroundVideo: IVideoResourceEnvironment,
  DefaultLanguage: Pick<WebContracts.ILanguageModel, 'ISO639_1_Code' | 'LanguageName' | 'NativeName' | 'IsRTL'>,
  Visuals: IVisualsEnvironment
}
