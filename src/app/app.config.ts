import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            HttpClientModule,
            StoreModule.forRoot(),
            EffectsModule.forRoot(),
        ),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
    ],
};
