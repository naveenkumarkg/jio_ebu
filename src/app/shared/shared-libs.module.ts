import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [],
    exports: [FormsModule, CommonModule],
})
export class SecuritySharedLibsModule {
    static forRoot(): ModuleWithProviders<SecuritySharedLibsModule> {
        return {
            ngModule: SecuritySharedLibsModule,
        };
    }
}
