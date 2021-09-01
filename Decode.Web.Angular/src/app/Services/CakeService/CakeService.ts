import { Injector, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SuperService, WebContracts } from '../SuperService/SuperService';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { ErrorHandlerService, HandleError } from '../ErrorHandlerService/ErrorHandlerService'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CakeService extends SuperService {
  private endPointUrl = environment.RootApiPath.ServicePath +  'cakes/';
  private handleError: HandleError;

  constructor(
    protected Injector: Injector,
    protected ErrorHandlerService: ErrorHandlerService  ) {
    super(Injector);
    this.handleError = ErrorHandlerService.CreateHandleError('CakeService');
  }
  
  Find(): Observable<WebContracts.ICakeModel[]> {
    return this.HttpClient.get<WebContracts.ICakeModel[]>(this.endPointUrl)
      .pipe(
        catchError(this.handleError('find', []))
      );
  }

  FindById(id: WebContracts.IDType ): Observable<WebContracts.ICakeModel[]> {
    const options = { params: new HttpParams().set('findById', id) };
    return this.HttpClient.get<WebContracts.ICakeModel[]>(this.endPointUrl, options)
      .pipe(
        catchError(this.handleError<WebContracts.ICakeModel[]>('findById', []))
      );
  }

  //todo remove
  Create(cake: WebContracts.ICakeModel): Observable<WebContracts.ICakeModel> {
    return this.HttpClient.post<WebContracts.ICakeModel>(this.endPointUrl, cake, httpOptions)
      .pipe(
        catchError(this.handleError('create', cake))
      );
  }

 
  Delete(id: WebContracts.IDType): Observable<unknown> {
    const url = `${this.endPointUrl}/${id}`; // DELETE api/heroes/42
    return this.HttpClient.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  Update(hero: WebContracts.ICakeModel): Observable<WebContracts.ICakeModel> {
    return this.HttpClient.put<WebContracts.ICakeModel>(this.endPointUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError('update', hero))
      );
  }
}
