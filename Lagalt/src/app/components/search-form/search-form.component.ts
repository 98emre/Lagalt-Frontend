import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  searchTerm = '';
  @Output() search = new EventEmitter<string>();

  onSearch():void{
    this.search.emit(this.searchTerm);
  }



}
