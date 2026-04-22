import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HemComponent } from './hem/hem.component';
import { BarkborrehundComponent } from './barkborrehund/barkborrehund.component';
import { NinjaComponent } from './ninja/ninja.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { VillkorComponent } from './villkor/villkor.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MediaComponent } from './vi-i-media/vi-i-media.component';

export const routes: Routes = [
    { path: '', component: HemComponent},
    { path: 'barkborrehund', component: BarkborrehundComponent},
    { path: 'om-ninja', component: NinjaComponent},
    { path: 'vi-i-media', component: MediaComponent },
    { path: 'kontakt', component: KontaktComponent },
    { path: 'villkor', component: VillkorComponent },
    { path: 'sekretesspolicy', component: PrivacyComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
