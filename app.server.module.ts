import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './src/app/app.module';
import { MainComponent } from './src/app/layouts/main/main.component';

@NgModule({
    imports: [AppModule, ServerModule],
    bootstrap: [MainComponent],
})
export class AppServerModule {}
