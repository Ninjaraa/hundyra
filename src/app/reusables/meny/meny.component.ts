import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-meny',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './meny.component.html',
})

export class MenyComponent {
  isMenuVisible: boolean = false;

  constructor(public emailService: EmailService) { }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}