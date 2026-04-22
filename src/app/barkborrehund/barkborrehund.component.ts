import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { EmailService } from '../services/email.service';
import { IconService } from '../services/icon.service';
import { GtmService } from '../services/gtm.service';

@Component({
  selector: 'app-barkborrehund',
  standalone: true,
  imports: [],
  templateUrl: './barkborrehund.component.html'
})

export class BarkborrehundComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    public emailService: EmailService,
    public iconService: IconService,
    private gtmService: GtmService,
  ) { }

  onThemeButtonClick(buttonName: string): void {
    this.gtmService.trackButtonClick(buttonName);
  }

  ngOnInit() {
    this.seoService.updateTitle('Barkborrehund - Barkborresök med hund');
    this.seoService.updateMetaTag('description', 'En “barkborrehund” är en hund som är tränad att söka och lokalisera angrepp från granbarkborren. Läs mer om hur vi jobbar och nyttan med att söka med hund.');
  }
}