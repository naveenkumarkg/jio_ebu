import { NgModule } from '@angular/core';
import { SecuritySharedLibsModule } from './shared-libs.module';

@NgModule({
    imports: [SecuritySharedLibsModule],
    declarations: [],
    exports: [SecuritySharedLibsModule],
})
export class SecuritySharedCommonModule {}
