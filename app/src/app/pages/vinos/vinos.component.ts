import { WineService } from './../../../services/wine.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { Observable, of } from 'rxjs';
import { Wine } from '../../../models/wine.interface';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from '../../../components/filter/filter.component';


@Component({
  selector: 'app-vinos',
  standalone: true,
  imports: [CommonModule,
    ProductCardComponent,
    RouterModule,
    MatIconModule,
    FilterComponent,

  ],
  templateUrl: './vinos.component.html',
  styleUrls: ['./vinos.component.css']
})
export class VinosComponent {
  private router = inject(Router);
  private WineService = inject(WineService)


  wines$: Observable<Wine[]> = this.WineService.getFilteredWines();

  goToHome(){
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
    })
  }

}
