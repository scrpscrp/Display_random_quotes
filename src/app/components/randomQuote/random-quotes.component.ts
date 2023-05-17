import { Component, OnInit } from '@angular/core';
import { take, BehaviorSubject } from 'rxjs';
import { RandomQuoteInterface } from 'src/app/shared/interfaces/randomQuote.interface';
import { RandomQuoteDisplayInterface } from 'src/app/shared/interfaces/randomQuoteDisplay.interface';
import { RandomQuotesService } from 'src/app/shared/services/randomQuotes/random-quotes.service';
import { SocialMediaEnum } from 'src/app/shared/interfaces/social-media.enum';
import { ShareOnSMService } from 'src/app/shared/services/share-on-social-media.service';

@Component({
  selector: 'app-random-quotes',
  templateUrl: './random-quotes.component.html',
  styleUrls: ['./random-quotes.component.scss'],
})
export class RandomQuotesComponent implements OnInit {
  randomQuote$: BehaviorSubject<RandomQuoteDisplayInterface> = new BehaviorSubject<RandomQuoteDisplayInterface>(null);
  backupQuotes = this.randomQuotesService.backupQuotes;
  rating: number;
  modal: boolean = false;
  socialMedia = SocialMediaEnum;
  toggleQuote: boolean = false;

  constructor(
    private randomQuotesService: RandomQuotesService,
    private shareOnSMService: ShareOnSMService,
  ) {}

  ngOnInit(): void {
    this.getRandomQuote();
  }

  private generateRandomQuote(
    quotes: RandomQuoteDisplayInterface[]
  ): RandomQuoteDisplayInterface {
    const randomIndex: number = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  getRandomQuote(): void {
    this.toggleQuote = false;
    if (navigator.onLine) {
      this.randomQuotesService
        .getRandomQuote()
        .pipe(take(1))
        .subscribe((quote: RandomQuoteInterface) => {
          const randomQuote: RandomQuoteDisplayInterface = {
            quoteText: quote.content ?? quote.quote ?? '',
            id: quote.id ?? quote.id ?? '',
            author: quote.author ?? quote.author,
            rating: this.rating ?? null,
          };
          this.randomQuote$.next(randomQuote);
          this.randomQuotesService.backupQuotes.push(randomQuote);
          this.rating = null;
          this.toggleQuote = true;
        });
    } else {
      const backupHardcodedQUote: RandomQuoteDisplayInterface =
        this.generateRandomQuote(this.backupQuotes);
      this.randomQuote$.next(backupHardcodedQUote);
    }
    localStorage.setItem('quote', JSON.stringify(this.randomQuote$.value));
  }
  toggleModal() {
    this.modal = !this.modal;
  }

  shareOnSocialMediaEvent(socialMedia: SocialMediaEnum) {
    this.shareOnSMService.shareOnSocialMedia(
      socialMedia,
      this.randomQuote$.value.quoteText,
      this.randomQuote$.value.author,
      this.rating
    );
  }
}
