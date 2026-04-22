import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './reusables/footer/footer.component';
import { MenyComponent } from './reusables/meny/meny.component';
import { GtmService } from './services/gtm.service';
import { ConsentService } from './services/consent.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private consentService: ConsentService, private gtmService: GtmService) {}
  
  ngOnInit() {
    this.consentService.loadConsentScript();
    this.gtmService.initGtmScript();
  }
}
