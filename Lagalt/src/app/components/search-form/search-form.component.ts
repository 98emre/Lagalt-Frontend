import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  searchTerm = '';
  @Output() search = new EventEmitter<string>();

  /**
   * onSearch()
   * The onSearch() method reads in the search term that
   * the user has provided and that result is then emitted
   * back up to the parent (that can do a query).
   */
  onSearch():void{
    this.search.emit(this.searchTerm);
  }



}
