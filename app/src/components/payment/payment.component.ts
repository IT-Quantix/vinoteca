import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notificacion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);

  cartItems$ = this.cartService.cartItems$;
  totalPrice$ = this.cartService.getTotalPrice();
  isProcessing = false;

  paymentForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: [''],
    city: [''],
    postalCode: [''],
    cardNumber: ['', Validators.required],
    expiryDate: [''],
    cvv: ['']
  });

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.isProcessing = true;

      // Simular procesamiento de pago
      setTimeout(() => {
        this.notificationService.success('¡Pago procesado exitosamente! Recibirás un email de confirmación.');
        this.cartService.clearCart();
        this.paymentForm.reset();
        this.isProcessing = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    } else {
      this.notificationService.error('Por favor, completa todos los campos requeridos.');
    }
  }
}