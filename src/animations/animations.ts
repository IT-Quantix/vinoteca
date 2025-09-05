import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
  ])
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
            style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
            style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    style({ transform: 'scale(0.8)', opacity: 0 }),
    animate('600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
            style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);

export const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger(100, [
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
                style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const cartBadgeBounce = trigger('cartBadgeBounce', [
  transition('* => *', [
    style({ transform: 'scale(1.3)' }),
    animate('300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
            style({ transform: 'scale(1)' }))
  ])
]);