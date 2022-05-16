import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateManagementModule } from '../state/state.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';

@NgModule({
    imports: [StateManagementModule.forRoot(), RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
    providers: [SessionStorageService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestModule {}
