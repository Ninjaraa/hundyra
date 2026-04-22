import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './reusables/footer/footer.component';
import { MenyComponent } from './reusables/meny/meny.component';
import { ConsentService } from './services/consent.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private consentService: ConsentService) {}

  ngOnInit() {
    this.consentService.loadConsentScript();
  }
}
