import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import {Cocktail, Cocktails} from '../interfaces/cocktail';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/delay';

@Injectable()
export class SearchService {

  constructor( private _http: HttpClient) { }

  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  public search(queryString: string): Observable<Cocktail[]> {
    return this._http
      .get<Cocktails>(`${this.baseUrl}${queryString}`)
      .delay(500)
      .pluck('drinks');
  }

}
