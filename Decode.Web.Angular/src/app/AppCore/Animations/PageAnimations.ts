import { trigger, transition, animate, state, style, keyframes } from '@angular/animations';
import { environment } from 'src/environments/environment';

export const PageFlyInOutAnimation = [
    trigger('PageFlyInOutAnimation', [
        transition('void=>*', [style({ transform: 'translateX(100%)' }), animate(environment.Visuals.PageAnimationSpeed)]),
        transition('*=>void', [style({ transform: 'translateX(-100%)' }), animate(environment.Visuals.PageAnimationSpeed)]),        
    ])    
];

export const LabelFlyInOutAnimation = [    
    trigger('LabelFlyInOutAnimation', [
        transition("void=>*", [
            animate(environment.Visuals.PageAnimationSpeed, keyframes([
                style({ paddingLeft: '250px', offset: 0.0 }),
                style({ paddingLeft: '245px', offset: 0.1 }),
                style({ paddingLeft: '240px', offset: 0.15 }),
                style({ paddingLeft: '230px', offset: 0.2 }),
                style({ paddingLeft: '210px', offset: 0.3 }),
                style({ paddingLeft: '200px', offset: 0.4 }),
                style({ paddingLeft: '100px', offset: 0.6 }),
                style({ paddingLeft: '50px', offset: 0.8 }),
                style({ paddingLeft: '0', offset: 1.0 })                
            ]))
        ])        
    ])
];

export const PageAnimations = [
    PageFlyInOutAnimation,
    LabelFlyInOutAnimation
];
