import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RandomQuotesComponent } from './random-quotes.component';
import { RandomQuotesService } from 'src/app/shared/services/randomQuotes/random-quotes.service';
import { ShareOnSMService } from 'src/app/shared/services/share-on-social-media.service';


describe('RandomQuotesComponent', () => {
  let component: RandomQuotesComponent;
  let fixture: ComponentFixture<RandomQuotesComponent>;
  let mockRandomQuotesService: jasmine.SpyObj<RandomQuotesService>;
  let mockShareOnSMService: jasmine.SpyObj<ShareOnSMService>;

  beforeEach(() => {
    mockRandomQuotesService = jasmine.createSpyObj('RandomQuotesService', ['getRandomQuoteSource1', 'getRandomQuoteSource2']);
    mockShareOnSMService = jasmine.createSpyObj('ShareOnSMService', ['shareOnSocialMedia']);

    TestBed.configureTestingModule({
      declarations: [RandomQuotesComponent],
      providers: [
        { provide: RandomQuotesService, useValue: mockRandomQuotesService },
        { provide: ShareOnSMService, useValue: mockShareOnSMService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RandomQuotesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRandomQuote() on component initialization', () => {
    spyOn(component, 'getRandomQuote');
    component.ngOnInit();
    expect(component.getRandomQuote).toHaveBeenCalled();
  });



  it('should call shareOnSocialMedia() with the correct parameters', () => {
    const quote: any = { quoteText: 'Test quote', author: 'Test author' };
    component.randomQuote$ = new BehaviorSubject(quote);
    component.rating = 3;
    const socialMedia = 0;
    component.shareOnSocialMediaEvent(socialMedia);
    expect(mockShareOnSMService.shareOnSocialMedia).toHaveBeenCalledWith(socialMedia, 'Test quote', 'Test author', 3);
  });


});

//n these tests, we're creating the component and providing spy objects for the RandomQuotesService and ShareOnSMService. 
