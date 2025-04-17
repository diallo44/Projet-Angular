import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes)
    // Vous pouvez ajouter d'autres providers ici si besoin.
  ]
};
