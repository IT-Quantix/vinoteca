import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { NotificationsComponent } from '../components/notification/notifications.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDrawerContainer } from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    // HomeComponent,
    CartComponent,
    NotificationsComponent,
    MatDrawerContainer,
    RouterOutlet
],
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideRouter(routes)
  ]
});
