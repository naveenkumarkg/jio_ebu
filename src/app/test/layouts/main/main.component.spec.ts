import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from '../../../layouts/main/main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModule } from '../../test.module';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MainComponent],
                imports: [TestModule],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
