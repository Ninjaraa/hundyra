import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private siteSuffix = ' | Hundyra';

  constructor(private titleService: Title, private metaService: Meta) {}

  updateTitle(title: string): void {
    this.titleService.setTitle(`${title}${this.siteSuffix}`);
  }

  updateMetaTag(name: string, content: string): void {
    this.metaService.updateTag({ name: name, content: content });
  }
}