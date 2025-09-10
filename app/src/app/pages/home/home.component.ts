import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WineService } from '../../../services/wine.service';
import { SearchComponent } from '../../../components/search/search.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { PaymentComponent } from '../../../components/payment/payment.component';
import { Observable } from 'rxjs';
import { Wine } from '../../../models/wine.interface';
import { map } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    // SearchComponent,
    // FilterComponent,
    ProductCardComponent,
    RouterModule
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private wineService = inject(WineService);
  private router = inject(Router);

  filteredWines$: Observable<Wine[]> = this.wineService.getFilteredWines();


  ngOnInit(): void {
    // Inicializar con todos los vinos
    this.wineService.updateFilters({});
  }

  topWines$: Observable<Wine[]> = this.filteredWines$.pipe(
    map(wines => wines
      .sort((a,b) => b.rating - a.rating) // Ordena los vinos por rating de mayor a menor
      .slice(0, 3) // Elige los 3 primeros
    )
  );

  goToVinos(){
    this.router.navigate(['/vinos']).then(() => {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
    })
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
