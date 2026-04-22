import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { EmailService } from '../services/email.service';
import { IconService } from '../services/icon.service';
import { GtmService } from '../services/gtm.service';

@Component({
  selector: 'app-hem',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hem.component.html'
})

export class HemComponent implements OnInit {
  loadGtmIfConsentGranted() {
    throw new Error('Method not implemented.');
  }

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
    this.seoService.updateTitle('Barkborresök med hund - Certifierat sökekipage');
    this.seoService.updateMetaTag('description', 'Jag och min hund hjälper att söka av din skogsfastighet tidseffektivt efter barkborreangrepp. Vi är verksamma i hela Sverige. Varmt välkommen att kontakta mig!');
  }
}
