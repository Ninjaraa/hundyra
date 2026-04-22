import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { IconService } from '../services/icon.service';
import { SeoService } from '../services/seo.service';
import { RouterLink } from '@angular/router';
import { GtmService } from '../services/gtm.service';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kontakt.component.html',
})

export class KontaktComponent implements OnInit {

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
    this.seoService.updateTitle('Välkommen att kontakta mig');
    this.seoService.updateMetaTag('description', 'Du är alltid välkommen att kontakta mig, oavsett vad du har för frågor. Jag finns tillgänglig via mail, Facebook och via mitt konto på Instagram.');
  }
}
