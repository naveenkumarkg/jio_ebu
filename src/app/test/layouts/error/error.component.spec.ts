import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorComponent } from '../../../layouts/error/error.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModule } from '../../test.module';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ErrorComponent],
                imports: [TestModule],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
