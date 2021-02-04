import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';


import { J } from './jirafa';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class JirafaService {

  private jirafaUrl = 'api/jirafa';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  
  getJirafa(): Observable<J[]> {
    return this.http.get<J[]>(this.jirafaUrl)
      .pipe(
        tap(_ => this.log('jirafas')),
        catchError(this.handleError<J[]>('getJirafa', []))
      );
  }


  getHeroNo404<Data>(id: number): Observable<J> {
    const url = `${this.jirafaUrl}/?id=${id}`;
    return this.http.get<J[]>(url)
      .pipe(
        map(jirafa => jirafa[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} jirafa id=${id}`);
        }),
        catchError(this.handleError<J>(`getJirafa id=${id}`))
      );
  }

  
  getJirafa(id: number): Observable<J> {
    const url = `${this.jirafaUrl}/${id}`;
    return this.http.get<J>(url).pipe(
      tap(_ => this.log(`fetched jirafa id=${id}`)),
      catchError(this.handleError<J>(`getJirafaid=${id}`))
    );
  }

 
  searchJirafa(term: string): Observable<J[]> {
    if (!term.trim()) {
     
      return of([]);
    }
    return this.http.get<J[]>(`${this.jirafaUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found jirafa matching "${term}"`) :
         this.log(`no jirafa matching "${term}"`)),
      catchError(this.handleError<J[]>('searchjirafa', []))
    );
  }

  
  addHero(jirafa: J): Observable<J> {
    return this.http.post<J>(this.jirafaUrl, jirafa, this.httpOptions).pipe(
      tap((newJirafa: J) => this.log(`added jirafa w/ id=${newJirafa.id}`)),
      catchError(this.handleError<J>('addjirafa'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(jirafa:  J | number): Observable<J> {
    const id = typeof jirafa === 'number' ? jirafa : jirafa.id;
    const url = `${this.jirafaUrl}/${id}`;

    return this.http.delete<J>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted JIRAFA id=${id}`)),
      catchError(this.handleError<J('deleteJirafa'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(jirafa: J): Observable<any> {
    return this.http.put(this.jirafaUrl, jirafa, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${jirafa.id}`)),
      catchError(this.handleError<any>('updateJirafa'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`JirafaService: ${message}`);
  }
}
