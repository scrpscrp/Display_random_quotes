import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RandomQuotesComponent } from './components/randomQuote/random-quotes.component';

const appRoutes: Routes = [
  {
    path: 'slide-show',
    component: CarouselComponent,
  },
  {
    path: '',
    component: RandomQuotesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
