import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { J } from '../jiraja';
import { JirafaService } from '../jirafa.service';

@Component({
  selector: 'app-jirafa-search',
  templateUrl: './jirafa-search.component.html',
  styleUrls: [ './jirafa-search.component.css' ]
})
export class JirafaSearchComponent implements OnInit {
  jirafa$: Observable<J[]>;
  private searchTerms = new Subject<string>();

  constructor(private jirafaService: JirafaService) {}

  
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.jirafa$ = this.searchTerms.pipe(
      
      debounceTime(300),

      
      distinctUntilChanged(),

      
      switchMap((term: string) => this.jirafaService.jirafa-search (term)),
    );
  }
}
