import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { WineService } from '../../services/wine.service';
import { WineCategory } from '../../models/wine.interface';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatSliderModule, MatButtonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  private wineService = inject(WineService);

  WineCategory = WineCategory;

  // 👇 sin límites por defecto (null = no filtra)
  selectedCategory: WineCategory | undefined = undefined;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  searchTerm: string = '';


  formatPrice(value: number): string {
    return `$${value}`;
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = undefined;
    this.minPrice = null;
    this.maxPrice = null;
    this.searchTerm = '';
    this.wineService.resetFilters(); // ✅ limpia todo
  }

  private applyFilters(): void {
    const next: any = {
      category: this.selectedCategory,
      searchTerm: this.searchTerm,
    };
    // Solo incluimos precio si el usuario lo seteó
    if (this.minPrice != null) next.minPrice = this.minPrice;
    if (this.maxPrice != null) next.maxPrice = this.maxPrice;

    this.wineService.updateFilters(next);
  }
}
