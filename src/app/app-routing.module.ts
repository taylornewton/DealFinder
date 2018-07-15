import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'favorites',
      component: FavoritesComponent,
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }