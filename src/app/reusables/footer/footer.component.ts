import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})

export class FooterComponent {
  constructor(
    public emailService: EmailService, 
    public iconService: IconService
  ) {}
}