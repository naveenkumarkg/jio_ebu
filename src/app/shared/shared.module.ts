import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { SecuritySharedCommonModule } from './shared-common.module';
import { UtilsModule } from './utils.module';
import { SecuritySharedLibsModule } from './shared-libs.module';
import { MtnComponentsModule } from './mtn-components.module';

@NgModule({
    imports: [SecuritySharedLibsModule, SecuritySharedCommonModule, MtnComponentsModule, UtilsModule],
    exports: [SecuritySharedCommonModule, MtnComponentsModule, UtilsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SecuritySharedModule {
    static forRoot(): ModuleWithProviders<SecuritySharedModule> {
        return {
            ngModule: SecuritySharedModule,
        };
    }
}
