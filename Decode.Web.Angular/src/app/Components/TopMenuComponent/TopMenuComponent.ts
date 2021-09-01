import { Component, Injector, AfterContentChecked } from '@angular/core';
import { SuperComponent, WebContracts } from '../SuperComponent/SuperComponent';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'TopMenuComponent',
  templateUrl: "./TopMenuComponent.html",
  styleUrls: ["./TopMenuComponent.scss"]
})
export default class TopMenuComponent extends SuperComponent {
  public Languages: WebContracts.ILanguageModel[] = [];
  CurrentLanguage?: WebContracts.ILanguageModel;
  public RootApiPathServicePath: string = environment.RootApiPath.ServicePath;
  constructor(
    protected Injector: Injector,
  ) {
    super(Injector);
  };

  ngOnInit(): void {
    this.LocalisationService.GetLanguages().then(languages => {
      this.Languages = languages;
      this.CurrentLanguage = this.Languages.find(language => language.ISO639_1_Code === this.ProfileService.Language_ISO639_1_Code)
    }).catch((reason: any) => {
      console.log(reason);
      this.HandleError(reason);
    })
  }

  ngAfterContentChecked(): void {
    super.ngAfterContentChecked();    
  };

  OnLanguageChange() {
    this.ProfileService.Language_ISO639_1_Code = this.CurrentLanguage?.ISO639_1_Code!;
  }
}




