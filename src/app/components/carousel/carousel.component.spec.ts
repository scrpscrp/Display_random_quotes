import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { ShareOnSMService } from 'src/app/shared/services/share-on-social-media.service';
import { SocialMediaEnum } from 'src/app/shared/interfaces/social-media.enum';
import { RandomQuoteDisplayInterface } from 'src/app/shared/interfaces/randomQuoteDisplay.interface';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let shareOnSMServiceSpy: jasmine.SpyObj<ShareOnSMService>;

  beforeEach(async () => {
    const shareOnSMServiceMock = jasmine.createSpyObj('ShareOnSMService', ['shareOnSocialMedia']);

    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      providers: [{ provide: ShareOnSMService, useValue: shareOnSMServiceMock }]
    }).compileComponents();

    shareOnSMServiceSpy = TestBed.inject(ShareOnSMService) as jasmine.SpyObj<ShareOnSMService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the modal', () => {
    expect(component.modal).toBeFalsy();

    component.toggleModal();
    expect(component.modal).toBeTruthy();

    component.toggleModal();
    expect(component.modal).toBeFalsy();
  });

  it('should share a quote', () => {
    const quote: RandomQuoteDisplayInterface = {
      quoteText: 'Test quote',
      author: 'Test author',
      id: '1',
      rating: null
    };

    component.shareQuote(quote);
    expect(component.quoteToShare).toEqual(quote);
    expect(component.modal).toBeTruthy();
  });

  it('should share on social media', () => {
    const quote: RandomQuoteDisplayInterface = {
      quoteText: 'Test quote',
      author: 'Test author',
      id: '1',
      rating: null
    };

    component.quoteToShare = quote;
    component.rating = 5;

    const socialMedia = SocialMediaEnum.Facebook;
    component.shareOnSocialMediaEvent(socialMedia);

    expect(shareOnSMServiceSpy.shareOnSocialMedia).toHaveBeenCalledWith(socialMedia, quote.quoteText, quote.author, 5);
    expect(component.rating).toBeNull();
  });
});

 // In the above code, we create a test suite for the CarouselComponent and write individual tests for different functionality such as component creation, modal toggling, sharing a quote, and sharing on social media. We use a mock implementation of the ShareOnSMService using jasmine.createSpyObj and provide it in the test bed configuration.