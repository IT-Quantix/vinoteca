import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/wine.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']  
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);

  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  cartVisible$: Observable<boolean> = this.cartService.cartVisible$;
  totalPrice$: Observable<number> = this.cartService.getTotalPrice();

  ngOnInit(): void {}

  closeCart(): void {
    this.cartService.hideCart();
  }

  increaseQuantity(wineId: number): void {  
    const item = this.cartService.getCartItemsValue().find(i => i.wine.id === wineId);
    if (item) this.cartService.updateQuantity(wineId, item.quantity + 1);
  }

  decreaseQuantity(wineId: number): void {
    const item = this.cartService.getCartItemsValue().find(i => i.wine.id === wineId);
    if (!item) return;
    if (item.quantity > 1) this.cartService.updateQuantity(wineId, item.quantity - 1);
    else this.removeItem(wineId);
  }

  removeItem(wineId: number): void {
    this.cartService.removeFromCart(wineId);
  }

  proceedToCheckout(): void {
    const paymentSection = document.getElementById('payment');
    if (paymentSection) {
      this.closeCart();
      paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
