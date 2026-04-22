import { DestroyRef, DOCUMENT, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GtmService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly destroyRef = inject(DestroyRef);

  private isGtmLoaded = false;
  private isTrackingPageViews = false;

  initGtmScript(): void {
    if (this.isGtmLoaded) return;

    const gtmScript = this.document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5GNTGTL');
    `;
    this.document.body.appendChild(gtmScript);
    this.isGtmLoaded = true;

    this.startPageViewTracking();
  }

  loadGtmIfConsentGranted(): void {
    const granted = window.dataLayer.some((entry) => {
      if (Array.isArray(entry)) {
        return (
          entry[0] === 'consent' &&
          entry[1] === 'update' &&
          entry[2]?.analytics_storage === 'granted'
        );
      } else if (
        typeof entry === 'object' &&
        entry.event === 'consent_update'
      ) {
        return entry.consent_level === 'granted';
      }
      return false;
    });

    if (granted) this.initGtmScript();
  }

  trackButtonClick(buttonName: string): void {
    if (!this.isGtmLoaded || !window.dataLayer) return;
    window.dataLayer.push({
      event: 'button_click',
      event_category: 'Button Clicks',
      event_action: 'click',
      event_label: buttonName,
    });
  }

  private startPageViewTracking(): void {
    if (this.isTrackingPageViews) return;
    this.isTrackingPageViews = true;

    this.pushPageView(this.router.url);

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        setTimeout(() => this.pushPageView(event.urlAfterRedirects), 0);
      });
  }

  private pushPageView(path: string): void {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: this.titleService.getTitle(),
    });
  }
}
