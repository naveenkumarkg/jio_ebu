import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { SessionStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHandler } from '@angular/common/http';
import { NavigationEffect } from '../../../state/effects';
import { StateManagementModule } from '../../../state/state.module';
import { NavigationActionTypes, InitialActionTypes } from '../../../state/actions/types';
import { NavigationService } from '../../../shared';
import { givenHeader, givenFooter } from '../../../helpers/test/state/navigation.helper';
import { givenError500 } from '../../../helpers/test/state/error.helper';

describe('NavigationEffects()', () => {
    let effects: NavigationEffect;
    let service: NavigationService;
    let store: Store<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StateManagementModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
            providers: [SessionStorageService, HttpHandler, NavigationEffect],
        });
        effects = TestBed.inject(NavigationEffect);
        store = TestBed.inject(Store);
        service = TestBed.inject(NavigationService);
    });

    describe('getHeader$', () => {
        it('should store retrieved headers', () => {
            of({ type: InitialActionTypes.LOADING_EFFECTS });
            spyOn(service, 'getNavigationRest').and.returnValue(of(givenHeader));
            effects.getHeader$.subscribe(action => {
                expect(action).toEqual({
                    type: NavigationActionTypes.LOAD_HEADER_SUCCESS,
                    payload: givenHeader,
                });
            });
        });

        it('should return an error when Loading header is throwing error', () => {
            of({ type: InitialActionTypes.LOADING_EFFECTS });
            spyOn(service, 'getNavigationRest').and.returnValue(throwError({ status: 500 }));
            effects.getHeader$.subscribe(action => {
                expect(action).toEqual({
                    type: NavigationActionTypes.LOAD_HEADER_ERROR,
                    payload: givenError500,
                });
            });
        });
    });

    describe('getFooter$', () => {
        it('should store retrieved footers', () => {
            of({ type: InitialActionTypes.LOADING_EFFECTS });
            spyOn(service, 'getNavigationRest').and.returnValue(of(givenFooter));
            effects.getFooter$.subscribe(action => {
                expect(action).toEqual({
                    type: NavigationActionTypes.LOAD_FOOTER_SUCCESS,
                    payload: givenFooter,
                });
            });
        });

        it('should return an error when Loading footer is throwing error', () => {
            of({ type: InitialActionTypes.LOADING_EFFECTS });
            spyOn(service, 'getNavigationRest').and.returnValue(throwError({ status: 500 }));
            effects.getFooter$.subscribe(action => {
                expect(action).toEqual({
                    type: NavigationActionTypes.LOAD_FOOTER_ERROR,
                    payload: givenError500,
                });
            });
        });
    });
});
