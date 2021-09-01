import { Injector, Injectable } from '@angular/core';
import { SuperService, WebContracts } from '../SuperService/SuperService';
import * as _ from 'lodash';

@Injectable()
export class LocalisationService extends SuperService {
  protected languages: WebContracts.ILanguageModel[] = [];
  constructor(
    protected Injector: Injector
  ) {
    super(Injector);
  };

  public GetLanguages(): Promise<WebContracts.ILanguageModel[]> {
    //todo return this.GetLanguagesFromHTTP();
    return this.GetLanguagesFromMemory();
  }

  protected GetLanguagesFromHTTP(): Promise<WebContracts.ILanguageModel[]> {
    return new Promise<never>(_);
  }

  protected GetLanguagesFromMemory(): Promise<WebContracts.ILanguageModel[]> {
    return new Promise<WebContracts.ILanguageModel[]>((resolve, reject) => {
      var rawData: Omit<WebContracts.ILanguageModel, "ID">[] = [
        { "ISO639_1_Code": "en", "LanguageName": "English", "NativeName": "English", "IsRTL": false },
        { "ISO639_1_Code": "fr", "LanguageName": "French", "NativeName": "français, langue française", "IsRTL": false },
      ];
      this.languages = [];
      var nextId = 0;
      _.forEach(rawData, data => {
        let language: WebContracts.ILanguageModel = {
          ID: ( WebContracts.IDisNumeric ? ++nextId : (++nextId).toString()) as any,
          LanguageName: data.LanguageName,
          NativeName: data.NativeName,
          ISO639_1_Code: data.ISO639_1_Code,
          //ISO639_2T_Code: "",
          //ISO639_3_Code: "",
          IsRTL: data.IsRTL
        };
        this.languages.push(language);
      });
      this.languages = _.sortBy(this.languages, language => { return language.LanguageName });
      resolve(this.languages);
    });
  }

  public Localise(phrase: string): string {
    //debugger;
    //let container: string = this.constructor.name;
    //if (!this.SessionService.CurrentLanguage || this.SessionService.CurrentLanguage?.ISO639_1_Code == "en") {
    //  return phrase;
    //}
    //let translatedPhrase: string = `${phrase}(${this.SessionService.CurrentLanguage?.ISO639_1_Code})`;
    //for (var c = 0; c < formatData.length; c++) {
    //  translatedPhrase = translatedPhrase.replace("{" + c + "}", formatData[c]);
    //}
    //return translatedPhrase;
    return phrase;
  }
}
