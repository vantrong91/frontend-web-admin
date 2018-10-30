import { Component, Input, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-spinner',
    template: `<div class="preloader" *ngIf="isSpinnerVisible">
                    <div class="sk-circle">
                    <div class="sk-circle1 sk-child"></div>
                    <div class="sk-circle2 sk-child"></div>
                    <div class="sk-circle3 sk-child"></div>
                    <div class="sk-circle4 sk-child"></div>
                    <div class="sk-circle5 sk-child"></div>
                    <div class="sk-circle6 sk-child"></div>
                    <div class="sk-circle7 sk-child"></div>
                    <div class="sk-circle8 sk-child"></div>
                    <div class="sk-circle9 sk-child"></div>
                    <div class="sk-circle10 sk-child"></div>
                    <div class="sk-circle11 sk-child"></div>
                    <div class="sk-circle12 sk-child"></div>
                </div>
    </div>`,
    encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible = true;

    @Input() public backgroundColor = 'rgba(80,155,52,1)';

    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isSpinnerVisible = true;
            } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.isSpinnerVisible = false;
            }
        }, () => {
            this.isSpinnerVisible = false;
        });
    }

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
    }
}
