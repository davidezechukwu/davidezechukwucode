import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { SuperComponent, WebContracts } from '../SuperComponent/SuperComponent';
import { CakeService } from '../../Services/CakeService/CakeService';
import { environment } from '../../../environments/environment'

declare var $: any;

@Component({
  selector: 'CakeComponent',
  templateUrl: './CakeComponent.html',
  styleUrls: ["./CakeComponent.scss"]
})
export default class CakeComponent extends SuperComponent {
  public Cakes: WebContracts.ICakeModel[] = [];
  public CakeEndPoint = environment.RootApiPath.ServicePath + "cakes";
  public NameMax = WebContracts.ICakeModelConstants.NAME_LENGTH;
  public CommentMax = WebContracts.ICakeModelConstants.COMMENT_LENGTH;
  public YumFactorMin = WebContracts.ICakeModelConstants.YUM_FACTOR_MIN;
  public YumFactorMax = WebContracts.ICakeModelConstants.YUM_FACTOR_MAX;

  constructor(
    protected Injector: Injector,
    private cakeService: CakeService
  ) {
    super(Injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.GetCakes();
    super.ngOnInit();
  }

  ngDoCheck(): void {
    super.ngDoCheck();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  GetCakes(): void {
    this.cakeService.Find()
      .subscribe(cakes => {
        this.Cakes = cakes;
      });
  }

  delete(cake: WebContracts.ICakeModel): void {
    this.Cakes = this.Cakes.filter(soughtCake => soughtCake !== cake);
    this.cakeService
      .Delete(cake.ID)
      .subscribe();
  }

  onCreateClick(ev: any) {
    ev.preventDefault();
    let theForm = $(ev.target).closest('form');
    if (!this.Validate(theForm)) {
      alert("validation failed");
      return;
    }
    $.ajax({
      url: theForm[0].action,
      data: new FormData(theForm[0]),
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST',
      type: 'POST', // For jQuery < 1.9
      success: function (data: any) {
        window.location.reload();
      }
    });
  }

  onUpdateClick(ev: any) {
    ev.preventDefault();
    let theForm = $(ev.target).closest("form");
    if (!this.Validate(theForm)) {
      alert("validation failed");
      return;
    }
    $.ajax({
      url: theForm[0].action,
      data: new FormData(theForm[0]),
      cache: false,
      contentType: false,
      processData: false,
      method: 'PUT',
      type: 'PUT', // For jQuery < 1.9
      success: function (data: any) {
        window.location.reload();
      }
    });
  }

  onDeleteClick(ev: any) {
    ev.preventDefault();
    let theForm = $(ev.target).closest("form");
    $.ajax({
      url: theForm[0].action,
      data: null,
      cache: false,
      contentType: false,
      processData: false,
      method: 'DELETE',
      type: 'DELETE', // For jQuery < 1.9
      success: function (data: any) {
        window.location.reload();
      }
    });
  };

  Validate(theForm: any) {
    let nameInput = theForm.find("input[name='Name']");
    let ImageUrlInput = theForm.find("input[name='ImageUrl']");
    let commentInput = theForm.find("textarea[name='Comment']");
    let yumFactorInput = theForm.find("input[name='YumFactor']");
    if (nameInput.val().trim().length == 0 || parseInt(nameInput[0].max) < nameInput.val().length) {
      return false;
    }
    if (commentInput.val().trim().length == 0 || parseInt(commentInput[0].maxLength) < commentInput.val().length) {
      return false;
    }
    if (yumFactorInput.val().trim().length == 0 || (parseInt(yumFactorInput[0].max) < parseInt(yumFactorInput.val())) ||
      (parseInt(yumFactorInput[0].min) > parseInt(yumFactorInput.val()))) {
      return false;
    }
    if (ImageUrlInput[0].files.length == 0) {
      return false;
    }
    return true;
  }

  OnFileSelectedCreate(event: any) {
    let theInputFile = $(event.target);
    let theLabel = theInputFile.next('label').next('p');
    theLabel.text(theInputFile[0].files[0].name);
  }
  OnFileSelectedUpdate(event: any) {
    let theInputFile = $(event.target);
    let theLabel = theInputFile.parent().next('p');
    theLabel.text(theInputFile[0].files[0].name);
  }
}
