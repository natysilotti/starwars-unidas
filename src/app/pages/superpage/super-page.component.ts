import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'app-base',
    template: `
        <div>
            base works!!
        </div>`
})
export class SuperPage implements OnInit {
    routerSubscription: Subscription;
    parameters!: Params;

    constructor(
        public location: Location,
        public router: ActivatedRoute) {
        this.routerSubscription = this.router.queryParams.subscribe(param => {
            this.parameters = param;
        });
    }
    ngOnInit() {
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }

    return() {
        this.location.back();
    }
}