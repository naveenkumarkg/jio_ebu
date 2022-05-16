import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MainComponent } from '../../layouts/main/main.component';
import { routes } from '../../app-routing.module';
import { Location } from '@angular/common';
import { TestModule } from '../test.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SignUpComponent } from '../../blocks/signUp/signUp.component';

describe('Router: App', () => {
    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), TestModule],
            declarations: [SignUpComponent, MainComponent],
            providers: [Location],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        fixture = TestBed.createComponent(MainComponent);
        router.initialNavigation();
    });
});
