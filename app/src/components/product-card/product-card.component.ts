import { Component, Input, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Wine } from '../../models/wine.interface';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers:[DecimalPipe]
})
export class ProductCardComponent {
  @Input() wine!: Wine;

  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);
  private decimalPipe =  inject(DecimalPipe);

  isAdding = false;

  addToCart(): void {
    this.isAdding = true;

    setTimeout(() => {
      this.cartService.addToCart(this.wine);
      this.notificationService.success(`${this.wine.name} agregado al carrito`);
      this.isAdding = false;
    }, 300);
  }

  getCategoryClass(): string {
    return `category-${this.wine.category}`;
  }

  getCategoryLabel(): string {
    switch (this.wine.category) {
      case 'tinto': return 'Tinto';
      case 'blanco': return 'Blanco';
      case 'rosado': return 'Rosado';
      case 'espumante': return 'Espumante';
      default: return this.wine.category;
    }
  }

    getFormattedPrice(): string {
      // Si transform devuelve null, usamos cadena vacía ''
      const formatted = this.decimalPipe.transform(this.wine.price, '1.0-0', 'en-US') ?? '';
      return formatted.replace(/,/g, '.');
    }



}
