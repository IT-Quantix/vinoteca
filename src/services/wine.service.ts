import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Wine, FilterOptions } from '../models/wine.interface';
import { WINES_DATA } from '../data/wine.data';

@Injectable({ providedIn: 'root' })
export class WineService {
  private winesSubject = new BehaviorSubject<Wine[]>(WINES_DATA);
  private filtersSubject = new BehaviorSubject<FilterOptions>({}); // sin límites por defecto

  wines$ = this.winesSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  filteredWines$: Observable<Wine[]> = combineLatest([this.wines$, this.filters$]).pipe(
    map(([wines, filters]) => this.applyFilters(wines, filters))
  );

  getAllWines(): Observable<Wine[]> {
    return this.wines$;
  }

  getFilteredWines(): Observable<Wine[]> {
    return this.filteredWines$;
  }

  // 🔧 Fusiona con lo que ya hay (no pisa campos que no mandes)
  updateFilters(filters: FilterOptions): void {
    this.filtersSubject.next({ ...this.filtersSubject.value, ...filters });
  }

  // útil para “Limpiar”
  resetFilters(): void {
    this.filtersSubject.next({});
  }

  getCurrentFilters(): FilterOptions {
    return this.filtersSubject.value;
  }

  getWineById(id: number): Wine | undefined {
    return this.winesSubject.value.find(wine => wine.id === id);
  }

  private applyFilters(wines: Wine[], filters: FilterOptions): Wine[] {
    return wines.filter(wine => {
      // categoría
      if (filters.category && wine.category !== filters.category) return false;

      // precio: solo filtra si viene un número (0 es válido)
      if (filters.minPrice != null && wine.price < filters.minPrice) return false;
      if (filters.maxPrice != null && wine.price > filters.maxPrice) return false;

      // búsqueda texto
      if (filters.searchTerm) {
        const q = filters.searchTerm.toLowerCase();
        const inName = wine.name.toLowerCase().includes(q);
        const inDescription = wine.description.toLowerCase().includes(q);
        const inVineyard = wine.vineyard.toLowerCase().includes(q);
        if (!(inName || inDescription || inVineyard)) return false;
      }

      return true;
    });
  }
}
