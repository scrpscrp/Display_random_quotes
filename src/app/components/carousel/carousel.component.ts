import { Component } from '@angular/core';
import { RandomQuoteDisplayInterface } from 'src/app/shared/interfaces/randomQuoteDisplay.interface';
import { SocialMediaEnum } from 'src/app/shared/interfaces/social-media.enum';
import { RandomQuotesService } from 'src/app/shared/services/randomQuotes/random-quotes.service';
import { ShareOnSMService } from 'src/app/shared/services/share-on-social-media.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  backupQuotes: RandomQuoteDisplayInterface[] = this.quoteService.backupQuotes;
  socialMedia = SocialMediaEnum;
  modal: boolean = false;
  rating: number = null;
  quoteToShare: RandomQuoteDisplayInterface = null;

  constructor(private shareOnSMService: ShareOnSMService, private quoteService: RandomQuotesService) {}

  shareQuote(quote: RandomQuoteDisplayInterface) {
    this.quoteToShare = quote;
    this.toggleModal();
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  shareOnSocialMediaEvent(socialMedia: SocialMediaEnum) {
    this.shareOnSMService.shareOnSocialMedia(
      socialMedia,
      this.quoteToShare.quoteText,
      this.quoteToShare.author,
      this.rating
    );
    this.rating = null;
  }
}
