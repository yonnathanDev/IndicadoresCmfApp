import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  exports: [
    MatSliderModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
