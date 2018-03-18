import { Component, OnInit } from '@angular/core';
import { SearchService} from '../global/services/search.service';
import {Cocktail} from '../global/interfaces/cocktail';
import { FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/empty';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _searchService: SearchService) { }

  public queryInput: FormControl = new FormControl();
  public cocktailsList: Cocktail[];
  public isLoading = false;
  public emptyResult = false;

  ngOnInit() {
    this.queryInput.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap((queryString) => {
        this.emptyResult = false;

        if (queryString.length === 0) {
          this.isLoading = false;
          this.cocktailsList = null;
          return Observable.empty();
        }

        this.isLoading = true;
        return this._searchService.search(queryString);
      })
      .subscribe((result: Cocktail[]) => {
        if (!result) {
          this.emptyResult = true;
        }

        this.cocktailsList = result;
        this.isLoading = false;
      });
  }

}
