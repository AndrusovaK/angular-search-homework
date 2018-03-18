import { Component, Input } from '@angular/core';
import {Cocktail} from '../../global/interfaces/cocktail';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent {

  @Input()
  public cocktail: Cocktail;
}
