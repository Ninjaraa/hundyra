import { Injectable, Inject, DOCUMENT } from '@angular/core';

import { GtmService } from './gtm.service';

declare global {
  interface Window {
    dataLayer: any[];
  }
  function gtag(...args: any[]): void;
}

@Injectable({
  providedIn: 'root'
})

export class ConsentService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private gtmService: GtmService
  ) {}

  loadConsentScript(): void {
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.termsfeed.com/public/cookie-consent/4.1.0/cookie-consent.js';
    script.onload = () => {
      this.initConsent();
    };
    this.document.body.appendChild(script);
    this.initGoogleConsentMode();
  }
  
  private initGoogleConsentMode(): void {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
  
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'denied'
      });
    }
  }

  private initConsent(): void {
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      cookieconsent.run({
        "notice_banner_type":"interstitial",
        "consent_type":"express",
        "palette":"light",
        "language":"sv",
        "page_load_consent_levels":["strictly-necessary"],
        "notice_banner_reject_button_hide":false,
        "preferences_center_close_button_hide":false,
        "page_refresh_confirmation_buttons":false,
        "callbacks": {
          "scripts_specific_loaded": (level) => {
            switch(level) {
              case 'targeting':
                gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });
                window.dataLayer.push({
                  'event': 'consent_update',
                  'consent_level': 'granted'
                });
                this.gtmService.loadGtmIfConsentGranted();
                break;
              default:
            }
          }
        },
        "callbacks_force": true,
        "website_name":"hundyra.se",
        "website_privacy_policy_url":"/sekretesspolicy"
      });
    `;
    this.document.body.appendChild(script);
  }
}