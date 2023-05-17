import { Injectable } from '@angular/core';
import { SocialMediaEnum } from '../interfaces/social-media.enum';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShareOnSMService {
  socialMedia = SocialMediaEnum;
  twitterUrl: string = environment.twitterUrl;
  facebookUrl: string = environment.facebookUrl;

  shareOnSocialMedia(
    socialMedia: SocialMediaEnum,
    quoteText: string,
    author: string,
    rating: number
  ) {
    const shareText: string = `Check out this quote by ${author}: ${quoteText}, rating: ${rating}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Share Quote',
          text: shareText,
        })
        .then(() => console.log('Shared successfully.'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      let sharingUrl: string;
      if (this.socialMedia.Twitter === socialMedia) {
        sharingUrl = `${this.twitterUrl}${encodeURIComponent(
          shareText
        )}`;
      } else if (this.socialMedia.Facebook === socialMedia) {
        sharingUrl = `${this.facebookUrl}${encodeURIComponent(
          shareText
        )}`;
      }
      window.open(sharingUrl, '_blank');
    }
  }
}
