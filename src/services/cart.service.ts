import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Wine } from '../models/wine.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);

  cartItems$ = this.cartItemsSubject.asObservable();
  cartVisible$ = this.cartVisibleSubject.asObservable();

  constructor() {}

  getCartItemsValue(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(wine: Wine, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.wine.id === wine.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ wine, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  removeFromCart(wineId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.wine.id !== wineId);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(wineId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(wineId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.wine.id === wineId);
    
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.wine.price * item.quantity), 0))
    );
  }

  getTotalItems(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  toggleCartVisibility(): void {
    this.cartVisibleSubject.next(!this.cartVisibleSubject.value);
  }

  showCart(): void {
    this.cartVisibleSubject.next(true);
  }

  hideCart(): void {
    this.cartVisibleSubject.next(false);
  }
}
