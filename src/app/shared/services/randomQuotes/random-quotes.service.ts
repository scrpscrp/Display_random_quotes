import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, race } from 'rxjs';
import { RandomQuoteDisplayInterface } from '../../interfaces/randomQuoteDisplay.interface';
import { environment } from 'src/environments/environment.development';
import { HardcodedQuotes } from '../../constants/hardcoded-quote';
import { RandomQuoteInterface } from '../../interfaces/randomQuote.interface';

@Injectable({
  providedIn: 'root',
})
export class RandomQuotesService {
  public backupQuotes: RandomQuoteDisplayInterface[] = HardcodedQuotes;
  private quoteUrl1: string = environment.quoteUrl1;
  private quoteUrl2: string = environment.quoteUrl2;

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<Partial<RandomQuoteInterface>> {
    return race([this.http.get(`${this.quoteUrl1}`), this.http.get(`${this.quoteUrl2}`)]);
  }
}
