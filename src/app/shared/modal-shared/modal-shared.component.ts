import { Component, EventEmitter, Output } from '@angular/core';
import { SocialMediaEnum } from '../interfaces/social-media.enum';

@Component({
  selector: 'app-modal-shared',
  templateUrl: './modal-shared.component.html',
  styleUrls: ['./modal-shared.component.scss']
})
export class ModalSharedComponent {
  @Output() share:EventEmitter<SocialMediaEnum> = new EventEmitter<SocialMediaEnum>();
  @Output() toggleModal = new EventEmitter();
  socialMedia = SocialMediaEnum;
}
