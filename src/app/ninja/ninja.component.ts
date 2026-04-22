import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-ninja',
  standalone: true,
  imports: [],
  templateUrl: './ninja.component.html',
})

export class NinjaComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateTitle('Ninja Claesson - Granbarkborresök');
    this.seoService.updateMetaTag('description', 'Utöver sökuppdrag jobbar jag även som hundinstruktör och beteendeutredare. Läs mer om mig här!');
  }
}
